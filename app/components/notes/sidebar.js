import sidebarNotes from './sidebar-notes';

angular.module('notely')
.directive('sidebar', function(CurrentNote, CurrentUser) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    controllerAs: 'ctrl',
    controller: sidebarController,
    template: `
      <nav id="sidebar" ng-show="ctrl.user().id">
        <button class="new-note btn btn-default" ng-click="ctrl.clearNote()">
          <i class="fa fa-plus-circle"></i>
          New Note
        </button>
        <sidebar-notes></sidebar-notes>
      </nav>`
  };

  function sidebarController() {
    this.user = function() {
      return CurrentUser.get();
    };

    this.clearNote = function() {
      CurrentNote.set({});
    };
  }
});
