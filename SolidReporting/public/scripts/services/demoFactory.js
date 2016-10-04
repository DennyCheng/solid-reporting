myApp.factory('DemoFactory', ['$http', '$location', function($http, $location) {
  console.log("demoFactory is working");


  var getData = function() {
    var promise = $http.get('/fileUpload').then(function (response) {
      return response.data;
    });

    return promise;
  }

  var dobAdults = function(dates) {
    var startDate = dates.startdate;
    var startDateYear = startDate.getFullYear();
    var startDateMonth = startDate.getMonth() + 1;
    var startDateDay = startDate.getDate();
    var startDateFull = startDateYear + '-' + startDateMonth + '-' + startDateDay;
    console.log("startDateFull: ", startDateFull);

    var endDate = dates.enddate;
    var endDateYear = endDate.getFullYear();
    var endDateMonth = endDate.getMonth() + 1;
    var endDateDay = endDate.getDate();
    var endDateFull = endDateYear + '-' + endDateMonth + '-' + endDateDay;

    var correctDates = {
      startDate: startDateFull,
      endDate: endDateFull
    }

    var promise = $http.post('/demoquery/dobadults', correctDates).then(function (response) {
      var dobAdults = response.data;
      console.log("dobAdults: ", dobAdults);
      return dobAdults;
    });
    return promise;
  }

  var totalPeople = function(dates) {
    var startDate = dates.startdate;
    var startDateYear = startDate.getFullYear();
    var startDateMonth = startDate.getMonth() + 1;
    var startDateDay = startDate.getDate();
    var startDateFull = startDateYear + '-' + startDateMonth + '-' + startDateDay;
    console.log("startDateFull: ", startDateFull);

    var endDate = dates.enddate;
    var endDateYear = endDate.getFullYear();
    var endDateMonth = endDate.getMonth() + 1;
    var endDateDay = endDate.getDate();
    var endDateFull = endDateYear + '-' + endDateMonth + '-' + endDateDay;

    var correctDates = {
      startDate: startDateFull,
      endDate: endDateFull
    }

    var promise = $http.post('/demoquery/totalpeople', correctDates).then(function (response) {
      var totalPeople = response.data;
      console.log("totalPeople: ", totalPeople);
      return totalPeople;
    });
    return promise;
  }

  return {  //start of return scope
    retrieveData: function () {
      return getData();
    },
    dobAdults: function (dates) {
      return dobAdults(dates);
    },
    totalPeople: function (dates) {
      return totalPeople(dates);
    }
  };  //end of return scope

}]);
