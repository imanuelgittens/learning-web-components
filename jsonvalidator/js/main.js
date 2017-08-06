(function() {
	'use strict';

	let testButton = document.getElementById('runTest');
	let uploadFileButton = document.getElementById('jsonFile');
	let testAgainButton = document.getElementById('testAgain');

	function validateJSON(jsonString) {
		//let validJSON = /((\[\{)|(,\{)|((\s)+,))((\s|)+"[a-zA-Z0-0]+":"[a-zA-Z0-9_:;\s]+"(\s|)+((,(\s|)+(?="))|((\}(\s|)+((?=,)|\])))))+/;
		let validJSON = /^{\s*?(\s?"\w*"\s?:((\s?"\w*")|({\s*?(("\w*":"\w*"),?\s*)*\s*?})*),?\s?)*\s*?}$/;
		return validJSON.test(jsonString);
	}

	/*Select the file from the input*/
	function startRead() {
		let jsonFile = document.getElementById('jsonFile');
		let jsonFileLabel = document.getElementById('jsonFileLabel');
		let uploadLabelText = document.getElementById('jsonFileSpan');
		if (jsonFile) {
			let filename = jsonFile.files[0].name;
			uploadLabelText.innerHTML = filename;
			jsonFileLabel.classList.add('tab-area__actions__file-label--uploaded');
			convertToString(jsonFile.files[0]);
		} else {
			alert('Please upload a file!');
		}
	}

	/*Convert the file to a string*/
	function convertToString(jsonFile) {
		let reader = new FileReader();
		reader.readAsText(jsonFile, 'UTF-8');
		reader.onload = loaded;
		reader.onerror = errorHandler;
	}

	function loaded(evt) {
		// Obtain the read file data
		let fileString = evt.target.result;
		let jsonTextArea = document.getElementById('jsonText');
		jsonTextArea.value = '';
		setTimeout(function() {
			jsonTextArea.value = fileString;
		}, 1000);
	}

	function errorHandler(evt) {
		if (evt.target.error.name == 'NotReadableError') {
			alert('File could not be read.');
		}
	}

	// Event Listeners

	// Validate the json
	testButton.addEventListener('click', function(event) {
		let jsonTextArea = document.getElementById('jsonText').value;
		if (jsonTextArea.length < 1) {
			alert('Enter some JSON in the textarea.');
		} else {
			let tab1 = document.getElementById('jsonstring');
			let tab2 = document.getElementById('jsonresult');
			tab1.checked = false;
			tab2.checked = true;
			if (validateJSON(jsonTextArea)) {
				let result = document.getElementById('vResult');
				let resultText = document.getElementById('vResultText');
				let resultIcon = document.getElementById('vResultIcon');
				resultIcon.innerHTML = '<i class="fa fa-smile-o" aria-hidden="true"></i>';
				resultText.innerHTML = 'Congratulations! Your JSON is Valid!';
			} else {
				let result = document.getElementById('vResult');
				let resultText = document.getElementById('vResultText');
				let resultIcon = document.getElementById('vResultIcon');
				resultIcon.innerHTML = '<i class="fa fa-frown-o" aria-hidden="true"></i>';
				resultText.innerHTML = 'Sorry...something is wrong with your JSON.';
			}
		}
	});

	uploadFileButton.addEventListener('change', event => {
		startRead();
	});

	testAgainButton.addEventListener('click', event => {
		let jsonTextArea = document.getElementById('jsonText');
		let uploadLabelText = document.getElementById('jsonFileSpan');
		let jsonFileLabel = document.getElementById('jsonFileLabel');
		jsonTextArea.value = '';
		uploadLabelText.innerHTML = 'Choose a File';
		let tab1 = document.getElementById('jsonstring');
		let tab2 = document.getElementById('jsonresult');
		jsonFileLabel.classList.remove('tab-area__actions__file-label--uploaded');
		tab1.checked = true;
		tab2.checked = false;
	});
})();
