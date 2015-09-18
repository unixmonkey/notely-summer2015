angular.module('notely')
.service('CurrentNote', class CurrentNote {
  constructor() {
    this.currentNote = {}
  }

  get() {
    return this.currentNote
  }

  set(note) {
    this.currentNote = JSON.parse(JSON.stringify(note))
    return this.currentNote
  }
})
