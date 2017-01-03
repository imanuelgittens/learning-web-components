/*Home Page*/

var home = document.querySelector('#home-block');

home.addEventListener('click', function(){
	var content = document.getElementsByClassName('content');
	var homeContent = document.getElementById('homeContent-block');
	content[0].classList.add('content--show')
	homeContent.classList.add('content__item--show');
});