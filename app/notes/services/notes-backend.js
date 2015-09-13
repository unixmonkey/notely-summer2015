'use strict';

angular.module('notely')
.service('NotesBackend', function NotesBackend(CurrentUser, $http, $cookies) {
  var notes = [];

  this.user = function() {
    return CurrentUser.get();
  };

  this.getNotes = function() {
    return notes;
  };

  this.clearNotes = function() {
    notes = [];
  };

  this.fetchNotes = function (callback) {
    var user = this.user();
    if (user.api_key) {
      $http.get(nevernoteBasePath + 'notes?api_key=' + user.api_key)
        .success(function(notesData) {
          notes = notesData;
          typeof callback === 'function' && callback(notes);
        });
    }
  };

  this.postNote = function(noteData, callback) {
    var user = this.user();
    $http.post(nevernoteBasePath + 'notes', {
      api_key: user.api_key,
      note: noteData
    }).success(function(newNoteData){
      var note = newNoteData.note;
      notes.push(note);
      typeof callback === 'function' && callback(notes, note);
    });
  };

  this.replaceNote = function(note, callback) {
    for(var i=0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        notes[i] = note;
      }
    }
    typeof callback === 'function' && callback(notes);
  };

  this.updateNote = function(noteData, callback) {
    var _this = this;
    $http.put(nevernoteBasePath + 'notes/' + noteData.id, {
      api_key: _this.user().api_key,
      note: noteData
    }).success(function(newNoteData){
      _this.replaceNote(newNoteData.note, callback);
    });
  };

  this.deleteNote = function(note, callback) {
    var _this = this;
    $http.delete(nevernoteBasePath + 'notes/' + note.id + '?api_key=' + _this.user().api_key)
    .success(function(newNoteData){
      _this.fetchNotes(callback);
    });
  };
});
