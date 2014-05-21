/**
 * Helpers module
 * Provide some helper to your application
 */
angular.module('helpers', [])
    .factory('actions', require('./services/actions'))
    .directive('openPage', require('./directives/openPage'));