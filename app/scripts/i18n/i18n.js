/**
 * I18n module
 * Translate your application
 */
angular.module('i18n', [])
    .factory('localize', require('./services/localize'))
    .directive('i18nLoad', require('./directives/i18nLoad'))
    .directive('i18nBind', require('./directives/i18nBind'))
    .filter('translate', require('./filters/translate'))
    .run(['localize', function(localize) {
        localize.load();
    }]);