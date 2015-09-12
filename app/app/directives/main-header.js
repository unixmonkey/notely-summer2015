'use strict';
/*jshint multistr: true */

angular.module('notely')
.directive('mainHeader', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: '<div class="row">\
      <div class="col-xs-12">\
        <header>\
          <div class="well">\
            Notely\
            <user-links></user-links>\
          </div>\
        </header>\
      </div>\
    </div>'
  };
});
