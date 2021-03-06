window.addEventListener('load', function(){

	//Variables

	var products = [
			{
				id: 'product1',
	    		name: 'Pen',
	    		featuredImg: 'http://placehold.it/400x400',
	    		price: 10,
	    		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	    		
			},
			{
				id: 'product2',
	    		name: 'Pencil',
	    		featuredImg: 'http://placehold.it/400x400',
	    		price: 20,
	    		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	    		
			},
			{
				id: 'product3',
	    		name: 'Ruler',
	    		featuredImg: 'http://placehold.it/400x400',
	    		price: 30,
	    		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
			},
			{
				id: 'product4',
	    		name: 'Eraser',
	    		featuredImg: 'http://placehold.it/400x400',
	    		price: 40,
	    		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
			}
	]

	var cart = {
		coupon: "",
		items: [],
		total: 0,
		couponTotal: 0
	}

	var toggleButton = document.querySelector('.toggle-cart');

	//End Variables

	//Functions

	function loadProducts(products){
		var i, singleProduct, productString;
		var productArea = document.getElementById('productsWrapper')
		for(i = 0; i < products.length; i++){
			singleProduct = document.createElement('div');
			singleProduct.id = products[i].id;
			singleProduct.className = 'single-product';

			productString = '<div class="quarter product">';
			productString += '<div class="featured-img">';
			productString += '<img src="'+products[i].featuredImg+'">';
			productString += '</div>';
			productString += '<div class="title">';
			productString += '<h3>'+products[i].name+'</h3>';
			productString += '</div>';
			productString += '<div class="short-desc">';
			productString += '<p>'+products[i].desc+'</p>';
			productString += '</div>';
			productString += '<div class="price">';
			productString += '<p>$'+products[i].price.toFixed(2)+'</p>';
			productString += '</div>';
			productString += '<div class="add-to-cart">';
			productString += '<button class="cartAdd" id="product0">Add To Cart</button>';
			productString += '</div>';
			productString += '</div>';
			singleProduct.innerHTML = productString;
			productArea.appendChild(singleProduct);
		}
	}

	loadProducts(products);


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
		var shoppingCart = cart.items;

		for(i = 0; i < shoppingCart.length; i++){
			
			lineItem = document.createElement('div');
			lineItem.id = shoppingCart[i].id;
			lineItem.classList += "cart-details clearfix";
			//lineItem.classList += "clearfix";

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
			prodString += '<input class="prod-qty" type="text" value="'+shoppingCart[i].qty+'" id="update-product'+i+'"/>';
			prodString += '</div>';
			prodString += '<div class="sixth cart-price">';
			prodString += '<h4><strong>$'+shoppingCart[i].price+'</strong></h4>';
			prodString += '</div>';

			lineItem.innerHTML = prodString;
			cartDetails.appendChild(lineItem);
		}
	}	

	function addToCart(id){
		var i, j, cartItem;
		var inCart = false;
		for(j = 0; j < cart.items.length; j++){
			if(cart.items[j].id === id){
				inCart = true;
			}
		}

		if(inCart){
			incrementQty(id);
			alert('Quantity Updated!');
		}else{
			for(i = 0; i < products.length; i++){
				if(products[i].id === id){
					cartItem = products[i];
					cartItem.qty = 0
					cart.items.push(cartItem);
					incrementQty(id);
				}
			}
		}
		
		buildCartItems();
		showCart();
		totalPrice();
	}

	function removeFromCart(id){
		var i;
		for(i = 0; i < cart.items.length; i++){
			if(cart.items[i].id === id){
				cart.items.splice(i, 1);
			}
		}
		if(cart.items.length < 1){
			buildCartItems();
			hideCart();
		}else{
			buildCartItems();
			totalPrice()
		}
		
	}

	function incrementQty(id){
		var i;
		for(i = 0; i < cart.items.length; i++){
			if(cart.items[i].id === id){
				cart.items[i].qty++;
			}
		}

	}

	function decrementQty(id){
		var i;
		for(i = 0; i < cart.items.length; i++){
			if(cart.items[i].id === id){
				cart.items[i].qty--;
			}
		}
	}

	function changeQuantity(id, value){
		var i;
		for(i = 0; i < cart.items.length; i++){
			if(cart.items[i].id === id){
				cart.items[i].qty = Number(value);
			}
		}
		buildCartItems();
		totalPrice();
	}

	function totalPrice(){
		var coupon = cart.coupon;
		var subTotal = document.getElementById('subTotal');
		var shippingCost = document.getElementById('shippingCost');
		var total = document.getElementById('total');

		var i,j,k;
		var result = 0;
		var penCount = [];
		var couponTotal = 0
		var existsRuler = [];
		

		if(coupon === '5ALL'){

			for(i = 0; i < cart.items.length; i++){
				couponTotal = cart.total - (cart.items[i].price * 0.05);

			}
			

			if(couponTotal < cart.couponTotal){
				cart.couponTotal = couponTotal;
				buildCartItems();
				subTotal.innerHTML = '$' + cart.couponTotal;
			}else{
				alert("Coupon doesn't reduce your purchase amount.");
			}
			console.log(cart.couponTotal)
		}else{
			if(coupon === 'PEN10'){

				for(j = 0; j < cart.items.length; j++){
					if(cart.items[j].id === 'product1'){

						penCount[j] = cart.items[j];
					}
				}
				for(k = 0; k < penCount.length; k++){
					couponTotal = cart.total - (penCount[k].price * 0.1 *penCount[k].qty);
				}
				console.log(cart.couponTotal)
				if(couponTotal < cart.couponTotal){
					cart.couponTotal = couponTotal;
					buildCartItems();
					subTotal.innerHTML = '$' + couponTotal;
				}else{
					alert("Coupon doesn't reduce your purchase amount.");
				}

		
			}else{

				if(coupon === 'RULERFREE'){
					for(i = 0; i < cart.items.length; i++){
						if(cart.items[i].id === 'product3'){
							existsRuler.push(cart.items[i]);
						}
					}
					if(existsRuler.length > 0){
						for(i = 0; i < cart.items.length; i++){
							couponTotal = cart.total - existsRuler[0].price;
						}
						if(couponTotal < cart.couponTotal){
							cart.couponTotal = couponTotal;
							buildCartItems();
							subTotal.innerHTML = '$' + cart.couponTotal;
						}else{
							alert("Coupon doesn't reduce your purchase amount.");
						}

					}else{
						alert("No Ruler in Cart!")
					}
				}else{
					for(i = 0; i < cart.items.length; i++){
						result = result + (cart.items[i].price * cart.items[i].qty);
					}
					cart.total = result;
					cart.couponTotal = result;
					subTotal.innerHTML = '$' + cart.couponTotal;
				}
			}
		}
	}

	function promoCode(coupon){
		cart.coupon = coupon;
		totalPrice();
	}

	function handleAddCartClick(event){
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var element = event.target;

		var containingDiv;

		if(element.className === 'cartAdd'){
			containingDiv = element.parentNode.parentNode.parentNode;
			addToCart(containingDiv.id);
		}
	}

	function handleRemoveCartClick(event){
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var element = event.target;

		var containingDiv;

		if(element.className === 'remove-link'){
			containingDiv = element.parentNode.parentNode;
			removeFromCart(containingDiv.id);
		}
	}

	function handleQuantityChangeBlur(event){
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var element = event.target;

		var containingDiv, value;

		if(element.className === 'prod-qty'){
			value = element.value;
			containingDiv = element.parentNode.parentNode;
			console.log(containingDiv);
			if(value <= 0){
				removeFromCart(containingDiv.id);
			}else{
				changeQuantity(containingDiv.id, value);
			}
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


	//End functions

	//Listeners

	toggleButton.addEventListener('click', function(event){
		toggleCart();
	});


	if(document.addEventListener){
		document.addEventListener('click', handleAddCartClick, false);
	}else{
		if(document.attachEvent){
			document.attachEvent('onclick', handleAddCartClick);
		}
	}


	if(document.addEventListener){
		document.addEventListener('click', handleRemoveCartClick, false);
	}else{
		if(document.attachEvent){
			document.attachEvent('onclick', handleRemoveCartClick);
		}
	}

	if(document.addEventListener){
		document.addEventListener('blur', handleQuantityChangeBlur, true);
	}else{
		if(document.attachEvent){
			document.attachEvent('onblur', handleQuantityChangeBlur);
		}
	}

	if(document.addEventListener){
		document.addEventListener('click', handleCouponClick, true);
	}else{
		if(document.attachEvent){
			document.attachEvent('onclick', handleCouponClick);
		}
	}

	//End Listeners

});