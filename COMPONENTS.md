## Component Directives

The recommended strategy to prepare your Angular 1.x app to be easier to port to Angular 2.0, is to break up your app into individual component directives and do away with controllers and `$scope` altogether.

For those that have used [React](), this is a similar way to structure your application. Instead of using the controller as a *junk drawer* of functions that deal with multiple pieces of the application (even if they are related), you build a top-level component directive (sometimes called a *template* directive) that has a snippet of Angular-ified html, including other sub-components.

Let's say we wanted to pull the `<div class="user-links">` out into a component.
We'll want to make a new file for this and include it in our HTML or build system, but if you want to hack around in the already-loading controller file, that's fine too.

First, create an empty directive by chaining off of your module:
```js
angular.module('notely.notes')
.directive('userLinks', function() { // camelized directive name tells Angular to look for a hyphenized version <user-links> in html
  return {
    restrict: 'E', // only allow element syntax: <user-links></user-links>
    replace: true, // replace <user-links></user-links> element, instead of nesting inside it
    template: '<div></div>'
  };
});
```

Then cut and paste the Angular-ified HTML into the template. You could also use `templateURL` and point it at an html file, but I'm showing it inline here, which means I'm adding backslashes for multiline strings.
```js
angular.module('notely.notes')
.directive('userLinks', function() { // camelized directive name tells Angular to look for a hyphenized version <user-links> in html
  return {
    restrict: 'E', // only allow element syntax: <user-links></user-links>
    replace: true, // replace <user-links></user-links> element, instead of nesting inside it
    template: '<div class="user-links">\
      <div ng-show="user().id">\
        Signed in as {{ user().name }}\
        |\
        <a ng-click="logout()">Logout</a>\
      </div>\
      <div ng-hide="user().id">\
        <a ng-click="goToSignIn()">Sign in</a>\
      </div>\
    </div>'
  };
});
```

And replace the HTML we just pasted in here with the component element `<user-links></user-links>`

If you refresh the page, everything should still be working as it was before.

That's because components by default inherit `$scope` from their parent element, and the `<user-links>` element is nested under `<header ng-controller="NotesController">`, so it has access to everything in NotesController.

We could use this technique by itself to modularize our code, but to prepare for Angular 2.0, we should make this component work without a controller, and manage it's own state and scope. We do this by assigning a scope property to the returned object like this:
```js
restrict: 'E', // only allow element syntax: <user-links></user-links>
replace: true, // replace <user-links></user-links> element, instead of nesting inside it
scope: { }, // use our own (isolate) scope (instead of inheriting the controller's scope)
```

This is often referred to as an "Isolate" scope component by Angular developers [CITATION NEEDED]

Now, if you refresh the page, it's totally broken (well, it's not showing you as logged in anymore if you were, and the "Sign in" link no longer works). Let's get it working again.

The functions named in the html: `user`, `logout`, and `goToSignIn` were on our controller, but we need them here now.

Directive components can have thier own mini-controller defined inside them, and we'll be using that to bring over the parts we need (side-note: in Angular2, we will still have this "controller" like function, but it is not generally called a controller. This is more of a hack to get an Angular1 directive to work a lot like Angular2 will).
Let's start with `user`. If you go to the controller, you'll see `$scope.user` was simply returning the user from the `NotesBackend` service. We can delcare that dependency here:
```js
.directive('userLinks', function(NotesBackend) {
```

and add the `controllerAs` and `controller` properties, and make `controller` a function that we define what used to be our `$scope` methods on. The `controllerAs` syntax means we have to chain our methods that were previously on `$scope` to `this`, but without `$scope`, we have to call the functions off of something, so we'll use the dot syntax in our template HTML.
```js
angular.module('notely.notes')
.directive('userLinks', function(NotesBackend) { // camelized directive name tells Angular to look for a hyphenized version <user-links> in html
  return {
    restrict: 'E', // only allow element syntax: <user-links></user-links>
    replace: true, // replace <user-links></user-links> element, instead of nesting inside it
    scope: { }, // use our own (isolate) scope (instead of inheriting the controller's scope)
    controllerAs: 'ctrl',
    controller: userLinksController,
    template: '<div class="user-links">\
      <div ng-show="ctrl.user().id">\
        Signed in as {{ ctrl.user().name }}\
        |\
        <a ng-click="logout()">Logout</a>\
      </div>\
      <div ng-hide="ctrl.user().id">\
        <a ng-click="goToSignIn()">Sign in</a>\
      </div>\
    </div>'
  };

  function userLinksController() {
    this.user = function() {
      return NotesBackend.getUser();
    }
  }
});
```

I separated `userLinksController` instead of declaring an inline anonymous function since this more closely matches how Angular 2 components look, but it would work either way.

Now that we've got our mini-controller working, let's port over `logout` and `goToSignIn` by moving those functions here, injecting our dependency on `$location`, and adding `ctrl.` before our functions in the HTML template:
```js
angular.module('notely.notes')
.directive('userLinks', function(NotesBackend, $location) { // camelized directive name tells Angular to look for a hyphenized version <user-links> in html
  return {
    restrict: 'E', // only allow element syntax: <user-links></user-links>
    replace: true, // replace <user-links></user-links> element, instead of nesting inside it
    scope: { }, // use our own (isolate) scope (instead of inheriting the controller's scope)
    controllerAs: 'ctrl',
    controller: userLinksController,
    template: '<div class="user-links">\
      <div ng-show="ctrl.user().id">\
        Signed in as {{ ctrl.user().name }}\
        |\
        <a ng-click="ctrl.logout()">Logout</a>\
      </div>\
      <div ng-hide="ctrl.user().id">\
        <a ng-click="ctrl.goToSignIn()">Sign in</a>\
      </div>\
    </div>'
  };

  function userLinksController() {
    this.user = function() {
      return NotesBackend.getUser();
    }

    this.goToSignIn = function() {
      $location.path('login');
    }

    this.logout = function() {
      NotesBackend.deleteCookie();
      $location.path('login');
    }
  }
});
```

Now everything should be working as it was before, and you can remove the `$scope.goToSignIn` and `$scope.logout` functions from `NotesController` since they aren't being used anywhere else.

Finally, we can now remove the `ng-controller` attribute directive from `index.html`, since it is no longer necessary.

Change:
```html
<header ng-controller="NotesController">
```
to:
```html
<header>
```
