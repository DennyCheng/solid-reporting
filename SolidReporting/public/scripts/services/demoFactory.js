myApp.factory('DemoFactory', ['$http', '$location', function($http, $location) {
  console.log("demoFactory is working");


  var getData = function() {
    var promise = $http.get('/fileUpload').then(function (response) {
      return response.data;
    });

    return promise;
  }

  var demoData = function(dates) {
    console.log("dates in DF: ", dates);
    var promise = $http.post('/demoquery', {dates: dates}).then(function (response) {
      return response.data;
    });
    return promise;
  }

  return {  //start of return scope
    retrieveData: function () {
      return getData();
    },
    getDemo: function (dates) {
      return demoData(dates);
    }
  };  //end of return scope

}]);
