
var email = document.getElementById('email');
var password = document.getElementById('password');

/*function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}*/



window.onload = function() {

  email.addEventListener('input', function(event) {
    if (!validator.isEmailAddress(email.value)) {
      email.setCustomValidity("I expect an e-mail, darling!");
    } else {
      email.setCustomValidity("");
    }
  });

}




