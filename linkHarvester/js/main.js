(function() {
  'use strict';

  let getLinks = document.getElementById('scrapeLinks');
  let uploadFile = document.getElementById('uploadFile');
  let linkArea = document.getElementById('linkArea');

  let result = {
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
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = loaded;
    reader.onerror = errorHandler;
  }

  function loaded(evt) {
    // Obtain the read file data
    let fileString = evt.target.result;
    let textArea = document.getElementById('dataInput');
    textArea.value = '';
    textArea.value = fileString;
  }

  function errorHandler(evt) {
    if (evt.target.error.name == 'NotReadableError') {
      alert('File could not be read.');
    }
  }

  function showLinks() {
    let noLinkMessage = document.querySelector('.no-links');
    if (noLinkMessage) {
      linkArea.removeChild(noLinkMessage);
    }
    if (result.links.length > 0) {
      for (let i = 0; i < result.links.length; i++) {
        let newLi = document.createElement('li');
        newLi.classList.add('links__item');
        newLi.innerHTML = `${result.links[i].linkText} : ${result.links[i].url}`;
        linkArea.appendChild(newLi);
      }
    } else {
      let newLi = document.createElement('li');
      newLi.classList.add('no-links');
      newLi.innerHTML = 'No Links To Show';
      linkArea.appendChild(newLi);
    }
  }

  function findEmails(testString) {
    let emailPattern = /mailto:[a-z]{1,}@[a-z]{1,}.[a-z]{2,}/gim;
    let emailAddressArray = testString.match(emailPattern);
    if (emailAddressArray) {
      for (let i = 0; i < emailAddressArray.length; i++) {
        result.emailAddresses.push(emailAddressArray[i]);
      }
    }
  }

  function findLinks(testString) {
    let resultArray = [];
    let obj = {}; //return Object

    //get full links from string
    let links = /<a href="https?:\/\/\w{1,}.\w{1,}">\w{1,}\s?\w{1,}?<\/a>/gim;
    let linksArray = testString.match(links);

    //find specific parts of the link
    if (linksArray) {
      for (let i = 0; i < linksArray.length; i++) {
        //match link text
        let firstIndex = linksArray[i].indexOf('>') + 1;
        let lastIndex = linksArray[i].indexOf('</');
        let linkText = linksArray[i].slice(firstIndex, lastIndex);
        //match link URL
        let linkPattern = /https?:\/\/[a-z0-9]{1,}.[a-z0-9]{2,}/gim;
        let link = linksArray[i].match(linkPattern);
        //build Object
        (obj.linkText = linkText), (obj.url = link[0]);
        resultArray.push(obj);
        obj = {};
      }
      //add link information to result array
      for (let j = 0; j < resultArray.length; j++) {
        result.links.push(resultArray[j]);
      }
    }
  }

  //Event listeners

  getLinks.addEventListener('click', () => {
    let string = document.getElementById('dataInput').value;
    if (string) {
      findEmails(string);
      findLinks(string);
      showLinks();
      console.log(result);
    } else {
      alert('Please add some text before harvesting links.');
    }
  });

  uploadFile.addEventListener('change', event => {
    startRead();
  });
})();
