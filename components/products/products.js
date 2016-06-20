window.addEventListener('load', function(){

	var productList = [{
	    id: 1,
	    name: 'Pen',
	    price: 2,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	},{
	    id: 2,
	    name: 'Pencil',
	    price: 3,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitre ma.',
	},{
	    id: 3,
	    name: 'Notebook',
	    price: 5,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,  mag.',
	},{
	    id: 4,
	    name: 'Ruler',
	    price: 1,
	    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, cii.',
	}];

	
	var toggleButton = document.querySelector('.toggle-cart');

	function toggleCart(){
		var cart = document.getElementById('shoppingCart');
		if(cart){
			if(cart.className === 'inactive'){
				document.getElementById('shoppingCart').className = "active";
			}else{
				document.getElementById('shoppingCart').className = "inactive";
			}
		}
	}

/*	function loadProducts(products){
		var i,product, image, shortDesc, price, addToCart;
		var productList = document.getElementById("productList");
		//var product = '';
		for(i = 0; i < products.length; i++){
			product = document.createElement('div');
			product.className = "quarter product";

			image = document.createElement('div');
			image.className = "featured-img";

			shortDesc = document.createElement('div');
			shortDesc.className = "short-desc";

			price = document.createElement('div');
			price.className = "price";

			addToCart = document.createElement('div');
			addToCart.className = "add-to-cart";




		}
	}*/

/*	loadProducts(productList);*/

	//show/hide cart

	toggleButton.addEventListener('click', function(event){
		toggleCart();
	});

	//end show/hide cart


});