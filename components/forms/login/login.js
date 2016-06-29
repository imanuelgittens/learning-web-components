
var email = document.getElementById('email');
var password = document.getElementById('password');


window.onload = function() {

  email.addEventListener('input', function(event) {
    if (!validator.isEmailAddress(email.value)) {
      email.setCustomValidity("Invalid Email Address");
    } else {
      email.setCustomValidity("");
    }
  });

}




