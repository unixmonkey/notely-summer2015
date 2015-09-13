'use strict';
/*jshint multistr: true */

angular.module('notely')
.directive('noteEditor', function(NotesBackend, CurrentNote, CurrentUser) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    controllerAs: 'ctrl',
    controller: noteEditorController,
    templateUrl: '/notes/directives/note-editor.html'
  };

  function noteEditorController() {
    var _this = this;
    var note = {};

    this.user = function() {
      return CurrentUser.get();
    };

    this.commit = function() {
      if (_this.note.id) {
        NotesBackend.updateNote(_this.note, _this.refreshNotes);
      }
      else {
        note = NotesBackend.postNote(_this.note, _this.refreshNotes);
      }
    };

    this.currentNote = function() {
      _this.note = CurrentNote.get();
    };

    this.buttonText = function(note) {
      return (_this.note && _this.note.id) ? 'Update Note' : 'Create Note';
    };

    this.cloneNote = function(note) {
      return JSON.parse(JSON.stringify(note));
    };

    this.deleteNote = function() {
      NotesBackend.deleteNote(note, _this.refreshNotes);
      note = {};
    };

    this.refreshNotes = function(notes, note) {
      if (note) {
        _this.note = _this.cloneNote(note);
      }
    };
  }
});
