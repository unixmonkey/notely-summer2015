import NotesBackend from '../../services/notes-backend';
import sidebar from '../notes/sidebar';
import loginForm from '../login/login-form';
import noteEditor from '../notes/note-editor';

angular.module('notely')
.directive('mainContainer', function(NotesBackend) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: `
      <div class="container">
        <div class="row">
          <div class="col-xs-4">
            <sidebar></sidebar>
          </div>
          <div class="col-xs-8">
            <main>
              <login-form></login-form>
              <note-editor></note-editor>
            </main>
          </div>
        </div>
      </div>`
  };
});
