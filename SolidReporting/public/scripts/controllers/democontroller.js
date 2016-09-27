myApp.controller("DemoController", ["$scope",'$http','DataFactory', function ($scope, $http, DataFactory) {
  console.log("hello from demoController");

  $scope.dataFactory = DataFactory;

  $scope.test = $scope.dataFactory.testVar();
  console.log($scope.test);

  $scope.searchTerm;
  $scope.clearSearchTerm = function() {
    $scope.searchTerm = '';
  };

  var races = ['African', 'African American', 'American Indian' ,'Asian/SE Asian/Pacific Islander', 'Caucasian/White', 'Hispanic/Latino', 'Multiracial', 'Other'];
  $scope.adultRaces = races;
  $scope.childRaces = races;
  $scope.genders = ['Female', 'Male'];
  $scope.childAges = ['0-18 mths', '19-35 mths', '36-59 mths', '60-71 mths (5 y.o.)', '6-9 yrs', '10-14 yrs', '15-17 yrs', '18+ child in home'];
  $scope.adultAges = ['18-22', '23-30', '31-40', '41-54', '55-64', '65+'];

  $scope.residences = ['Ramsey', 'Suburban Ramsey Co.', 'Washington Co.', 'Hennepin', 'Suburban Hennepin Co.', 'Other Metro County', 'Outside Twin Cities Metro', 'Outside of State'];

  $scope.hhIncomes = ['At or below 100% Poverty', '101%-200% Poverty', 'At or above 200% Poverty'];

  $scope.exitingPersons = ['Graduated', 'Left voluntarily (not grad)', 'Terminated/Mutual termination', 'Other (i.e. death)'];

  // -----------------Used with ADM-dateTimePicker-------------------
  // $scope.date1Changed = function(date) {
  //   var date1 = $scope.date;
  //   console.log(date1);
  // };
  //
  // $scope.date2Changed = function(date) {
  //   var date2 = $scope.date;
  //   console.log(date2);
  // };
  // ------------------------------------------------------------------


  $scope.date1 = new Date();
  $scope.date2 = new Date();

  $scope.minDate = new Date(
      $scope.date1.getFullYear(),
      $scope.date1.getMonth() - 2,
      $scope.date1.getDate());

  $scope.maxDate = new Date(
      $scope.date1.getFullYear(),
      $scope.date1.getMonth() + 2,
      $scope.date1.getDate());


  // The md-select directive eats keydown events for some quick select
  // logic. Since we have a search input here, we don't need that logic.
  // $element.find('input').on('keydown', function(ev) {
  //   console.log("working");
  //     ev.stopPropagation();
  // });



// end controller
}]);
