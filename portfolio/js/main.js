/*Home Page*/

var home = document.querySelector('#home-block');
var bodyEl = document.body;
var docElem = window.document.documentElement;

var gridEl = document.getElementById('theGrid');

var gridItemsContainer = gridEl.querySelector('section.grid');
var contentItemsContainer = gridEl.querySelector('section.content');
var lockScroll = false, xscroll, yscroll;
// transition end event name
var	transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' };
/*var	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ]*/;
var	onEndTransition = function( el, callback ) {
		var onEndCallbackFn = function( ev ) {
			if( support.transitions ) {
				if( ev.target != this ) return;
				this.removeEventListener( transEndEventName, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(this); }
		};
		if( support.transitions ) {
			el.addEventListener( transEndEventName, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	};
var isAnimating = false;

/*gridEl = document.getElementById('theGrid'),
sidebarEl = document.getElementById('theSidebar'),
gridItemsContainer = gridEl.querySelector('section.grid'),
contentItemsContainer = gridEl.querySelector('section.content'),
gridItems = gridItemsContainer.querySelectorAll('.grid__item'),
contentItems = contentItemsContainer.querySelectorAll('.content__item'),
closeCtrl = contentItemsContainer.querySelector('.close-button'),
current = -1,
lockScroll = false, xscroll, yscroll,
isAnimating = false,
menuCtrl = document.getElementById('menu-toggle'),
menuCloseCtrl = sidebarEl.querySelector('.close-button');*/

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

function loadContent(item){
	var dummy = document.createElement('div');
	dummy.className = 'placeholder';

	// set the width/heigth and position
	dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';
	dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';

	// add transition class 
	dummy.classList.add('placeholder--trans-in');
	gridItemsContainer.appendChild(dummy);

	bodyEl.classList.add('view-single');

	setTimeout(function() {
			// expands the placeholder
			dummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
			dummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
			// disallow scroll
			window.addEventListener('scroll', noscroll);
		}, 25);
}

function noscroll() {
		if(!lockScroll) {
			lockScroll = true;
			xscroll = scrollX();
			yscroll = scrollY();
		}
		window.scrollTo(xscroll, yscroll);
	}


home.addEventListener('click', function(){
	loadContent(this);
});
