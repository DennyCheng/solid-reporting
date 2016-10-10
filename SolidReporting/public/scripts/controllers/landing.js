myApp.controller('landingController', ['$scope', '$location', function($scope, $location) {
        $scope.imagePath = 'img/washedout.png';

    $scope.demo = function() {
        $location.path('/demographics');
        console.log('this have been click!');
    };

    $scope.upload = function () {
        $location.path('/upload');
        console.log('uploading dfdsfdsf');
    }


    }])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    });