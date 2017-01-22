(function() {
	var docElem = window.document.documentElement;
	var gridItemsContainer = document.querySelector('section.grid');
	var gridItems = gridItemsContainer.querySelectorAll('.grid__item');
	var contentItemsContainer = document.querySelector('section.content');
	var contentItems = contentItemsContainer.querySelectorAll('.content__item');
	var closeCtrl = contentItemsContainer.querySelector('.close-button');
	var currentItem = -1;

	//json data
	var mydata = portfolioData;

	//Elements that load from json
	var aboutText = document.getElementById('aboutText');
	var contactText = document.getElementById('contactExcerpt');
	var portfolioText = document.getElementById('portfolioExcerpt');
	var skillsText = document.getElementById('skillsExcerpt');
	var clientsText = document.getElementById('clientsExcerpt');


	function loadText(data){
		aboutText.innerHTML = data.about.bioIntro;
		contactText.innerHTML = data.contact.excerpt;
		portfolioText.innerHTML = data.portfolio.excerpt;
		skillsText.innerHTML = data.skills.excerpt;
		clientsText.innerHTML = data.clients.excerpt;
	}

	loadText(mydata);

	function loadSkills(data){
		for(var skill in data){
			var element = document.querySelector('.' + skill + '-skill');
			element.style.height = data[skill].percent + '%';
			element.innerHTML += "<style>."+skill+"-skill:hover::after{content: '"+data[skill].toolTip+"';position: absolute; top: -30px; left: -50%; padding: 5px; background: rgba(0,0,0,0.5); border-radius: 3px; z-index: 500;}</style>";
		}
	}

	loadSkills(mydata.skills.charts);

	function init(){
		initEvents();
	}

	var onEndTransition = function( el, callback ) {
		var transitionEvent = whichTransitionEvent(el);
		var onEndCallbackFn = function( ev ) {
			if( transitionEvent ) {
				if( ev.target != this ) return;
				this.removeEventListener( transitionEvent, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(this); }
		};
		if( transitionEvent ) {
			el.addEventListener( transitionEvent, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	}


	function whichTransitionEvent(el){
	    var t;
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

			onEndTransition(dummy, function(){
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
		},40);
	}

	function hideContent(){
		var gridItem = gridItems[currentItem];
		var contentItem = contentItems[currentItem];

		contentItem.classList.remove('content__item--show');
		contentItemsContainer.classList.remove('content--show');

		setTimeout(function(){
			var dummy = gridItemsContainer.querySelector('.placeholder');

			/*var transitionEvent = whichTransitionEvent();*/

			dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
			dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
			
			onEndTransition(dummy, function(){
				contentItem.parentNode.scrollTop = 0;
				gridItemsContainer.removeChild(dummy);
				gridItem.classList.remove('grid-item--loading');
			});
		}, 25);
		current = -1;
	}

	//Remove scroll bars to prevent screen jump

	function unloadScrollBars() {
	    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
	    document.body.scroll = "no"; // ie only
	}

	init();



})();