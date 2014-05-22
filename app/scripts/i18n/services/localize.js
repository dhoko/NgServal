/**
 * I18n Service
 * Load your translations and update $rootScope
 * It gives you access to your translation.
 */
module.exports = ['$rootScope', '$http', function($rootScope, $http) {

    var i18n = {
        current: "",
        data: {},
        available: [],
        currentState: ""
    };

    /**
     * Load a translation to the $scope
     * - doc BCP 47 {@link http://tools.ietf.org/html/bcp47}
     * - doc Value of HTML5 lang attr {@link http://webmasters.stackexchange.com/questions/28307/value-of-the-html5-lang-attribute}
     * @param {String} lang Your language cf BCP 47
     */
    function setTranslation(page) {

        page = page || 'home';
        i18n.currentState = page;
        lang = i18n.current;

        if(i18n.data[lang]) {
            angular.extend(i18n.data[lang]['_common'], {languages: i18n.available});
            angular.extend(i18n.data[lang][page], i18n.data[lang]['_common']);
            angular.extend($rootScope, i18n.data[lang][page]);
            console.log("[i18n-i18n@setTranslation] Load your translation with the current lang : ",i18n.current);
        }
    }

    /**
     * Load a translation to the $scope for a language
     * - doc BCP 47 {@link http://tools.ietf.org/html/bcp47}
     * - doc Value of HTML5 lang attr {@link http://webmasters.stackexchange.com/questions/28307/value-of-the-html5-lang-attribute}
     * @trigger {Event} i18n:localize:changed {previous:XXX,value:XXX2}
     * @param {String} lang Your language cf BCP 47
     */
    function loadLanguage(lang) {

        var old = document.documentElement.lang;
        if(!lang) {
            lang =  (old + '-' + old.toUpperCase()) || 'en-EN';
        }else {
            document.documentElement.lang = lang.split('-')[0];
        }

        i18n.current = lang;

        $rootScope.$emit('i18n:localize:changed', {
            previous: (old + '-' + old.toUpperCase()),
            value: lang
        });

        console.log('[i18n-i18n@loadLanguage] Update APP language from %s to %s', (old + '-' + old.toUpperCase()),lang);
    }

    $rootScope.$on('i18n:localize:changed', function(e, data) {
        setTranslation(i18n.currentState);
    });

    return {
        load: function load(page) {
            return $http.get('/i18n/languages.json')
                .error(function() {
                    alert("Cannot load i18n translation file");
                })
                .success(function (data) {
                    i18n.data = data;
                    i18n.current = document.documentElement.lang + '-' + document.documentElement.lang.toUpperCase();
                    i18n.available = Object.keys(i18n.data);
                })
                .then(function() {
                    setTranslation(page);
                });
        },

        get: function get(lang) {
            return angular.extend(i18n.data[lang || i18n.current][i18n.currentState] , i18n.data[lang || i18n.current]['_common']);
        },

        all: function all(lang) {
            return i18n.data[lang || i18n.current];
        },

        current: function current() {
            return i18n.current;
        },
        updateState: setTranslation,
        updateLang: loadLanguage
    }
}];