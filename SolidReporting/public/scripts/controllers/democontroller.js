myApp.controller("DemoController", ["$scope",'$http','DataFactory', '$location', 'NgTableParams', function ($scope, $http, DataFactory, $location, NgTableParams) {
  console.log("hello from demoController");

  $scope.dataFactory = DataFactory;

  $scope.test = $scope.dataFactory.testVar();
  console.log($scope.test);

  //----- Programs ----------------------------

  $scope.programs = ['EMP I', "EMP II", 'Home Again', 'HomeSafe', 'HomeFront'];

  //----- Logic for program checkboxes ----------------
  $scope.selectedProgram = [1];
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

  $scope.isIndeterminate = function() {
    return ($scope.selectedProgram.length !== 0 &&
        $scope.selectedProgram.length !== $scope.programs.length);
  };

  $scope.isChecked = function() {
    return $scope.selectedProgram.length === $scope.programs.length;
  };

  $scope.toggleAll = function() {
    if ($scope.selectedProgram.length === $scope.programs.length) {
      $scope.selectedProgram = [];
    } else if ($scope.selectedProgram.length === 0 || $scope.selectedProgram.length > 0) {
      $scope.selectedProgram = $scope.programs.slice(0);
    }
  };


  //----- Dropdowns --------------------------------
  $scope.genders = ['Female', 'Male'];

  var races = ['African', 'African American', 'American Indian' ,'Asian/SE Asian/Pacific Islander', 'Caucasian/White', 'Hispanic/Latino', 'Multiracial', 'Other'];
  $scope.adultRaces = races;
  $scope.childRaces = races;

  $scope.childAges = ['0-18 mths', '19-35 mths', '36-59 mths', '60-71 mths (5 y.o.)', '6-9 yrs', '10-14 yrs', '15-17 yrs', '18+ child in home'];

  $scope.adultAges = ['18-22', '23-30', '31-40', '41-54', '55-64', '65+'];

  $scope.residences = ['Ramsey', 'Suburban Ramsey Co.', 'Washington Co.', 'Hennepin', 'Suburban Hennepin Co.', 'Other Metro County', 'Outside Twin Cities Metro', 'Outside of State'];

  $scope.hhIncomes = ['At or below 100% Poverty', '101%-200% Poverty', 'At or above 200% Poverty'];

  $scope.exitingPersons = ['Graduated', 'Left voluntarily (not grad)', 'Terminated/Mutual termination', 'Other (i.e. death)'];


  //----- Dropdown Search field (doesn't work right) ------------------------
  $scope.searchTerm;
  $scope.clearSearchTerm = function() {
    $scope.searchTerm = '';
  };


 //------ Calendar -------------------------------------------------------

  var startDate;
  var endDate;

  $scope.date1 = new Date();
  $scope.date2 = new Date();

  $scope.maxDate = new Date(
      $scope.date2.getFullYear(),
      $scope.date2.getMonth(),
      $scope.date2.getDate());

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

  $scope.newQuery = function () {
    $http.get('/demoquery').then(function(response) {
    console.log('data', response.data);
    $scope.data = response.data;
    });
  }




// end controller
}]);
