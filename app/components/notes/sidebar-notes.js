import NotesBackend from '../../services/notes-backend';
import CurrentNote from '../../services/current-note';

angular.module('notely')
.directive('sidebarNotes', function(NotesBackend, CurrentNote) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    controllerAs: 'ctrl',
    controller: sidebarNotesController,
    template: `
      <ul id="notes" ng-show="ctrl.hasNotes()">
        <li id="note_{{ note.id }}"
          ng-repeat="note in ctrl.notes | orderBy: '-id' | limitTo: 10"
          ng-click="ctrl.loadNote(note)">
          <div class="note-title">{{ note.title }}</div>
          <div class="note-body">{{ note.body_text }}</div>
        </li>
      </ul>`
  };

  function sidebarNotesController() {
    var _this = this;
    this.notes = [];

    this.hasNotes = function() {
      return _this.notes.length > 0;
    };

    this.loadNote = function(note) {
      CurrentNote.set(note);
    };

    this.cloneNote = function(note) {
      return JSON.parse(JSON.stringify(note));
    };

    this.refreshNotes = function(notes, note) {
      if (note) {
        _this.note = _this.cloneNote(note);
      }
      _this.notes = notes;
    };
    NotesBackend.fetchNotes(this.refreshNotes);
  }
});
