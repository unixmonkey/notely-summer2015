'use strict';
/*jshint multistr: true */

angular.module('notely')
.directive('mainContainer', function(NotesBackend) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: '<div class="container">\
        <div class="row">\
          <div class="col-xs-4">\
            <sidebar></sidebar>\
          </div>\
          <div class="col-xs-8">\
            <main>\
              <login-form></login-form>\
              <note-editor></note-editor>\
            </main>\
          </div>\
        </div>\
      </div>'
  };
});
