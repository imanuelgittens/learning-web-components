window.addEventListener('load', function(){

	var color = document.getElementById('color');
	var red = document.getElementById('red');
	var green = document.getElementById('green');
	var blue = document.getElementById('blue');
	var alpha = document.getElementById('alpha');
	var result = document.getElementById('result');


	function showColor(){
		color.value = "rgba(" + red.value + ", " + green.value + ", " + blue.value + ", " + alpha.value + ")";
		result.style.backgroundColor = color.value;
	}

	red.addEventListener('change', function(event){
		event.preventDefault();
		showColor();
	});

	green.addEventListener('change', function(event){
		event.preventDefault();
		showColor();

	});

	blue.addEventListener('change', function(event){
		event.preventDefault();
		showColor();

	});

	alpha.addEventListener('change', function(event){
		event.preventDefault();
		showColor();

	});


	color.addEventListener('input', function(event){
		if(!validator.isRGB(color.value)){
			color.setCustomValidity("Invalid Color Code")
		}else{
			color.setCustomValidity("");
		}
	})
});