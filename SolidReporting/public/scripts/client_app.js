var myApp = angular.module('myApp',['ngMaterial','ngRoute', 'ADM-dateTimePicker']);

// Unused dependencies (for dropdown menus)
// 'isteven-multi-select', 'angularjs-dropdown-multiselect'

myApp.config(['$routeProvider','ADMdtpProvider', function($routeProvider, ADMdtp){

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

  ADMdtp.setOptions({
    calType: 'gregorian',
    format: 'MM/DD/YYYY',
    default: 'today',
    multiple: false,
    autoClose: true
});


}]);
