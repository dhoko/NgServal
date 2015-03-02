angular.module('core', ['ui.router', 'ngBabelfish'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url : '/',
        templateUrl: 'partials/home.html',
        controller : 'homeCtrl'
        })

      .state('page2', {
        url : '/page2',
        templateUrl: "partials/page2.html",
        controller : 'page2Ctrl',
        controllerAs : 'ctrl'
      });

      $urlRouterProvider.otherwise('/');
  });
