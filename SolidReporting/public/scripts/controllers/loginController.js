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

    $scope.forgotPassword = function () {
        var username = $scope.user.username;
        // if(username){
            $scope.dataFactory.forgotPassword(username).then(function(response) {
                if(response == 200) {
                    $scope.message = "An e-mail has been sent to " + username + " with further instructions.";
                } else {
                    $scope.message = "No account with that email address exists.";
                }
            });
        // } else {
        //     alert('Please enter your email');
        // }

    }

    $scope.resetPassword = function() {
        var token = $location.$$url.replace('/reset/','');
        var password = $scope.user.confirm_password;
        var user = {token: token, password: password};
        $scope.dataFactory.resetPassword(user).then(function(response) {
            console.log("response in resetPassword: ", response);
            if (response == 200) {
                $scope.message = 'Password was reset and user should receive confirmation email!';
            } else if(response == 204) {
                $scope.message = 'Password reset is invalid or has expired!';
            } else {
                $scope.message = 'There was an error with reseting your password, please try again.'
            }
        });
    }


    // angular
    //     .module('MyApp')
    //     .controller('DemoCtrl', function( $scope ) {
    //         $scope.user = {
    //             name : "Naomi Black",
    //             password: ""
    //         }
    //     });
}]);
