myApp.controller("DemoController", ["$scope",'$http','DataFactory', '$location','$filter', function ($scope, $http, DataFactory, $location, $filter) {
  console.log("hello from demoController");
  var races = [];
  var residences = [];
  function submitQuery() {
    // get call to the server passing the data
    $http.get('/uploadfile/data').then(function(response){
      console.log('response', response.data);
      $scope.selectedgender;
      console.log($scope.selectedgender[0]);
      $scope.selectedadultRace;
      console.log($scope.selectedadultRace);
      $scope.selectedchildAge;
      console.log($scope.selectedchildAge);
      $scope.selectedresidence;
      console.log($scope.selectedresidence);
      $scope.selectedhhIncome;
      console.log($scope.selectedhhIncome);
      $scope.selectedexitingPerson;
      console.log($scope.selectedexitingPerson);
      $scope.date1;
      console.log('selectedDate', $scope.date1);
      $scope.date2;
      console.log('selectedDate', $scope.date2);
    })

  }
  $scope.dataFactory = DataFactory;

  $scope.dataFactory.currentSess();

  $scope.userName = $scope.dataFactory.varUsername();

  $scope.tologout = function() {
    $scope.dataFactory.logout().then(function(response) {
      console.log('logged out');
      console.log('i redirected you to the home page');
      $location.path("/login");
    });

  }

  $scope.test = $scope.dataFactory.testVar();
  console.log($scope.test);

  //----GET Massive Data ----------------------------------------------
  showData();
  function showData() {

    $scope.dataFactory.retrieveData().then(function(response) {
      $scope.data = response;
      console.log('data -----', $scope.data);
      console.log('data ----dfd-', $scope.data[1]["HoH Mthly  Earned Income"]);
      $scope.data.forEach(function (item) {
        // indexOf checks from index 0 to end of index every loop
        if (races.indexOf(item['Race Code']) === -1 &&
            item['Race Code'] !== null && item['Race Code'] !== 'Other(specify)Irainan' &&
            item['Race Code'] !== 'Other(specify)________________________' &&
            item['Race Code'] !== 'Other(specify' &&
            item['Race Code'] !== 'Asian/SE Asian/Pacific Islander') {
          races.push(item['Race Code']);
        }
        if (residences.indexOf(item['County of Last Residence']) === -1 &&
            item['County of Last Residence'] !== null &&
            item['County of Last Residence'] !== undefined) {
          residences.push(item['County of Last Residence']);
        }
      });

    });

  }

  //----- Dropdowns -------------------------------------------------

  $scope.adultRaces = races;
  $scope.childRaces = races;
  $scope.genders = ['Female', 'Male'];
  $scope.childAges = ['0-18 mths', '19-35 mths', '36-59 mths', '60-71 mths (5 y.o.)', '6-9 yrs', '10-14 yrs', '15-17 yrs', '18+ child in home'];
  $scope.adultAges = ['18-22', '23-30', '31-40', '41-54', '55-64', '65+'];

  $scope.residences = residences;

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

  $scope.submitQuery = submitQuery;
//--------------------------------------------


// end controller
}]);
