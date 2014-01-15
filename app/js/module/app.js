var app = angular.module('ngStarter', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  "use strict";
  $stateProvider
    .state('home', {
      url : '/',
      templateUrl: 'partials/home.html',
      controller : 'homeCtrl'
      })

    .state('page1', {
      url : '/page1',
      templateUrl: "partials/page1.html",
      controller : 'page1Ctrl'
    });

    $urlRouterProvider.otherwise('/');
});