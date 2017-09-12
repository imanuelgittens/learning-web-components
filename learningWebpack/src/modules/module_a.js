
'use strict';
let css = require('../styles/module_a.scss');


module.exports = function moduleA(){
    console.log('module_a is loaded again');
    [1, 2, 3].forEach(item => console.log(item));
    // Your code
};

