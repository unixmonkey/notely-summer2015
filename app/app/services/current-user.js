'use strict';

let Constants = require('../constants.js');

angular.module('notely')
.service('CurrentUser', function($http, $cookies) {
  var currentUser = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {};

  this.get = function() {
    return currentUser;
  };

  this.set = function(userData) {
    this.unset();
    currentUser = userData;
    $cookies.put('user', JSON.stringify(userData));
    return this.get();
  };

  this.unset = function() {
    $cookies.remove('user');
    currentUser = {};
  };

  this.fetch = function(userFormData, callback) {
    var _this = this;
    $http.post(Constants.API_BASE_PATH + 'session', {
      user: {
        username: userFormData.username,
        password: userFormData.password
      }
    }).success(function(userData){
      _this.set(userData);
    }).error(function(userData) {
      userData = userData || { error: 'Oops! Something went wrong when logging in.' };
      typeof callback === 'function' && callback(userData);
    });
  };
});
