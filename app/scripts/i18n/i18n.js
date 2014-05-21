/**
 * I18n module
 * Translate your application
 */
angular.module('i18n', [])
    .factory('localize', require('./services/i18n'))
    .directive('i18nLoad', require('./directives/i18nLoad'))
    .run(['localize', function(localize) {
        localize.load();
    }]);