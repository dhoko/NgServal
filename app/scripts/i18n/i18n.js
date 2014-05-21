angular.module('i18n', [])
    .factory('localize', require('./services/i18n'))
    .run(['localize', function(localize) {
        localize.load();
    }]);