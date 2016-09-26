var myApp = angular.module('myApp',['ngRoute']);


myApp.config(['$routeProvider',function($routeProvider){

  $routeProvider
  // .when('/index',{
  //       templateUrl:'/public/views/index.html',
  //       controller:'homeController'
  //     })
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
  .otherwise({
        redirectTo:'login'
      })

}]);
