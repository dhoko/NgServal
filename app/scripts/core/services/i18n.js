module.exports = ['$rootScope', '$http', function($rootScope, $http) {

    var i18n = {
        current: "",
        data: {}
    };
    return {
        load: function load() {
            return $http.get('/i18n/languages.json')
                .then(function i18nGetter(data) {
                    if(data.status < 400) {
                        i18n.data = data.data;
                        i18n.current = document.documentElement.lang + '-' + document.documentElement.lang.toUpperCase();

                        angular.extend(i18n.data[i18n.current], {languages: Object.keys(i18n.data)});
                        angular.extend($rootScope, i18n.data[i18n.current]);
                    }
                })
        },

        get: function get(lang) {
            console.log(i18n.data[lang]);
            return i18n.data[i18n.current];
        }
    }
}];