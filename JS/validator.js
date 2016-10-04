(function(window){

	var validator = {};

	validator.isEmailAddress = function(input){

		if(!input){
			throw "Missing Parameter in isEmailAddress function: 'input'.";	
		}

		if(input.indexOf("@") < 1){
			return false;
		}

		var emailParts = input.split('@');
		var domain = emailParts[1];
	
		
		if(emailParts.length > 2){
			return false;
		}

		if(domain.indexOf('.') == -1){
			return false;
		}else{
			var domainParts = domain.split('.');
			var extension = domainParts[1];
			if(extension.length < 2){
				return false;
			}
		}

		return true;
	};

	validator.isPhoneNumber = function(input){

		//Phone number for Trinidad and Tobago is of the form 1 868 XXX XXXX

		if(!input){
			throw "Missing Parameter in isPhoneNumber function: 'input'.";
		}

		var phoneParts = input.split(" ");
		var countryCode = phoneParts[0];
		var areaCode = phoneParts[1];
		var firstPartPhone = phoneParts[2];
		var secondPartPhone = phoneParts[3];
		
		if(phoneParts.length !== 4){
			return false;
		}

		if(countryCode !== "1"){
			return false;
		}

		if(areaCode !== "868"){
			return false;
		}

		if(firstPartPhone.length !== 3 || parseInt(firstPartPhone).toString() !== firstPartPhone) {
			return false;
		}

		if(secondPartPhone.length !== 4 || parseInt(secondPartPhone).toString() !== secondPartPhone) {
			return false;
		}

		return true;
	};


	validator.withoutSymbols = function(input){
		if(!input){
			throw "Missing Parameter in withoutSymbols function: 'input'.";
		}

		//if the uppercase version of a character is equal to the lowercase version then it is a symbol not a letter.
		var i,char;
		var result = "";

		for(i = 0; i < input.length; i++){
			char = input.charAt(i);
			console.log(char);
			if(char === " "){	//check for space
				result += char;
			}else{
				if(parseInt(char).toString() === char){	//check for number
				result += char;
				}else{
					if((char.toLowerCase() !== char.toUpperCase()) ){ //check for letter
							result += char;
					}
				} 
			}
			
		}

		return result;
	};

	validator.isDate = function(input){

		if(!input){
			throw "Missing Parameter in isDate function: 'input'.";
		}
		
		if(Date.parse(input)){
			return true;
		}
		
		return false;
		
	};

	validator.isBeforeDate = function(input, reference){

		if(!input){
			throw "Missing Parameter in isBeforeDate function: 'input'.";
		}

		if(!reference){
			throw "Missing Parameter in isDate function: 'reference'.";
		}

		var date1 = Date.parse(input);
		var date2 = Date.parse(reference);
		if(!date1){
			throw "Invalid date format - "+ input;
		}else{
			if(!date2){
				throw "Invalid date format - "+ reference;
			}else{
				if(date1 < date2){
					return true;
				}
			}
		}

		return false;
	};

	validator.isAfterDate = function(input, reference){

		if(!input){
			throw "Missing Parameter in isBeforeDate function: 'input'.";
		}

		if(!reference){
			throw "Missing Parameter in isDate function: 'reference'.";
		}

		var date1 = Date.parse(input);
		var date2 = Date.parse(reference);
		if(!date1){
			throw "Invalid date format - "+ input;
		}else{
			if(!date2){
				throw "Invalid date format - "+ reference;
			}else{
				if(date1 > date2){
					return true;
				}
			}
		}

		return false;
	};

	validator.isBeforeToday = function(input){

		if(!input){
			throw "Missing Parameter in isBeforeDate function: 'input'.";
		}

		var date = Date.parse(input);
		if(!date){
			throw "Invalid date format - "+ input;
		}else{
			if(date < Date.now()){
				return true;
			}	
		}

		return false;
	};

	validator.isAfterToday = function(input){

		if(!input){
			throw "Missing Parameter in isAfterDate function: 'input'.";
		}

		var date = Date.parse(input);
		if(!date){
			throw "Invalid date format - "+ input;
		}else{
			if(date > Date.now()){
				return true;
			}	
		}
		
		return false;
	};

	validator.isEmpty = function(input){

		if(!input){
			throw "Missing Parameter in isEmpty function: 'input'.";
		}
	
		var i;
		
		if(input === null || input === undefined){
			return false;
		}
		
		if(input.length === 0){
			return true;
		}else{
				for(i = 0; i < input.length; i++){
					if(input.charAt(i) !== " "){
						return false;
					}
				}
		}
		
		return true;
		
	};
	
	validator.contains = function(inputString, wordsArray){
		if(!inputString){
			throw "Missing Parameter in contains function: 'inputString'.";
		}
		if(!inputString){
			throw "Missing Parameter in contains function: 'wordsArray'.";
		}
		var i,j,k;
		var result = true;
		
		for(i = 0; i < inputString.length; i++){//remove symbols

				if(inputString.charAt(i).toLowerCase() === inputString.charAt(i).toUpperCase()){
					inputString = inputString.split(inputString.charAt(i)).join(" ");
				}
		}
		
		var words = inputString.toLowerCase().split(' ');

		for(k = 0; k < wordsArray.length; k++){

			if(words.indexOf(wordsArray[k]) === -1){
				result = false;
			}
		}
		return result;
	};

	validator.lacks = function(inputString, wordsArray){
		if(!inputString){
			throw "Missing Parameter in lacks function: 'inputString'.";
		}
		if(!inputString){
			throw "Missing Parameter in lacks function: 'wordsArray'.";
		}
		var i,j,k;
		var result = false;
		
		for(i = 0; i < inputString.length; i++){//remove symbols

				if(inputString.charAt(i).toLowerCase() === inputString.charAt(i).toUpperCase()){
					inputString = inputString.split(inputString.charAt(i)).join(" ");
				}
		}
		
		var words = inputString.toLowerCase().split(' ');

		for(k = 0; k < wordsArray.length; k++){

			if(words.indexOf(wordsArray[k]) === -1){
				result = true;
			}
		}
		return result;
	};

	validator.isComposedof = function(input, arr){
		if(!inputString){
			throw "Missing Parameter in isComposedof function: 'input'.";
		}
		if(!arr){
			throw "Missing Parameter in isComposedof function: 'arr'.";
		}
		var i,j;
		result = true;
		for(i = 0; i < arr.length; i++){
			if(input.indexOf(arr[i]) !== -1){
				input = input.split(arr[i]).join("");

			}
		}

		for(j = 0; j < input.length; j++){
			if(input.charAt(j).toLowerCase() !== input.charAt(j).toUpperCase()){
				result = false;
			}
		}

		return result;

	};

	validator.isLength = function(input, n){

		if(!input){
			throw "Missing Parameter in isLength function: 'input'.";
		}
		
		return input.length <= n;
	};

	validator.isOfLength = function(input, n){

		if(!input){
			throw "Missing Parameter in isOfLength function: 'input'.";
		}
		
		return input.length >= n;
	};

	validator.countWords = function (inputString){
		if(!inputString){
			throw "Missing Parameter in countWords function: 'inputString'.";
		}
		var i;
		for(i = 0; i < inputString.length; i++){//remove symbols

				if(inputString.charAt(i).toLowerCase() === inputString.charAt(i).toUpperCase()){
					inputString = inputString.split(inputString.charAt(i)).join(" ").trim();
				}
		}

		var words = inputString.toLowerCase().split(' ');		
		return words.length;
	};

	validator.lessWordsThan = function(input, n){
		if(!input){
			throw "Missing Parameter in lessWordsThan function: 'input'.";
		}

		if(!n){
			throw "Missing Parameter in lessWordsThan function: 'n'.";
		}
		return this.countWords(input) <= n;
	};

	validator.moreWordsThan = function(input, n){
		if(!input){
			throw "Missing Parameter in moreWordsThan function: 'input'.";
		}

		if(!n){
			throw "Missing Parameter in moreWordsThan function: 'n'.";
		}
		return this.countWords(input) >= n;
	}

	validator.isBetween = function(input, floor, ceil){
		if(!input){
			throw "Missing Parameter in isBetween function: 'input'.";
		}

		return (input >= floor && input <= ceil);
	}

	validator.isAlphanumeric = function(input){
	
		if(input.length === 0){
			return true;
		}
		
		if(!input){
			throw "Missing Parameter in isAlphanumeric function: 'input'.";
		}

		var result = true;
		var i, char;

		for(i = 0; i < input.length; i++){
			char = input.charAt(i);
			if((char.toLowerCase() === char.toUpperCase())){
				result = false;
			}
		}
		
		return result;
	};

	validator.isCreditCard = function(input){

		if(!input){
				throw "Missing Parameter in isCreditCard function: 'input'.";
		}
		
		var noHyphens, i;
		var result = true;
			
		if(input.indexOf("-") > -1){ //check for hyphens
			noHyphens = input.split("-").join(""); //make string without hyphens
			
			if(noHyphens.length !== 16){
				result = false;
			}else{
					for(i = 0; i < noHyphens.length; i++){
					char = noHyphens.charAt(i);
					if((parseInt(char).toString() !== char) && (char.toLowerCase() === char.toUpperCase())){ //check if char is not a number or if char is a symbol
						console.log(char);
						result = false;
					}
				}
			}
		}else{ // no hyphens
			if(input.length !== 16){
				result = false;
			}else{
					for(i = 0; i < input.length; i++){
					char = input.charAt(i);
					if((parseInt(char).toString() !== char) && (char.toLowerCase() === char.toUpperCase())){ //check if char is not a number or if char is a symbol
						console.log(char);
						result = false;
					}
				}
			}
		}
		
		return result;
	
	};

	validator.isHex = function isHex(input){
		if(!input){
			throw "Missing Parameter in isCreditCard function: 'input'.";
		}
		
		var i, char;
		var result = true;
		
		if(input.charAt(0) !== "#"){
			result = false;
		}else{
			if(input.length !== 4 && input.length !== 7){ //ensure that the lengths are correct
				result = false;
			}else{
				for(i = 1; i < input.length; i++){ //we start from the second character since we already identified the #
					char = input.charAt(i);
					if((parseInt(char).toString() !== char) && (char.toLowerCase() === char.toUpperCase())){ //if char is not a number and character is a symbol
						result = false;
					}else{
						if((parseInt(char).toString() !== char) && (char.toUpperCase() > "F")){ //if char is not a number and char is a letter greater than F
							result = false;
						}
					}
				}
			}
		}
	};

	validator.isRGB = function(input){

		if(!input){
			throw "Missing Parameter in isRGB function: 'input'.";
		}

		var firstPart = input.slice(0,4); //test for 'rgb(' at the start
		var lastPart = input.charAt(input.length - 1); //test for ')' at the end
		var colorCode = input.slice(4, input.length - 2); //get content that is inside the brackets
		var codeValues = colorCode.split(","); //break string apart by colors
		var i, colorNum;
		var result = true;
		
		if(firstPart === "rgb(" && lastPart === ")"){
			for(i = 0; i < codeValues.length; i++){
				colorNum = parseInt(codeValues[i].trim());
				if(colorNum < 0 || colorNum > 255){
					result = false;
				}
			}
		}else{
			result = false;
		}
		
		return result;
			
		}
	};

	validator.isHSL = function(input){

	if(!input){
		throw "Missing Parameter in isHSL function: 'input'.";
	}

	var firstPart = input.slice(0,4); //test for 'rgb(' at the start
	var lastPart = input.charAt(input.length - 1); //test for ')' at the end
	var colorCode = input.slice(4, input.length - 1); //get content that is inside the brackets
	var codeValues = colorCode.split(","); //break string apart by colors
	var i, colorNum;
	var result = true;
	
	if(firstPart === "hsl(" && lastPart === ")"){
			
		for(i = 0; i < codeValues.length; i++){ // try to convert all code values from a string to a number 
			codeValues[i] = Number(codeValues[i].trim());
		}
		
		if(!isNaN(codeValues[0])){//ensure that value is a number
			if(codeValues[0] < 0 || codeValues[0] > 360){
				result = false;
			}
		}else{
			result = false
		}
		
		if(!isNaN(codeValues[1])){//ensure that value is a number
			if(codeValues[1] < 0 || codeValues[1] > 1){
				result = false;
			}
		}else{
			result = false;
		}
		
		if(!isNaN(codeValues[2])){//ensure that value is a number
			if(codeValues[2] < 0 || codeValues[2] > 1){
				result = false;
			}
		}else{
			result = false;
		}
	}else{
		result = false;
	}
	
	return result;

	};
	
	validator.isColor = function(input){

		if(!input){
			throw "Missing Parameter in isColor function: 'input'.";
		}

		if(this.isHex(input) && this.RGB(input) && this.isHSL(input)){
			return true;
		}else{
			return false;
		}
	};

	validator.isTrimmed = function(input){

		if(!input){
			throw "Missing Parameter in isTrimmed function: 'input'.";
		}

		var newString = input.split(" ");
		if(newString.indexOf('') !== -1){
			return false;
		}else{
			return true;
		}
	};


})(window);