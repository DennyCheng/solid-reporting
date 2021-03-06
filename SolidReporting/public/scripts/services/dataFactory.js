myApp.factory('DataFactory', ['$http', '$location', function($http, $location) {

  //Private API Scope
  var dataUsername = '';
  var userData = {};
  var responseStatus = undefined;
  var reset = undefined;

  login = function(user) {
      console.log('sending to server...', user);
    var promise =  $http.post('/', user).then(function(response) {
        if(response.data.username) {
          console.log('success: ', response.data);
          userData = response.data;
          dataUsername = response.data.username;
          return true;
        } else {
          console.log('failure: ', response);
          return false;
        }
      });
      console.log('returning promise');
    return promise;
    }

  registerUser = function(user) {
      console.log('sending to server...', user);
      var promise = $http.post('/register', user).then(function(response) {
        console.log('success');
        $location.path('/login');
      },
      function(response) {
        console.log('error');
        message = "Please try again."
      });
    return promise;
    }

  currentSess = function() {
    var promise = $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              console.log('User Data: ', dataUsername);
          } else {
              // user has no session, bounce them back to the login page
              $location.path("/login");
          }
      });
      return promise;
  }

  logout = function() {
    var promise = $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      return true;
    });

    console.log('returned promise');
    return promise;
  }

  var checkUserSendPasswordReset = function(username) {
    var promise = $http.post('/forgot', {username: username}).then(function(response) {
        responseStatus = response.status;
        return responseStatus;
    });
    return promise;
  }

  var resetUsersPassword = function(user) {
    var promise = $http.get('/forgot/reset/' + user.token).then(function(response) {
          if(response.status == 200) {
          console.log('user was found!');
          console.log('response.data in factory: ', response.data);
          var userID = response.data.userID;
          var username = response.data.username;
        return $http.post('/forgot/reset', {userId: userID, password: user.password, username: username}).then(function(response) {
              console.log("response: ", response);
              responseStatus = response.status;
              return responseStatus;
          });
      } else {
        responseStatus = response.status;
        return responseStatus;
      }
    });
    return promise;
  }

  function tokenValid() {
    console.log("$location.url in DF: ", $location.url);
  }


    // PUBLIC API scope
    return {//start of return scope
      retrieveData: function () {
        return getData();
      },
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
      },
      theMessage: function(){
        return message;
      },
      forgotPassword: function(username) {
        return checkUserSendPasswordReset(username);
      },
      resetPassword: function(user) {
        return resetUsersPassword(user);
      }

    };//end of public scope
}]);
