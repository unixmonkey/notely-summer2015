import Constants from '../constants'

class CurrentUser {
  constructor($http, $cookies) {
    this.$http = $http
    this.$cookies = $cookies
    this.currentUser = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {}
  }

  get() {
    return this.currentUser
  }

  set(userData) {
    this.unset()
    this.currentUser = userData
    this.$cookies.put('user', JSON.stringify(userData))
    return this.get()
  }

  unset() {
    this.$cookies.remove('user')
    this.currentUser = {}
  }

  fetch(userFormData, callback) {
    this.$http.post(`${Constants.API_BASE_PATH}session`, {
      user: {
        username: userFormData.username,
        password: userFormData.password
      }
    }).success((userData) => {
      this.set(userData)
    }).error(function(userData) {
      this.userData = userData || { error: 'Oops! Something went wrong when logging in.' }
      typeof callback === 'function' && callback(userData)
    })
  }
}

export default angular.module('notely')
.service('CurrentUser', CurrentUser)
