
var cc = document.getElementById('credit-card');

//validate credit card field
window.onload = function() {

  cc.addEventListener('input', function(event) {
    if (!validator.isCreditCard(cc.value)) {
      cc.setCustomValidity("Invalid Credit Cart Number.");
    } else {
      cc.setCustomValidity("");
    }
  });

}