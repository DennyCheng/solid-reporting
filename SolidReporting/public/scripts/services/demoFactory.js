myApp.factory('DemoFactory', ['$http', '$location', function($http, $location) {
  console.log("demoFactory is working");


  var getData = function() {
    var promise = $http.get('/fileUpload').then(function (response) {
      return response.data;
    });

    return promise;
  }

  var dobAdults = function(dates) {
    // var startDate = dates.startdate;
    // var startDateYear = startDate.getFullYear();
    // var startDateMonth = startDate.getMonth() + 1;
    // var startDateDay = startDate.getDate();
    // var startDateFull = startDateYear + '-' + startDateMonth + '-' + startDateDay;
    // console.log("startDateFull: ", startDateFull);

    // var endDate = dates.enddate;
    // var endDateYear = endDate.getFullYear();
    // var endDateMonth = endDate.getMonth() + 1;
    // var endDateDay = endDate.getDate();
    // var endDateFull = endDateYear + '-' + endDateMonth + '-' + endDateDay;

    // var correctDates = {
    //   startDate: startDateFull,
    //   endDate: endDateFull
    // }
    var correctDates = {
      startDate: dates.startdate,
      endDate: dates.enddate
    }

    var promise = $http.post('/demoquery/dobadults', correctDates).then(function (response) {
      var dobAdults = response.data;
      console.log("dobAdults: ", dobAdults);
      return dobAdults;
    });
    return promise;
  }

  var totalPeople = function(dates) {
    var correctDates = {
      startDate: dates.startdate,
      endDate: dates.enddate
    }

    var promise = $http.post('/demoquery/totalpeople', correctDates).then(function (response) {
      var totalPeople = response.data;
      console.log("totalPeople: ", totalPeople);
      return totalPeople;
    });
    return promise;
  }

  var allGender = function(dates) {
    var correctDates = {
      startDate: dates.startdate,
      endDate: dates.enddate
    }

    var promise = $http.post('/demoquery/allgender', correctDates).then(function (response) {
      var allGender = response.data;
      console.log("allGender: ", allGender);
      return allGender;
    });
    return promise;
  }

  var raceAdults = function(dates) {
    var correctDates = {
      startDate: dates.startdate,
      endDate: dates.enddate
    }

    var promise = $http.post('/demoquery/raceadults', correctDates).then(function (response) {
      var raceAdults = response.data;
      console.log("raceAdults: ", raceAdults);
      return raceAdults;
    });
    return promise;
  }

  var raceChildren = function(dates) {
    var correctDates = {
      startDate: dates.startdate,
      endDate: dates.enddate
    }

    var promise = $http.post('/demoquery/racechildren', correctDates).then(function (response) {
      var raceChildren = response.data;
      console.log("raceChildren: ", raceChildren);
      return raceChildren;
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
    },
    allGender: function (dates) {
      return allGender(dates);
    },
    raceAdults: function (dates) {
      return raceAdults(dates);
    },
    raceChildren: function (dates) {
      return raceChildren(dates);
    }
  };  //end of return scope

}]);
