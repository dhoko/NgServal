/**
 * Helpers module
 * Provide some helper to your application
 */
angular.module('helpers', [])
    .factory('actions', require('./services/actions'))
    .directive('openPage', require('./directives/openPage'))
    .run(['$rootScope', 'actions', function ($rootScope, actions) {

        /**
         * Listen when we change to another state
         * It will reset our timeouts and if you're not home it will trigger
         * a return to home after actions.TIMEOUT_BEFORE_HOME.
         */
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            actions.reset('action',('home' !== toState.name));
        });
    }]);