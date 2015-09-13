'use strict';

// Declare app level module which depends on views, and components
angular.module('notely', [
  'ngCookies',
  'notely.notes'
]);

// Declare global variable for API access
var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
