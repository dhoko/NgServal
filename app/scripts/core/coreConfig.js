/**
 * Core Module configuration
 */
module.exports = ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url : '/',
      templateUrl: 'partials/core-root.html',
      controller : 'rootCtrl'
      })

    .state('welcome', {
      url : '/welcome',
      templateUrl: "partials/core-home.html",
      controller : 'welcomeCtrl'
    });

    $urlRouterProvider.otherwise('/');

}];