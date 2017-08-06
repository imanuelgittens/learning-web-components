(function() {
    'use strict';
    let screenWidth = document.querySelector('.screen-width');
    screenWidth.innerHTML = 'Total Screen Width: ' + screen.width + 'px.';

    /*smooth scroll */
    let menu = document.querySelector('.menu-main');
    let sideMenu = document.querySelector('.quickLinks');
    let menuLinks = menu.getElementsByTagName('a');
    let sideMenuLinks = sideMenu.getElementsByTagName('a');
    let i, j;

    /*functions*/

    function addClickEvent(node) {
        let destinationId = node.getAttribute('href').substr(1);
        node.addEventListener('click', function(event) {
            event.preventDefault();
            smoothScroll(destinationId);
        });
    }

    function currentYPosition() {
        /* Get current scrolled position */
        return window.scrollY;
    }

    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        /* Get the position of the element on the page from the top */
        let y = elm.offsetTop;
        return y;
    }

    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }
        for (let j = startY; j > stopY; j -= step) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    }

    /*Attach event listeners*/
    //main menu
    for (i = 0; i < menuLinks.length; i++) {
        addClickEvent(menuLinks[i]);
    }

    //side menu
    for (j = 0; j < sideMenuLinks.length; j++) {
        addClickEvent(sideMenuLinks[j]);
    }
    /*End smooth scroll*/

    /*sticky side menu*/
    function stickSideMenu() {
        sideMenu.classList.add('sticky');
    }

    function removeStickSideMenu() {
        sideMenu.classList.remove('sticky');
    }

    window.addEventListener('scroll', function(event) {
        let currentPosition = window.scrollY;
        if (currentPosition > 200) {
            stickSideMenu();
        } else {
            removeStickSideMenu();
        }
    });

    /*Cookies*/

    function setVisitedCookie() {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.cookie = 'visited=yes;expires=' + tomorrow.toUTCString();
    }

    function checkCookies() {
        let cookies = document.cookie;
        let cookieMessage = document.querySelector('.cookie-message');
        let testCookie = cookies.indexOf('visited=');
        if (testCookie >= 0) {
            cookieMessage.innerHTML = 'Great to see you again!';
        } else {
            setVisitedCookie();
            cookieMessage.innerHTML = 'First Visit? Welcome!';
        }
    }

    document.addEventListener('DOMContentLoaded', checkCookies);
})();
