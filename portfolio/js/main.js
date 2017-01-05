(function() {
	var docElem = window.document.documentElement;
	var gridItemsContainer = document.querySelector('section.grid');
	var gridItems = gridItemsContainer.querySelectorAll('.grid__item');
	var currentItem = -1;

	function init(){
		initEvents();
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
	}

	function loadContent(item){
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
	}

	init();



})();