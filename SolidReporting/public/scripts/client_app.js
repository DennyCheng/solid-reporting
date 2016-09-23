var myApp = angular.module('myApp',['ngRoute']);


myApp.config(['$routeProvider',function($routeProvider){

  $routeProvider
  .when('/index',{
        templateUrl:'/public/views/index.html',
        controller:'homeController'
      })
  .otherwise({
        redirectTo:'index'
      });

}]);
