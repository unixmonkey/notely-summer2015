'use strict';

angular.module('notely')
.service('CurrentNote', function() {
  var currentNote = {};

  this.get = function() {
    return currentNote;
  };

  this.set = function(note) {
    currentNote = JSON.parse(JSON.stringify(note));
    return currentNote;
  };
});
