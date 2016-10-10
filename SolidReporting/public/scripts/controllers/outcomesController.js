myApp.controller("OutcomesController", ["$scope",'$http', '$location', 'DataFactory', '$mdSidenav', 'OutcomeFactory', function ($scope, $http, $location, DataFactory, $mdSidenav, OutcomeFactory) {
  console.log("hello from OutcomesController");

  $scope.outcomeFactory = OutcomeFactory;

  $scope.toggleSide = function() {
    $mdSidenav('left').toggle();
  };

  $scope.tologout = function() {
    $scope.dataFactory.logout().then(function(response) {
      console.log('logged out');
      console.log('i redirected you to the home page');
      $location.path("/login");
    });
  }


  //----- Programs & Outcomes Checkboxes --------------
  $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

  $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];

  //----- Logic for program checkboxes ----------------



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
          + "Gender: " + $scope.selectedgender + "\n"
          + "Adult Race: " + $scope.selectedadultRace + "\n"
          + "Adult Age: " + $scope.selectedadultAge + "\n"
          + "Children Race: " + $scope.selectedchildRace + "\n"
          + "Children Age: " + $scope.selectedchildAge + "\n"
          + "Last Residence: " + $scope.lastResidenceSelection + "\n")

        console.log("$scope.startdate newQuery: ", $scope.startdate);
        console.log("$scope.enddate newQuery: ", $scope.enddate);

        selections = {
          programSelected: $scope.selectedprogram,
          raceAdultSelection: $scope.selectedadultRace,
          raceChildrenSelection: $scope.selectedchildRace,
          genderSelection: $scope.selectedgender,
          ageAdultSelection: $scope.selectedadultAge,
          ageChildrenSelection: $scope.selectedchildAge,
          lastResidenceSelection: $scope.selectedresidence,
          startdate: $scope.startdate,
          enddate: $scope.enddate
        };


    console.log("Program: " + $scope.selectedprogram + "\n"
        + "Outcome: " + $scope.selectedoutcome);

        $scope.outcomeFactory.houseStabil(selections).then(function(response) {
          console.log("response houseStabil: ", response);
        });
        $scope.outcomeFactory.adultEduAdv(selections).then(function(response) {
          console.log("response adultEduAdv: ", response);
        });
        $scope.outcomeFactory.adultLearningDis(selections).then(function(response) {
          console.log("response adultLearningDis: ", response);
        });
        $scope.outcomeFactory.childLearnDis(selections).then(function(response) {
          console.log("response childLearnDis: ", response);
        });
        $scope.outcomeFactory.hhCurrentEmp(selections).then(function(response) {
          console.log("response hhCurrentEmp: ", response);
        });
        $scope.outcomeFactory.hh2CurrentEmp(selections).then(function(response) {
          console.log("response hh2CurrentEmp: ", response);
        });
        $scope.outcomeFactory.econStabil(selections).then(function(response) {
          console.log("response econStabil: ", response);
        });
        $scope.outcomeFactory.adultDisabil(selections).then(function(response) {
          console.log("response adultDisabil: ", response);
        });
        $scope.outcomeFactory.adultMI(selections).then(function(response) {
          console.log("response adultMI: ", response);
        });
        $scope.outcomeFactory.childDis(selections).then(function(response) {
          console.log("response childDis: ", response);
        });
        $scope.outcomeFactory.childMI(selections).then(function(response) {
          console.log("response childMI: ", response);
        });
        $scope.outcomeFactory.parentEdu(selections).then(function(response) {
          console.log("response parentEdu: ", response);
        });
        $scope.outcomeFactory.parentEduThisYear(selections).then(function(response) {
          console.log("response parentEduThisYear: ", response);
        });
        $scope.outcomeFactory.parentEduYearBefore(selections).then(function(response) {
          console.log("response parentEduYearBefore: ", response);
        });
        $scope.outcomeFactory.budgetingEdu(selections).then(function(response) {
          console.log("response budgetingEdu: ", response);
        });
        $scope.outcomeFactory.budgetingEduSameYear(selections).then(function(response) {
          console.log("response budgetingEduSameYear: ", response);
        });
        $scope.outcomeFactory.budgetingEduYearBefore(selections).then(function(response) {
          console.log("response budgetingEduYearBefore: ", response);
        });
        $scope.outcomeFactory.violence(selections).then(function(response) {
          console.log("response violence: ", response);
        });
        $scope.outcomeFactory.tenantTraining(selections).then(function(response) {
          console.log("response tenantTraining: ", response);
        });
        $scope.outcomeFactory.tenantTrainingSameYear(selections).then(function(response) {
          console.log("response tenantTrainingSameYear: ", response);
        });
        $scope.outcomeFactory.tenantTrainingPriorYear(selections).then(function(response) {
          console.log("response tenantTrainingPriorYear: ", response);
        });
        $scope.outcomeFactory.dbt(selections).then(function(response) {
          console.log("response dbt: ", response);
        });
        $scope.outcomeFactory.DBTsameyear(selections).then(function(response) {
          console.log("response DBTsameyear: ", response);
        });
        $scope.outcomeFactory.DBTprioryear(selections).then(function(response) {
          console.log("response DBTprioryear: ", response);
        });
        $scope.outcomeFactory.healthImproved(selections).then(function(response) {
          console.log("response healthImproved: ", response);
        });
        $scope.outcomeFactory.socialSupport(selections).then(function(response) {
          console.log("response socialSupport: ", response);
        });
        $scope.outcomeFactory.selfGoals(selections).then(function(response) {
          console.log("response selfGoals: ", response);
        });


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
