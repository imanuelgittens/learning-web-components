(function() {
  'use strict';

  let rootURL = 'http://numbersapi.com';

  function generateFact() {
    let randomNumber = Math.floor(Math.random() * (200 - 0 + 0) + 0);
    let xhr = new XMLHttpRequest();
    let factTitle = document.querySelector('.numberFactTitle');
    let fact = document.querySelector('.factString');
    xhr.onload = function() {
      // do something with the response
      if (xhr.status === 200) {
        factTitle.innerHTML = 'Here is a fact about the number ' + randomNumber;
        fact.innerHTML = xhr.response;
      }
    };
    xhr.open('GET', rootURL + '/' + randomNumber);
    xhr.send();
  }

  document.addEventListener('DOMContentLoaded', generateFact);

  let factGenerator = document.querySelector('.newNumberFact');
  factGenerator.addEventListener('click', generateFact);
})();
