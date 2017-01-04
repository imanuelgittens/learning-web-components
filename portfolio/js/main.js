(function() {

	var gridItemsContainer = document.querySelector('section.grid');
	var gridItems = gridItemsContainer.querySelectorAll('.grid__item');
	var currentItem = -1;

	function init(){
		initEvents();
	}

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
				},3000);
				

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
		dummy.style.top = itemDimensionsPosition.top + 'px';
		dummy.style.left = itemDimensionsPosition.left + 'px';
		dummy.style.width = itemDimensionsPosition.width + 'px';
		dummy.style.height = itemDimensionsPosition.height + 'px';
		dummy.style.position = 'absolute';
		dummy.style.backgroundColor = "#fff";
		console.log(item.style.backgroundColor);

		gridItemsContainer.appendChild(dummy);

		
	}

	init();



})();