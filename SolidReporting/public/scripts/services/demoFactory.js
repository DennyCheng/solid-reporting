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

    var startDate = dates.startdate;
    console.log("startDate : ", typeof startDate);
    var startDateYear = startDate.getFullYear();
    console.log("startDateYear: ", startDateYear);
    var startDateMonth = startDate.getMonth();
    var startDateDay = startDate.getDate();

    var startDateFull = startDateYear + '-' + startDateMonth + '-' + startDateDay;
    console.log("startDateFull: ", startDateFull);

    var endDate = dates.enddate;
    console.log("endDate : ", typeof endDate);
    var endDateYear = endDate.getFullYear();
    console.log("endDateYear: ", endDateYear);
    var endDateMonth = endDate.getMonth();
    var endDateDay = endDate.getDate();

    var endDateFull = endDateYear + '-' + endDateMonth + '-' + endDateDay;
    console.log("endDateFull: ", endDateFull);

    var correctDates = {
      startDate: startDateFull,
      endDate: endDateFull
    }


    var promise = $http.post('/demoquery', correctDates).then(function (response) {
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
