// var i18n = require('../i18n/i18n');
var helpers = require('../helpers/helpers');

// angular.module('i18n').value("custom", {
//     namespace: "i18n"
// });
var core = angular.module('ngServal', ['ui.router','servalI18n','helpers']);

core.config(require('./coreConfig'))
    .controller("rootCtrl", require('./controllers/root'))
    .controller("welcomeCtrl", require('./controllers/welcome'))
    // .factory('actions', require('./services/actions'))
    // .run([' '$state', function(actions, $state) {
    //     actions.init();
    // }]);