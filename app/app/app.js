'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('notely', [
  'ngRoute',
  'ngCookies',
  'notely.notes'
]);

// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//   $routeProvider.otherwise({redirectTo: '/login'});
//   $locationProvider.html5Mode(true);
// }]);

app.directive('focusOn', function() {
  return function(scope, elem, attr) {
    scope.$on(attr.focusOn, function(e) {
      elem[0].focus();
    });
  };
});
