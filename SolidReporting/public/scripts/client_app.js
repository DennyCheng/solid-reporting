var myApp = angular.module('myApp',['ngMaterial','ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
  .when('/home', {
        templateUrl:'/public/views/partials/demographics.html',
        controller:'DemoController'
      })
  .when('/demographics', {
        templateUrl: '/public/views/partials/demographics.html',
        controller: "DemoController"
      })
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
      });


}]);

myApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('light-green')
});
