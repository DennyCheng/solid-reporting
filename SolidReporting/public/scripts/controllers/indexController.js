myApp.controller("IndexController", ['$scope','$http','DataFactory','$location',function($scope,$http,DataFactory,$location) {
  console.log("hello from OutcomeController");

  $scope.dataFactory = DataFactory;

  $scope.test = $scope.dataFactory.testVar();
  console.log($scope.test);


}]);
