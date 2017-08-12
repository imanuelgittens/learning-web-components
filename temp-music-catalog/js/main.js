// (function() {
// 	//api key - c14565b6ac455f6f7f8acf54fe449cde
// 	//http://api.onemusicapi.com/20151208/track?user_key=myUserKey

// 	function getTracksFromAPI() {
// 		let apiURL = `http://api.onemusicapi.com/20151208/track?user_key=c14565b6ac455f6f7f8acf54fe449cde
// 									&title=Pantomime+Horse&artist=Suede`;

// 		let titlesArray = [];

// 		let xhr = new XMLHttpRequest();
// 		xhr.onload = function() {
// 			//handle response
// 			if (xhr.status === 200) {
// 				console.log(JSON.parse(xhr.response).data);
// 			}
// 		};

// 		xhr.open('GET', apiURL);
// 		xhr.send();
// 	}

// 	getTracksFromAPI();
// })();

(function() {
	'use strict';

	let rootURL = 'http://numbersapi.com';

	function generateFact() {
		let randomNumber = Math.floor(Math.random() * (200 - 0 + 0) + 0);
		let xhr = new XMLHttpRequest();
		//let factTitle = document.querySelector('.numberFactTitle');
		// let fact = document.querySelector('.factString');
		xhr.onload = function() {
			// do something with the response
			if (xhr.status === 200) {
				// factTitle.innerHTML = 'Here is a fact about the number ' + randomNumber;
				// fact.innerHTML = xhr.response;
				console.log(xhr.response);
			}
		};
		xhr.open('GET', rootURL + '/' + randomNumber);
		xhr.send();
	}

	// document.addEventListener('DOMContentLoaded', generateFact);

	// let factGenerator = document.querySelector('.newNumberFact');
	// factGenerator.addEventListener('click', generateFact);
	generateFact();
})();
