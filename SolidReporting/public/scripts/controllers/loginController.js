myApp.controller('LoginController', ['$scope', '$http', 'DataFactory', '$location', function($scope, $http, DataFactory, $location) {
console.log('logincontroller');

    $scope.dataFactory = DataFactory;
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.userLogin = function() {
      var userWhole = $scope.user;
      console.log('preinfo', userWhole);
      $scope.dataFactory.login(userWhole).then(function(response) {
        console.log('login complete', response);
        if(response) {
          // location works with SPA (ng-route)
          console.log('redirecting to user page');
          $location.path('/demographics');
        } else {
          alert("please try again!");
        }

      });
    }

    $scope.userRegister = function() {
      var userWhole = $scope.user;
      console.log('preinfo', userWhole);
    $scope.dataFactory.registerUser(userWhole);
    }

}]);
