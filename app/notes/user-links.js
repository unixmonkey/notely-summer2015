'use strict';
/*jshint multistr: true */

angular.module('notely.notes')
.directive('userLinks', function(NotesBackend, $location) { // camelized directive name tells Angular to look for a hyphenized version <user-links> in html
  return {
    restrict: 'E', // only allow element syntax: <user-links></user-links>
    replace: true, // replace <user-links></user-links> element, instead of nesting inside it
    scope: { }, // use our own (isolate) scope (instead of inheriting the controller's scope)
    controllerAs: 'ctrl',
    controller: userLinksController,
    template: '<div class="user-links">\
      <div ng-show="ctrl.user().id">\
        Signed in as {{ ctrl.user().name }}\
        |\
        <a ng-click="ctrl.logout()">Logout</a>\
      </div>\
      <div ng-hide="ctrl.user().id">\
        <a ng-click="ctrl.goToSignIn()">Sign in</a>\
      </div>\
    </div>'
  };

  function userLinksController() {
    this.user = function() {
      return NotesBackend.getUser();
    }

    this.goToSignIn = function() {
      $location.path('login');
    }

    this.logout = function() {
      NotesBackend.deleteCookie();
      $location.path('login');
    }
  }
});
