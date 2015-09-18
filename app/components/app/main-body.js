import app from '../../app';
import mainHeader from './main-header';
import mainContainer from './main-container';

angular.module('notely')
.directive('mainBody', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: `
      <div class="container wrap">
        <main-header></main-header>
        <main-container></main-container>
      </div>`
  };
});
