var myApp = angular.module('myApp',['ngMaterial','ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
  .when('/outcomes',{
        templateUrl:'/public/views/partials/outcomes.html',
        controller:'OutcomeController'
  .when('/login', {
      templateUrl: '/public/views/login.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/public/views/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/public/views/user.html',
      controller: "UserController"
    })
    .when('/forgot', {
      templateUrl: '/public/views/forgot.html',
      controller: "LoginController"
    })
    .when('/home', {
      templateUrl:'/public/views/partials/demographics.html',
      controller:'DemoController'
    })
    .when('/demographics', {
      templateUrl: '/public/views/partials/demographics.html',
      controller: "DemoController"
    })
    .when('/upload', {
        templateUrl: '/public/views/partials/upload.html',
        controller: "uploadController"
    })
    .when('/reset/:token', {
      templateUrl: '/public/views/reset.html',
      controller: "LoginController",
      resolve: {
        currentAuth: function (TokenFactory) {
           return TokenFactory();
        }
      }
    })
    .otherwise({
      redirectTo:'/login'
    });
}]);

myApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('light-green')
});
