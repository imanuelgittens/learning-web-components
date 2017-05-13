var screenWidth = document.querySelector('.screen-width');
screenWidth.innerHTML = "Total Screen Width: " + screen.width + "px.";

/*smooth scroll */
var menu = document.querySelector('.menu-main');
var sideMenu = document.querySelector('.quickLinks');
var menuLinks = menu.getElementsByTagName('a');
var sideMenuLinks = sideMenu.getElementsByTagName('a');
var i, j;

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
    var y = elm.offsetTop;
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
//main menu
for(i=0; i < menuLinks.length; i++){
    addClickEvent(menuLinks[i]);
}

//side menu
for(j=0; j < sideMenuLinks.length; j++){
    addClickEvent(sideMenuLinks[j]);
}
/*End smooth scroll*/

/*sticky side menu*/
function stickSideMenu(event){
    sideMenu.classList.add('sticky');
}

function removeStickSideMenu(event){
    sideMenu.classList.remove('sticky');
}



window.addEventListener('scroll', function(event){
    var currentPosition = window.scrollY;
    if(currentPosition > 200) {
            stickSideMenu();
    }else{
            removeStickSideMenu();
    }
});


/*Cookies*/

function setVisitedCookie(){
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.cookie = 'visited=yes;expires='+ tomorrow.toUTCString();
}

function checkCookies(){
    var cookies = document.cookie;
    var cookieMessage = document.querySelector('.cookie-message');
    var testCookie = cookies.indexOf('visited=');
    if(testCookie >= 0){
        cookieMessage.innerHTML = 'Great to see you again!';
    }else{
        setVisitedCookie();
        cookieMessage.innerHTML = 'First Visit? Welcome!';
    }
}

document.addEventListener('DOMContentLoaded', checkCookies);