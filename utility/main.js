'use strict';

$(document).ready(function(){

  var rgbButton = $('.submit-rgbTest');

  rgbButton.click(function(event){
    event.preventDefault();
    var color = $('#rgbInput')[0].value;
    if(color.length === 0){
      alert('You need to enter a color.');
    }else{
      if(Window.jHelp.isRGB(color)){
        alert('Is a valid RGB color!');
      }else{
        alert('Is not a valid RGB color!');
      }
    }
  });

});