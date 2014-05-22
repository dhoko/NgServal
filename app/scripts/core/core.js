var i18n = require('../i18n/i18n');
    helpers = require('../helpers/helpers');

var core = angular.module('ngServal', ['ui.router','i18n','helpers']);

core.config(require('./coreConfig'))
    .controller("rootCtrl", require('./controllers/root'))
    .controller("welcomeCtrl", require('./controllers/welcome'))
    // .factory('actions', require('./services/actions'))
    // .run([' '$state', function(actions, $state) {
    //     actions.init();
    // }]);