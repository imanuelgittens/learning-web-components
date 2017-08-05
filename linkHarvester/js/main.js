(function() {
  'use strict';

  var getLinks = document.getElementById('scrapeLinks');
  var uploadFile = document.getElementById('uploadFile');
  var linkArea = document.getElementById('linkArea');

  var result = {
    links: [],
    emailAddresses: []
  };

  /*Select the file from the input*/
  function startRead() {
    if (uploadFile) {
      convertToString(uploadFile.files[0]);
    } else {
      alert('Please upload a file!');
    }
  }

  /*Convert the file to a string*/
  function convertToString(file) {
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = loaded;
    reader.onerror = errorHandler;
  }

  function loaded(evt) {
    // Obtain the read file data
    var fileString = evt.target.result;
    var textArea = document.getElementById('dataInput');
    textArea.value = '';
    textArea.value = fileString;
  }

  function errorHandler(evt) {
    if (evt.target.error.name == 'NotReadableError') {
      alert('File could not be read.');
    }
  }

  function showLinks() {
    var noLinkMessage = document.querySelector('.no-links');
    if (noLinkMessage) {
      linkArea.removeChild(noLinkMessage);
    }
    if (result.links.length > 0) {
      for (var i = 0; i < result.links.length; i++) {
        var newLi = document.createElement('li');
        newLi.classList.add('links__item');
        newLi.innerHTML = result.links[i].linkText + ': ' + result.links[i].url;
        linkArea.appendChild(newLi);
      }
    } else {
      var newLi = document.createElement('li');
      newLi.classList.add('no-links');
      newLi.innerHTML = 'No Links To Show';
      linkArea.appendChild(newLi);
    }
  }

  function findEmails(testString) {
    var emailPattern = /mailto:[a-z]{1,}@[a-z]{1,}.[a-z]{2,}/gim;
    var emailAddressArray = testString.match(emailPattern);
    if (emailAddressArray) {
      for (var i = 0; i < emailAddressArray.length; i++) {
        result.emailAddresses.push(emailAddressArray[i]);
      }
    }
  }

  function findLinks(testString) {
    var resultArray = [];
    var obj = {}; //return Object

    //get full links from string
    var links = /<a href="https?:\/\/\w{1,}.\w{1,}">\w{1,}\s?\w{1,}?<\/a>/gim;
    var linksArray = testString.match(links);

    //find specific parts of the link
    if (linksArray) {
      for (var i = 0; i < linksArray.length; i++) {
        //match link text
        var firstIndex = linksArray[i].indexOf('>') + 1;
        var lastIndex = linksArray[i].indexOf('</');
        var linkText = linksArray[i].slice(firstIndex, lastIndex);
        //match link URL
        var linkPattern = /https?:\/\/[a-z0-9]{1,}.[a-z0-9]{2,}/gim;
        var link = linksArray[i].match(linkPattern);
        //build Object
        (obj.linkText = linkText), (obj.url = link[0]);
        resultArray.push(obj);
        obj = {};
      }
      //add link information to result array
      for (var j = 0; j < resultArray.length; j++) {
        result.links.push(resultArray[j]);
      }
    }
  }

  //Event listeners

  getLinks.addEventListener('click', function() {
    var string = document.getElementById('dataInput').value;
    if (string) {
      findEmails(string);
      findLinks(string);
      showLinks();
      console.log(result);
    } else {
      alert('Please add some text before harvesting links.');
    }
  });

  uploadFile.addEventListener('change', function(event) {
    startRead();
  });
})();
