myApp.controller('UserController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');

  $scope.dataFactory = DataFactory;

  $scope.dataFactory.currentSess();

  $scope.userName = $scope.dataFactory.varUsername();

  $scope.tologout = function(){
    console.log('logged out');
  $scope.dataFactory.logout()
  }

}]);
