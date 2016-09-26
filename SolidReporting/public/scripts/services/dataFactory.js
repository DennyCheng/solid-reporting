myApp.factory('DataFactory', ['$http', '$location', function($http, $location) {

  //Private API Scope
  var randomArray = [1,2,3];

  var dataUsername = '';

  var message = '';



  login = function(user) {
    console.log('this is what login has', user);

    if(user.username == '' || user.password == '') {
      // $scope.message = "Enter your username and password!";
    } else {
      console.log('sending to server...', user);
    var promise =  $http.post('/', user).then(function(response) {
        if(response.data.username) {
          console.log('success: ', response.data);
          // location works with SPA (ng-route)
          console.log('redirecting to user page');
          $location.path('/user');
        } else {
          console.log('failure: ', response);
          // $scope.message = "Wrong!!";
        }
      });
    return promise;
    }
  }

  registerUser = function(user) {
    console.log('register user', user);
    if(user.username == '' || user.password == '') {
      message = "Choose a username and password!";
    } else {
      console.log('sending to server...', user);
      var promise = $http.post('/register', user).then(function(response) {
        console.log('success');
        $location.path('/home');
      },
      function(response) {
        console.log('error');
        message = "Please try again."
      });
    return promise;
    }
  }

currentSess = function() {
var promise = $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          dataUsername = response.data.username;
          console.log('User Data: ', dataUsername);
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });
  return promise;
}

  logout = function() {
    var promise = $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
    return promise;
  }



    // PUBLIC API scope
    return {//start of return scope

    testVar: function(){
      return randomArray;
    },
    login: function(user){
      return login(user);
    },
    registerUser: function(user){
      return registerUser(user);
    },
    logout: function(){
      return logout();
    },
    currentSess: function(){
      return currentSess();
    },
    varUsername: function(){
      return dataUsername;
    }


    };//end of public scope
}]);
