angular.module('core', [
  'ui.router',
  'ngAria',
  'ngBabelfish',
  'about'
  ])
  .config(($stateProvider, $urlRouterProvider, babelfishProvider) => {

    $stateProvider
      .state('home', {
        url : '/',
        templateUrl: 'partials/core-home.html'
       })

      .state('page2', {
        url : '/page2',
        templateUrl: 'partials/core-page2.html'
      });

      babelfishProvider.init({
        url: 'i18n/languages.json'
      });

      $urlRouterProvider.otherwise('/');
  });
