'use strict';
/*jshint multistr: true */

angular.module('notely')
.directive('loginForm', function(NotesBackend, $location, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    controllerAs: 'ctrl',
    controller: loginFormController,
    templateUrl: '/login/directives/login-form.html'
  };

  function loginFormController() {
    var _this = this;
    this.user = {};
    this.errorMessage = '';

    this.getUser = function() {
      return NotesBackend.getUser();
    }

    this.submit = function() {
      NotesBackend.fetchUser(_this.user, function(user, notes) {
        if (!user.id) {
          _this.errorMessage = user.error;
          _this.user.password = '';
        }
      });
    };
  }
});
