var myApp = angular.module('myApp',['ngRoute']);


myApp.config(['$routeProvider',function($routeProvider){

  $routeProvider
  .when('/home',{
        templateUrl:'/public/views/partials/home.html',
        controller:'HomeController'
      })
  .when('/outcomes',{
        templateUrl:'/public/views/partials/outcomes.html',
        controller:'OutcomeController'
      })
  .otherwise({
        redirectTo:'index'
      });

}]);
