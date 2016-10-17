myApp.controller('landingController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {
    $scope.imagePath = 'img/washedout.png';

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

    $scope.demo = function() {
        $location.path('/demographics');
        console.log('this have been click!');
    };

    $scope.upload = function () {
        $location.path('/upload');
        console.log('uploading page');
    };

    $scope.outcome = function () {
        $location.path('/outcomes');
        console.log('outcome page');
    }

}])

.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
