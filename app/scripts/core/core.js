var core = angular.module('ngStarter', ['ui.router']);

core.config(require('./coreConfig'))
    .controller("rootCtrl", require('./controllers/root'))
    .controller("welcomeCtrl", require('./controllers/welcome'))
    .factory('localize', require('./services/i18n'))
    .factory('actions', require('./services/actions'))
    .run(['localize','actions', '$state', function(localize, actions, $state) {
        localize.load();
        actions.init();
    }]);