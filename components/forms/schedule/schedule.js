var email = document.getElementById('email');
var phone = document.getElementById('phone');
var date = document.getElementById('date');



window.onload = function() {

  email.addEventListener('input', function(event) {
    if (!validator.isEmailAddress(email.value)) {
      email.setCustomValidity("Invalid Email Adrdess");
    } else {
      email.setCustomValidity("");
    }
  });

  phone.addEventListener('input', function(event) {
    if (!validator.isPhoneNumber(phone.value)) {
      phone.setCustomValidity("Invalid Trinidadian Phone Number");
    } else {
      phone.setCustomValidity("");
    }
  });

  date.addEventListener('input', function(event) {
    if (!validator.isDate(date.value)) {
      date.setCustomValidity("Invalid Date");
    } else {
      date.setCustomValidity("");
    }
  });

}