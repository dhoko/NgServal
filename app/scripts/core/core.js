var helpers = require('../helpers/helpers');
var core = angular.module('ngServal', ['ui.router','servalI18n','helpers']);

core.config(require('./coreConfig'))
    .controller("rootCtrl", require('./controllers/root'))
    .controller("welcomeCtrl", require('./controllers/welcome'))
    // .factory('actions', require('./services/actions'))
    // .run([' '$state', function(actions, $state) {
    //     actions.init();
    // }]);