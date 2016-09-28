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
          $location.path('/user');
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

    $scope.forgotPassword = function() {
        var username = $scope.user.username;
        $http.post('/forgot', {username: username}).then(function(response) {
            console.log('set token and password reset time to specific user!');
            // $http.get('/forgot/' + username).then(function(response) {
            //     console.log("email should have sent, maybe?");
            // });
            console.log("response: ", response.status);
            if(response.status == 200) {
                $scope.message = "An e-mail has been sent to " + username + " with further instructions.";
            } else {
                $scope.message = "No account with that email address exists.";
            }
        });
    }


    $scope.resetPassword = function() {
        console.log("$location.$$url: ", $location.$$url);
        var token = $location.$$url.replace('/reset/','');
        console.log('token from url: ', token);
        var password = $scope.user.confirm_password;
        $http.get('/forgot/reset/' + token).then(function(response) {
            console.log('user was found!');
            console.log("response.data in factory: ", response.data);
            var userID = response.data.userID;
            var username = response.data.username;
            $http.post('/forgot/reset', {userId: userID, password: password, username: username}).then(function(response) {
                console.log('password was reset and user should receive confirmation email!');
            });
        });
    }

}]);
