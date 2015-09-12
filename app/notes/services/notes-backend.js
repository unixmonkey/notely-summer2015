'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
var apiKey = '$2a$10$TTc8gLTzfWBk9SsDO7p.J.acOzMMG535814CudrCMQgmjUSvbQ2ju';

angular.module('notely')
.service('NotesBackend', function NotesBackend($http, $cookies) {
  var notes = [];
  var user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {};

  this.deleteCookie = function() {
    $cookies.remove('user');
    user = {};
    notes = [];
  };

  this.getUser = function() {
    return user;
  };

  this.fetchUser = function(userFormData, callback) {
    var _this = this;
    $http.post(nevernoteBasePath + 'session', {
      user: {
        username: userFormData.username,
        password: userFormData.password
      }
    }).success(function(userData){
      $cookies.put('user', JSON.stringify(userData));
      user = userData;
      _this.fetchNotes(function() {
        typeof callback === 'function' && callback(user, notes);
      });
    }).error(function(userData) {
      userData = userData || { error: 'Oops! Something went wrong when logging in.' };
      typeof callback === 'function' && callback(userData);
    });
  };

  this.getNotes = function() {
    return notes;
  };

  this.fetchNotes = function (callback) {
    if (user.api_key) {
      $http.get(nevernoteBasePath + 'notes?api_key=' + user.api_key)
        .success(function(notesData) {
          notes = notesData;
          typeof callback === 'function' && callback(notes);
        });
    }
  };

  this.postNote = function(noteData, callback) {
    var _this = this;
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
      api_key: apiKey,
      note: noteData
    }).success(function(newNoteData){
      _this.replaceNote(newNoteData.note, callback);
    });
  };

  this.deleteNote = function(note, callback) {
    var _this = this;
    $http.delete(nevernoteBasePath + 'notes/' + note.id + '?api_key=' + apiKey)
    .success(function(newNoteData){
      _this.fetchNotes(callback);
    });
  };
});
