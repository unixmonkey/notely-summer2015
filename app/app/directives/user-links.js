'use strict';
/*jshint multistr: true */

angular.module('notely')
.directive('userLinks', function(NotesBackend, CurrentUser) { // camelized directive name tells Angular to look for a hyphenized version <user-links> in html
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
    </div>'
  };

  function userLinksController() {
    this.user = function() {
      return CurrentUser.get();
    };

    this.logout = function() {
      CurrentUser.unset()
      NotesBackend.clearNotes();
    };
  }
});
