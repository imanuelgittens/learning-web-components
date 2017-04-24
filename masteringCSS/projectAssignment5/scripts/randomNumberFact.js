'use strict';

var rootURL = 'http://numbersapi.com';

function generateFact(){
    var randomNumber = Math.floor(Math.random() * ((200-0)+0) + 0);;
    var xhr = new XMLHttpRequest();
    var factTitle = document.querySelector('.numberFactTitle');
    var fact = document.querySelector('.factString');
    xhr.onload = function(){
        // do something with the response
        if (xhr.status === 200) {
            factTitle.innerHTML = 'Here is a fact about the number ' + randomNumber;
            fact.innerHTML = xhr.response;
        }
    };
    xhr.open('GET', rootURL + '/' +randomNumber);
    xhr.send();
}

document.addEventListener('DOMContentLoaded', generateFact);

var factGenerator = document.querySelector('.newNumberFact');
factGenerator.addEventListener('click', generateFact);