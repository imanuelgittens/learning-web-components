window.addEventListener('load', function(){

	var result = document.getElementById('result');
	var calculation = "";

	var zero = document.getElementById('zero');
	var one = document.getElementById('one');
	var two = document.getElementById('two');
	var three = document.getElementById('three');
	var four = document.getElementById('four');
	var five = document.getElementById('five');
	var six = document.getElementById('six');
	var seven = document.getElementById('seven');
	var eight = document.getElementById('eight');
	var nine = document.getElementById('nine');
	var plus = document.getElementById('plus');
	var minus = document.getElementById('minus');
	var multiply = document.getElementById('multiply');
	var divide = document.getElementById('divide');
	var clear = document.getElementById('clear');
	var decimal = document.getElementById('decimal');
	var equals = document.getElementById('equals');
	var del = document.getElementById('delete');

	zero.addEventListener('click', function(event){
		event.preventDefault();
		calculation += zero.innerHTML;
		result.value = calculation;		
	});

	one.addEventListener('click', function(event){
		event.preventDefault();
		calculation += one.innerHTML;
		result.value = calculation;		
	});

	two.addEventListener('click', function(event){
		event.preventDefault();
		calculation += two.innerHTML;
		result.value = calculation;		
	});

	three.addEventListener('click', function(event){
		event.preventDefault();
		calculation += three.innerHTML;
		result.value = calculation;		
	});

	four.addEventListener('click', function(event){
		event.preventDefault();
		calculation += four.innerHTML;
		result.value = calculation;		
	});

	five.addEventListener('click', function(event){
		event.preventDefault();
		calculation += five.innerHTML;
		result.value = calculation;		
	});

	six.addEventListener('click', function(event){
		event.preventDefault();
		calculation += six.innerHTML;
		result.value = calculation;		
	});

	seven.addEventListener('click', function(event){
		event.preventDefault();
		calculation += seven.innerHTML;
		result.value = calculation;		
	});

	eight.addEventListener('click', function(event){
		event.preventDefault();
		calculation += eight.innerHTML;
		result.value = calculation;		
	});

	nine.addEventListener('click', function(event){
		event.preventDefault();
		calculation += nine.innerHTML;
		result.value = calculation;		
	});

	plus.addEventListener('click', function(event){
		event.preventDefault();
		calculation += plus.innerHTML;
		result.value = calculation;		
	});

	minus.addEventListener('click', function(event){
		event.preventDefault();
		calculation += minus.innerHTML;
		result.value = calculation;		
	});

	divide.addEventListener('click', function(event){
		event.preventDefault();
		calculation += divide.innerHTML;
		result.value = calculation;		
	});

	multiply.addEventListener('click', function(event){
		event.preventDefault();
		calculation += multiply.innerHTML;
		result.value = calculation;		
	});

	decimal.addEventListener('click', function(event){
		event.preventDefault();
		calculation += decimal.innerHTML;
		result.value = calculation;		
	});

	clear.addEventListener('click', function(event){
		event.preventDefault();
		calculation = "";
		result.value = calculation;		
	});

	del.addEventListener('click', function(event){
		event.preventDefault();
		calculation = calculation.substr(0, calculation.length-1);
		result.value = calculation;		
	});

	equals.addEventListener('click', function(event){
		event.preventDefault();
		try {
			result.value = eval(calculation);
		} catch(e) {

			result.value = "Error!";
		}		
	});


});