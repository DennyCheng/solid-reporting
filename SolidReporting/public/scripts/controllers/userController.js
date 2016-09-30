myApp.controller('UserController', ['$scope', '$http', 'DataFactory', '$location', function($scope, $http, DataFactory, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');

  $scope.dataFactory = DataFactory;

  $scope.dataFactory.currentSess();

  $scope.userName = $scope.dataFactory.varUsername();

  $scope.tologout = function() {
    $scope.dataFactory.logout().then(function(response) {
      console.log('logged out');
      console.log('i redirected you to the home page');
      $location.path("/login");
    });

  }

}]);
