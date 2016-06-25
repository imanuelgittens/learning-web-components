window.addEventListener('load', function(){

	var productList = [{
	    id: 'product1',
	    name: 'Pen',
	    price: 2,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	},{
	    id: 'product2',
	    name: 'Pencil',
	    price: 3,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitre ma.',
	},{
	    id: 'product3',
	    name: 'Notebook',
	    price: 5,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,  mag.',
	},{
	    id: 'product4',
	    name: 'Ruler',
	    price: 1,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, cii.',
	}];

	var shoppingCart = [];

	var toggleButton = document.querySelector('.toggle-cart');
	var addToCartButton = document.querySelector('.cartAdd');


	function showCart(){
		document.getElementById('shoppingCart').className = "active";
	}

	function hideCart(){
		document.getElementById('shoppingCart').className = "inactive";
	}

	function toggleCart(){
		var cart = document.getElementById('shoppingCart');
		if(cart){
			if(cart.className === 'inactive'){
				showCart();
			}else{
				hideCart();
			}
		}
	}

	function buildCartItems(){
		var i, lineItem, prodString;
		var cartDetails = document.querySelector('.cart-products');
		cartDetails.innerHTML = "";

		for(i = 0; i < shoppingCart.length; i++){
			
			lineItem = document.createElement('div');

			prodString = '<div class="sixth cart-options">';
			prodString += '<button class="remove-link" id="remove-product'+i+'">Remove</button>';
			prodString += '</div>';
			prodString += '<div class="sixth cart-item">';
			prodString += '<img src="http://placehold.it/70x70">';
			prodString += '</div>';
			prodString += '<div class="third cart-desc">';
			prodString += '<h3>'+shoppingCart[i].name+'</h3>';
			prodString += '<p>'+shoppingCart[i].desc+'</p>';
			prodString += '</div>';
			prodString += '<div class="sixth cart-qty">';
			prodString += '<input class="prod-qty" type="text" value="'+shoppingCart[i].quantity+'" id="update-product'+i+'"/>';
			prodString += '</div>';
			prodString += '<div class="sixth cart-price">';
			prodString += '<h4><strong>$'+shoppingCart[i].price+'</strong></h4>';
			prodString += '</div>';

			lineItem.innerHTML = prodString;
			cartDetails.appendChild(lineItem);
		}
	}

	function addToCart(product){
		var singleProduct = {};
		singleProduct.id = product.id;
		singleProduct.name = product.name;
		singleProduct.desc = product.desc;
		singleProduct.price = product.price;
		singleProduct.quantity = 1;
		shoppingCart.push(singleProduct);

		buildCartItems();
		totalPrice(0);
		showCart();
	}

	function removeFromCart(index){
		shoppingCart.splice(index, 1);
		buildCartItems();
		totalPrice(0);
		if(shoppingCart.length  <= 0){
			hideCart();
		}
	}

	function changeQuantity(index, value){
		shoppingCart[index].quantity = value;
		totalPrice(0);
	}

	function totalPrice(discount){
		var subTotal = document.getElementById('subTotal');
		var shippingCost = document.getElementById('shippingCost');
		var total = document.getElementById('total');

		var i;
		var result = 0;
		for(i = 0; i < shoppingCart.length; i++){
			result = result + (shoppingCart[i].price * shoppingCart[i].quantity);
		}

		result = result - (result * (discount/100));
		subTotal.innerHTML = '$' + result;
		return result;
	}

	function promoCode(coupon){
		if(coupon === "5ALL"){
			buildCartItems();
			totalPrice(5);
		}
/*		if(coupon === "PEN10"){
			//totalPrice(0);
			for(var i = 0; i < shoppingCart.length; i++){
				if(shoppingCart[i].id === 'product1'){
					shoppingCart[i].price =  shoppingCart[i].price - (shoppingCart[i].price * 0.1)
				}
			}
			totalPrice(0);
		}*/
	}
	//show/hide cart

	toggleButton.addEventListener('click', function(event){
		toggleCart();
	});
	//end show/hide cart

//----

	if(document.addEventListener){
		document.addEventListener('click', handleAddCartClick, false);
	}else{
		if(document.attachEvent){
			document.attachEvent('onclick', handleAddCartClick);
		}
	}

	function handleAddCartClick(event){
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var element = event.target;

		var productNumber;

		if(element.className === 'cartAdd'){
			productNumber = element.id.charAt(element.id.length-1);
			addToCart(productList[Number(productNumber)]);
		}
	}
//----
	if(document.addEventListener){
		document.addEventListener('click', handleRemoveCartClick, false);
	}else{
		if(document.attachEvent){
			document.attachEvent('onclick', handleRemoveCartClick);
		}
	}

	function handleRemoveCartClick(event){
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var element = event.target;

		var productNumber;

		if(element.className === 'remove-link'){
			productNumber = element.id.charAt(element.id.length-1);
			removeFromCart(productNumber);

		}
	}
//---
	if(document.addEventListener){
		document.addEventListener('blur', handleQuantityChangeBlur, true);
	}else{
		if(document.attachEvent){
			document.attachEvent('onblur', handleQuantityChangeBlur);
		}
	}

	function handleQuantityChangeBlur(event){
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var element = event.target;

		var productNumber, value;

		if(element.className === 'prod-qty'){
			value = element.value;
			productNumber = element.id.charAt(element.id.length-1);
			if(value <= 0){
				removeFromCart(productNumber);
			}else{
				changeQuantity(productNumber, value);
			}
		}
	}

//---
	if(document.addEventListener){
		document.addEventListener('click', handleCouponClick, true);
	}else{
		if(document.attachEvent){
			document.attachEvent('onclick', handleCouponClick);
		}
	}

	function handleCouponClick(event){
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var element = event.target;

		var productNumber, value;

		if(element.className === 'apply-coupon'){
			value = document.getElementById('coupon').value;

			if(value){
				promoCode(value);
			}else{
				alert("Enter a coupon code.");
			}
		}
	}

});