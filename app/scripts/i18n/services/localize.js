/**
 * I18n Service
 * Load your translations and update $rootScope
 * It gives you access to your translation.
 */
module.exports = ['$rootScope', '$http', function($rootScope, $http) {

    var i18n = {
        current: "",
        data: {},
        available: []
    };

    /**
     * Load a translation to the $scope
     * - doc BCP 47 {@link http://tools.ietf.org/html/bcp47}
     * - doc Value of HTML5 lang attr {@link http://webmasters.stackexchange.com/questions/28307/value-of-the-html5-lang-attribute}
     * @param {String} lang Your language cf BCP 47
     */
    function setTranslation(lang) {

        if(!lang) {
            lang =  (document.documentElement.lang + '-' + document.documentElement.lang.toUpperCase()) || 'en-EN';
        }else {
            document.documentElement.lang = lang.split('-')[0];
        }

        i18n.current = lang;
        angular.extend(i18n.data[lang], {languages: i18n.available});
        angular.extend($rootScope, i18n.data[lang]);

        console.log("[i18n-i18n@setTranslation] Load your translation with the current lang : ",i18n.current);

    }

    return {
        load: function load() {
            return $http.get('/i18n/languages.json')
                .error(function() {
                    alert("Cannot load i18n translation file");
                })
                .success(function (data) {
                    i18n.data = data;
                    i18n.current = document.documentElement.lang + '-' + document.documentElement.lang.toUpperCase();
                    i18n.available = Object.keys(i18n.data);
                    setTranslation();
                });
        },

        get: function get(lang) {
            return i18n.data[lang || i18n.current];
        },

        current: function current() {
            return i18n.current;
        },
        update: setTranslation
    }
}];