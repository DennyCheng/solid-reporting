myApp.controller('LoginController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
console.log('logincontroller');

    $scope.dataFactory = DataFactory;
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.message = '';

    $scope.userLogin = function() {
      var userWhole = $scope.user;
      console.log('preinfo', userWhole);
    $scope.dataFactory.login(userWhole);
    }

    $scope.userRegister = function() {
      var userWhole = $scope.user;
      console.log('preinfo', userWhole);
    $scope.dataFactory.registerUser(userWhole);
    }

}]);
