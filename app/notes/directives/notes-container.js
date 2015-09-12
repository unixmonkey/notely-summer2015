'use strict';
/*jshint multistr: true */

angular.module('notely.notes')
.directive('notesContainer', function(NotesBackend) {
  return {
    restrict: 'E',
    replace: true,
    scope: { },
    controllerAs: 'ctrl',
    controller: notesContainerController,
    template: '<div class="container wrap">\
      <div class="row">\
        <div class="col-xs-12">\
          <header>\
            <div class="well">\
              Notely\
              <user-links></user-links>\
            </div>\
          </header>\
        </div>\
      </div>\
      <div class="container" ng-controller="NotesController">\
        <div class="row">\
          <div class="col-xs-4">\
            <sidebar></sidebar>\
          </div>\
          <div class="col-xs-8">\
            <main>\
              <!-- BEGIN main content -->\
              <div ng-view></div>\
              <!-- END main content -->\
            </main>\
          </div>\
        </div>\
      </div>\
    </div>'
  };

  function notesContainerController() {
    this.user = function() {
      return NotesBackend.getUser();
    };
  }
});
