myApp.controller("OutcomesController", ["$scope",'$http','DataFactory', '$location', '$mdSidenav', function ($scope, $http, DataFactory, $location, $mdSidenav) {
  console.log("hello from OutcomesController");

  $scope.dataFactory = DataFactory;

  $scope.test = $scope.dataFactory.testVar();
  console.log($scope.test);

  //----- Programs & Outcomes Checkboxes --------------
  $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

  $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];

  //----- Logic for program checkboxes ----------------

  $scope.selectedprogram = $scope.programs;
  $scope.selectedoutcome = $scope.outcomes;

  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.isIndeterminateProgram = function() {
    return ($scope.selectedprogram.length !== 0 &&
        $scope.selectedprogram.length !== $scope.programs.length);
  };

  $scope.isIndeterminateOutcome = function() {
    return ($scope.selectedoutcome.length !== 0 &&
        $scope.selectedoutcome.length !== $scope.outcomes.length);
  };
  $scope.isCheckedProgram = function() {
    return $scope.selectedprogram.length === $scope.programs.length;
  };
  $scope.isCheckedOutcome = function() {
    return $scope.selectedoutcome.length === $scope.outcomes.length;
  };

  $scope.toggleAllProgram = function() {
    if ($scope.selectedprogram.length === $scope.programs.length) {
      $scope.selectedprogram = [];
    } else if ($scope.selectedprogram.length === 0 || $scope.selectedprogram.length > 0) {
      $scope.selectedprogram = $scope.programs.slice(0);
    }
    console.log($scope.selectedprogram);
  };
  $scope.toggleAllOutcome = function() {
    if ($scope.selectedoutcome.length === $scope.outcomes.length) {
      $scope.selectedoutcome = [];
    } else if ($scope.selectedoutcome.length === 0 || $scope.selectedoutcome.length > 0) {
      $scope.selectedoutcome = $scope.outcomes.slice(0);
    }
    console.log($scope.selectedoutcome);
  };

 //------ Calendar -------------------------------------------------------

  var startDate;
  var endDate;

  $scope.startdate = new Date();
  $scope.enddate = new Date();

  $scope.maxDate = new Date(
      $scope.enddate.getFullYear(),
      $scope.enddate.getMonth(),
      $scope.enddate.getDate());

  $scope.startDate = function(date) {
    var startDate = date;
    console.log('startDate: ', startDate);
  };
  $scope.endDate = function(date) {
    var endDate = date;
    console.log('endDate: ', endDate);
  };
//--------------------------------------------

// var self = this;
// var users = [{name: "Moroni", age: 50} /*,*/];
// self.tableParams = new NgTableParams({}, { dataset: users});

  $scope.sql = {};

  $scope.newQuery = function () {

    console.log("Program: " + $scope.selectedprogram + "\n"
        + "Outcome: " + $scope.selectedoutcome);

    // $http.get('/demoquery').then(function(response) {
    // console.log('data', response.data);
    // $scope.data = response.data;
    // });
  }

  $scope.resetQuery = function () {
    $scope.selectedprogram = [];
    $scope.selectedoutcome = [];
    $scope.startdate = new Date();
    $scope.enddate = new Date();
  }


// end controller
}]);
