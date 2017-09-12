
'use strict';

let moduleA = require('./modules/module_a');
if (module.hot) {
    module.hot.accept(moduleA, function () {
        moduleA();
    });
}


