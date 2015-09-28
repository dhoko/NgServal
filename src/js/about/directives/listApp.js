angular.module('about')
  .directive('listApp', () => {

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'partials/about-listApp.html'
    };

  });
