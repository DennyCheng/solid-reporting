var myApp = angular.module('myApp',['ngMaterial','ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
      .when('/demographics', {
            templateUrl: '/public/views/partials/demographics.html',
            controller: "DemoController"
          })
      .when('/outcomes', {
            templateUrl: '/public/views/partials/outcomes.html',
            controller: "OutcomesController"
          })
      .when('/login', {
          templateUrl: '/public/views/login.html',
          controller: "LoginController"
        })
      .when('/register', {
          templateUrl: '/public/views/register.html',
          controller: "LoginController"
        })
      .when('/upload', {
          templateUrl: '/public/views/partials/upload.html',
          controller: "uploadController"
      })
      .otherwise({
        redirectTo:'login'
      });


}]);

myApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('light-green')
});
