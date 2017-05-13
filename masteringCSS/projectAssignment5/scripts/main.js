var screenWidth = document.querySelector('.screen-width');
screenWidth.innerHTML = "Total Screen Width: " + screen.width + "px.";


console.log('hello');
var menu = document.querySelector('.menu-main');
var menuLinks = menu.getElementsByTagName('a');
var i;

/*functions*/

function addClickEvent(node){
    var destinationId = node.getAttribute('href').substr(1);
    node.addEventListener('click', function(event){
        event.preventDefault();
        smoothScroll(destinationId);
    })
}

function currentYPosition(){
    /* Get current scrolled position */
    return window.scrollY;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    /* Get the position of the element on the page from the top */
    var rect = elm.getBoundingClientRect();
    var y = rect.top;
    return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

/*Attach event listeners*/

for(i=0; i < menuLinks.length; i++){
    addClickEvent(menuLinks[i]);
}