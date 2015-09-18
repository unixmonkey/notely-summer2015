import CurrentUser from './current-user'
import Constants from '../constants'

class NotesBackend {
  constructor(CurrentUser, $http, $cookies) {
    this.CurrentUser = CurrentUser
    this.$http = $http
    this.$cookies = $cookies
    this.notes = []
  }

  user() {
    return this.CurrentUser.get()
  }

  getNotes() {
    return this.notes
  }

  clearNotes() {
    this.notes = []
  }

  fetchNotes(callback) {
    var user = this.user()
    if (user.api_key) {
      this.$http.get(`${Constants.API_BASE_PATH}notes?api_key=${user.api_key}`)
      .success((notesData) => {
        this.notes = notesData
        typeof callback === 'function' && callback(this.notes)
      })
    }
  }

  postNote(noteData, callback) {
    var user = this.user()
    this.$http.post(`${Constants.API_BASE_PATH}notes`, {
      api_key: user.api_key,
      note: noteData
    }).success((newNoteData) => {
      let note = newNoteData.note
      this.notes.push(note)
      typeof callback === 'function' && callback(this.notes, note)
    })
  }

  replaceNote(note, callback) {
    for(let i=0; i < this.notes.length; i++) {
      if (this.notes[i].id === note.id) {
        this.notes[i] = note
      }
    }
    typeof callback === 'function' && callback(notes)
  }

  updateNote(noteData, callback) {
    let user = this.user()
    this.$http.put(`${Constants.API_BASE_PATH}notes/${noteData.id}`, {
      api_key: user.api_key,
      note: noteData
    }).success((newNoteData) => {
      this.replaceNote(newNoteData.note, callback)
    })
  }

  deleteNote(note, callback) {
    this.$http.delete(`${Constants.API_BASE_PATH}notes/${note.id}?api_key=${this.user().api_key}`)
    .success((newNoteData) => {
      this.fetchNotes(callback)
    })
  }
}

export default angular.module('notely')
.service('NotesBackend', ['CurrentUser', '$http', '$cookies', NotesBackend]) // minification-safe syntax for dependency injection
