!function(){"use strict";function e(){let e=Math.floor(200*Math.random()+0),n=new XMLHttpRequest,o=document.querySelector(".numberFactTitle"),r=document.querySelector(".factString");n.onload=function(){200===n.status&&(o.innerHTML="Here is a fact about the number "+e,r.innerHTML=n.response)},n.open("GET",t+"/"+e),n.send()}let t="http://numbersapi.com";document.addEventListener("DOMContentLoaded",e),document.querySelector(".newNumberFact").addEventListener("click",e)}();