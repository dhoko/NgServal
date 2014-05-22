/**
 * Core Module configuration
 */
module.exports = ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url : '/',
      templateUrl: 'partials/core-home.html',
      controller : 'rootCtrl'
      })

    .state('welcome', {
      url : '/welcome',
      templateUrl: "partials/core-welcome.html",
      controller : 'welcomeCtrl'
    });

    $urlRouterProvider.otherwise('/');

}];