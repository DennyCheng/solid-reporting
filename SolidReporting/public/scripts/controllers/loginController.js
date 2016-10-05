myApp.controller('LoginController', ['$scope', '$http', 'DataFactory', '$location', 'toaster', function($scope, $http, DataFactory, $location, toaster) {
console.log('logincontroller');
    $scope.isDisabled = false

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
                    toaster.error("please try again!");
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
                    $scope.isDisabled = true;
                    toaster.pop('wait', "Please wait for your email");
                    $scope.message = "An e-mail has been sent to " + username + " with further instructions.";
                } else {
                    toaster.error("No account with that email address exists.");
                }
            });
        // } else {
        //     alert('Please enter your email');
        // }

    }

    $scope.resetPassword = function() {
        var token = $location.$$url.replace('/reset/','');
        var password = $scope.user.new_password
        var passwordconfirm = $scope.user.confirm_password;
        var user = {token: token, password: password};

        if (passwordconfirm === password) {
            $scope.dataFactory.resetPassword(user).then(function(response) {
                if(response === 200) {
                    toaster.success('Password was reset and user should receive confirmation email!');
                    $scope.isDisabled = true;
                    setTimeout(function(){
                        $location.path('/login');
                    }, 2000);
                } else if (response == 204) {
                    toaster.error('Password reset is invalid or has expired!');
                }
            });

        } else if(passwordconfirm !== password) {
            toaster.error('password do not match');
        }
    };


    // angular
    //     .module('MyApp')
    //     .controller('DemoCtrl', function( $scope ) {
    //         $scope.user = {
    //             name : "Naomi Black",
    //             password: ""
    //         }
    //     });
}]);
