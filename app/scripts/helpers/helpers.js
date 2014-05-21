/**
 * Helpers module
 * Provide some helper to your application
 */
angular.module('helpers', [])
    .factory('actions', require('./services/actions'))
    .directive('openPage', require('./directives/openPage'))
    .run(['$rootScope', 'actions', function ($rootScope, actions) {

        $rootScope.$on('$stateChangeStart', function() {
            actions.reset('action');
        });
    }])