var myApp = angular.module('myApp',['ngMaterial','ngRoute', 'lfNgMdFileInput','ngAnimate','toaster', 'md.data.table']);

myApp.config(['$routeProvider', function($routeProvider){

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
    .when('/landing', {
      templateUrl: '/public/views/partials/landing.html',
      controller: "landingController"
    })  
    .when('/home', {
      templateUrl:'/public/views/partials/demographics.html',
      controller:'DemoController'
    })
    .when('/demographics', {
      templateUrl: '/public/views/partials/demographics.html',
      controller: "DemoController"
    })
    .when('/outcomes', {
      templateUrl: '/public/views/partials/outcomes.html',
      controller: "OutcomesController"
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

myApp.directive('toggleClass', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        element.toggleClass(attrs.toggleClass);
      });
    }
  };
});
