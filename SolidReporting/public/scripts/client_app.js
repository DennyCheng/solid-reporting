var myApp = angular.module('myApp',['ngMaterial','ngRoute']);

// Unused dependencies (for dropdown menus)
// 'isteven-multi-select', 'angularjs-dropdown-multiselect'

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
  .otherwise({
        redirectTo:'home'
      });


}]);
