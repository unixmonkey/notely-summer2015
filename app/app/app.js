'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('notely', [
  'ngCookies',
  'notely.notes'
]);

app.directive('focusOn', function() {
  return function(scope, elem, attr) {
    scope.$on(attr.focusOn, function(e) {
      elem[0].focus();
    });
  };
});
