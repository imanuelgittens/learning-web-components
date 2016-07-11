var billingFirst = document.getElementById('billingFName');
var billingLast = document.getElementById('billingLName');
var shippingFirst = document.getElementById('shippingFName');
var shippingLast = document.getElementById('shippingLName');

window.addEventListener('load', function(){
	billingFirst.addEventListener('input', function(event){
		if(!validator.isLength(billingFirst.value, 15)){
			billingFirst.setCustomValidity("Name too long. Use 15 characters or less.");
		}else{
			billingFirst.setCustomValidity("");
		}
	});

	billingLast.addEventListener('input', function(event){
		if(!validator.isLength(billingLast.value, 15)){
			billingLast.setCustomValidity("Name too long. Use 15 characters or less.");
		}else{
			billingLast.setCustomValidity("");
		}
	});

	shippingFirst.addEventListener('input', function(event){
		if(!validator.isLength(shippingFirst.value, 15)){
			shippingFirst.setCustomValidity("Name too long. Use 15 characters or less.");
		}else{
			shippingFirst.setCustomValidity("");
		}
	});

	shippingLast.addEventListener('input', function(event){
		if(!validator.isLength(shippingLast.value, 15)){
			shippingLast.setCustomValidity("Name too long. Use 15 characters or less.");
		}else{
			shippingLast.setCustomValidity("");
		}
	});
});