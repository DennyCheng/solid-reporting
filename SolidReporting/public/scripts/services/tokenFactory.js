myApp.factory('TokenFactory', ['$http', '$location', function($http, $location) {
  console.log("$location.url in TokenFactory: ", $location.$$url);
  var token = $location.$$url.replace('/reset/','');
  console.log("token in TF: ", token);

  return function() {
    // return $location.$$url;
    $http.get('/forgot/reset/' + token).then(function(response) {
      console.log("response in TF: ", response);
      if(response.status == 200) {
        return true;
      } else if (response.status == 204) {
        $location.path('/login');;
      } else {
        $location.path('/login');;
      }
    });
  }
}]);
