var myApp = angular.module('myApp',['ngRoute']);


myApp.config(['$routeProvider',function($routeProvider){

  $routeProvider
  .when('/index',{
        templateUrl:'/public/views/index.html',
        controller:'homeController'
      })
  .when('/login', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })
  .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
  .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController"
    })
  .otherwise({
        redirectTo:'index'
      });

}]);
