var myApp = angular.module('myApp',['ngRoute']);


myApp.config(['$routeProvider',function($routeProvider){

  $routeProvider
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
    .when('/reset/:token', {
      templateUrl: '/public/views/reset.html',
      controller: "LoginController"
      })
    .otherwise({
        redirectTo:'/login'
      })
}]);
