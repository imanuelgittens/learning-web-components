(function() {

	var gridItemsContainer = document.querySelector('section.grid');
	var gridItems = gridItemsContainer.querySelectorAll('.grid__item');
	var currentItem = -1;
	console.log(gridItemsContainer);

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

			});
		});
	}

	init();



})();