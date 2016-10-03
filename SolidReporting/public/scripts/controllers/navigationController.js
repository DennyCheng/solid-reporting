myApp.controller('navigationController', ['$scope', '$location','DataFactory', function($scope, $location, DataFactory) {
    $scope.dataFactory = DataFactory;

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.tologout = function() {
        $scope.dataFactory.logout().then(function(response) {
            console.log('logged out');
            console.log('i redirected you to the home page');
            $location.path("/login");
        });
    };
}]);
