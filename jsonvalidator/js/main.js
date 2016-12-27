var testButton = document.getElementById('runTest');
var uploadFileButton = document.getElementById('jsonFile');
var testAgainButton = document.getElementById('testAgain');

function validateJSON(jsonString){
	var validJSON = /((\[\{)|(,\{)|((\s)+,))((\s|)+"[a-zA-Z0-0]+":"[a-zA-Z0-9_:;\s]+"(\s|)+((,(\s|)+(?="))|((\}(\s|)+((?=,)|\])))))+/; 
  return validJSON.test(jsonString);
}

/*Select the file from the input*/
function startRead(){
	var jsonFile = document.getElementById('jsonFile');
	var jsonFileLabel = document.getElementById('jsonFileLabel');
	var uploadLabelText = document.getElementById('jsonFileSpan');
	if(jsonFile){
		var filename = jsonFile.files[0].name;
		uploadLabelText.innerHTML = filename;
		jsonFileLabel.classList.add('tab-area__actions__file-label--uploaded');
		convertToString(jsonFile.files[0]);
	}else{
		alert("Please upload a file!")
	}
}

/*Convert the file to a string*/
function convertToString(jsonFile){
	var reader = new FileReader();
	reader.readAsText(jsonFile, "UTF-8");
	// Handle progress, success, and errors
  /*reader.onprogress = updateProgress;*/
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function loaded(evt) {
  // Obtain the read file data
  var fileString = evt.target.result;
  var jsonTextArea = document.getElementById('jsonText');
  jsonTextArea.value = '';
  setTimeout(function(){
  	jsonTextArea.value = fileString;
  }, 1000);
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    alert("File could not be read.")
  }
}


// Event Listeners

// Validate the json
testButton.addEventListener('click', function(event){
	 var jsonTextArea = document.getElementById('jsonText').value;
	 if(jsonTextArea.length < 1){
	 	alert('Enter some JSON in the textarea.');
	 }else{
	 	var tab1 = document.getElementById('jsonstring');
 		var tab2 = document.getElementById('jsonresult');
 		tab1.checked = false;
 		tab2.checked = true;
	 	if(validateJSON(jsonTextArea)){
	 		var result = document.getElementById('vResult');
	 		var resultText = document.getElementById('vResultText');
	 		var resultIcon = document.getElementById('vResultIcon');
	 		resultIcon.innerHTML = '<i class="fa fa-smile-o" aria-hidden="true"></i>';
	 		resultText.innerHTML = 'Congratulations! Your JSON is Valid!';
	 	}else{
	 		var result = document.getElementById('vResult');
	 		var resultText = document.getElementById('vResultText');
	 		var resultIcon = document.getElementById('vResultIcon');
	 		resultIcon.innerHTML = '<i class="fa fa-frown-o" aria-hidden="true"></i>';
	 		resultText.innerHTML = 'Sorry...something is wrong with your JSON.';
	 	}
	 }
});

uploadFileButton.addEventListener('change', function(event){
	startRead();
});

testAgainButton.addEventListener('click', function(event){
	var jsonTextArea = document.getElementById('jsonText');
	var uploadLabelText = document.getElementById('jsonFileSpan');
	var jsonFileLabel = document.getElementById('jsonFileLabel');
	jsonTextArea.value = '';
	uploadLabelText.innerHTML = 'Choose a File';
	var tab1 = document.getElementById('jsonstring');
	var tab2 = document.getElementById('jsonresult');
	jsonFileLabel.classList.remove('tab-area__actions__file-label--uploaded');
	tab1.checked = true;
	tab2.checked = false;
});


