var i18n = require('../i18n/i18n');

var core = angular.module('ngStarter', ['ui.router','i18n']);

core.config(require('./coreConfig'))
    .controller("rootCtrl", require('./controllers/root'))
    .controller("welcomeCtrl", require('./controllers/welcome'))
    // .factory('localize', require('./services/i18n'))
    .factory('actions', require('./services/actions'))
    .run(['actions', '$state', function(actions, $state) {
        // localize.load();
        actions.init();
    }]);