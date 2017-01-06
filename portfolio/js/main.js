(function() {
	var docElem = window.document.documentElement;
	var gridItemsContainer = document.querySelector('section.grid');
	var gridItems = gridItemsContainer.querySelectorAll('.grid__item');
	var contentItemsContainer = document.querySelector('section.content');
	var contentItems = contentItemsContainer.querySelectorAll('.content__item');
	var closeCtrl = contentItemsContainer.querySelector('.close-button');
	var currentItem = -1;

	function init(){
		initEvents();
	}


	function whichTransitionEvent(el){
    var t;
    /*var el = document.createElement('fakeelement');*/
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
	}

	function getViewport( axis ) {
		var client, inner;
		if( axis === 'x' ) {
			client = docElem['clientWidth'];
			inner = window['innerWidth'];
		}
		else if( axis === 'y' ) {
			client = docElem['clientHeight'];
			inner = window['innerHeight'];
		}
		
		return client < inner ? inner : client;
	}

	function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
	function scrollY() { return window.pageYOffset || docElem.scrollTop; }

	function initEvents(){
		[].slice.call(gridItems).forEach(function(item, pos){
			item.addEventListener('click', function(event){
				event.preventDefault();
				//index of current grid element
				currentItem = pos;

				//simulate loading time..
				item.classList.add('grid-item--loading');
				setTimeout(function(){
					/*item.classList.add('grid-item--animate');*/
					loadContent(item);

				},2000);


				

			});

			


		});

		closeCtrl.addEventListener('click', function() {
					// hide content
					hideContent();
			});
	}

	

	function loadContent(item){
		// disallow scroll
		unloadScrollBars();
		// add expanding element/placeholder 
		var dummy = document.createElement('div');
		//get position on the screen as well as the width and height of the grid item
		var itemDimensionsPosition = item.getBoundingClientRect();
		

		dummy.className = 'placeholder';
		dummy.classList.add('placeholder--trans-in');
		// set the width/height and position
		dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft) + 'px, ' + (item.offsetTop) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';
		dummy.style.transform = 'translate3d(' + (item.offsetLeft) + 'px, ' + (item.offsetTop) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';
		dummy.style.backgroundColor = window.getComputedStyle(item).backgroundColor;
		gridItemsContainer.appendChild(dummy);

		setTimeout(function(){
			// expands the placeholder
			dummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
			dummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
		},25);

		/* Listen for a transition on the dummy element and run callback once complete */
		var transitionEvent = whichTransitionEvent(dummy);
		dummy.addEventListener(transitionEvent, function() {
			/*console.log('Transition complete!  This is the callback, no library needed!');*/
			dummy.classList.remove('placeholder--trans-in');
			dummy.classList.add('placeholder--trans-out');
			// position the content container
			contentItemsContainer.style.top = scrollY() + 'px';
			// show the main content container
			contentItemsContainer.classList.add('content--show');
			// show content item:
			contentItems[currentItem].style.backgroundColor = dummy.style.backgroundColor;
			contentItems[currentItem].classList.add('content__item--show');
		});
	}

	function hideContent(){
		var gridItem = gridItems[currentItem];
		var contentItem = contentItems[currentItem];
		var dummy = gridItemsContainer.querySelector('.placeholder');
		var transitionEvent = whichTransitionEvent(dummy);

		contentItem.classList.remove('content__item--show');
		contentItemsContainer.classList.remove('content--show');

		setTimeout(function(){
			
			dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
			dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
		});

		current = -1;

		/*setTimeout(function(){
			var dummy = gridItemsContainer.querySelector('.placeholder');
			/*var transitionEvent = whichTransitionEvent(dummy);

			
			

		}, 25);
*/
	/*	setTimeout(function(){

			var dummy = gridItemsContainer.querySelector('.placeholder');
			var transitionEvent = whichTransitionEvent(dummy);
			
			dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
			dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
			

			dummy.addEventListener(transitionEvent, function() {
				// reset content scroll..
				console.log(transitionEvent);
				contentItem.parentNode.scrollTop = 0;
				gridItemsContainer.removeChild(dummy);
				gridItem.classList.remove('grid__item--loading');
			});

		

			current = -1;

		},25);*/
	}

	//Remove scroll bars to prevent screen jump

	function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}

	init();



})();