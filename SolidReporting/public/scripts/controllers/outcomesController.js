myApp.controller("OutcomesController", ["$scope",'$http', '$location', 'DataFactory', '$mdSidenav', 'OutcomeFactory', 'DemoFactory', function ($scope, $http, $location, DataFactory, $mdSidenav, OutcomeFactory, DemoFactory) {
  console.log("hello from OutcomesController");

  $scope.outcomeFactory = OutcomeFactory;
  $scope.demoFactory = DemoFactory;
  $scope.dataFactory = DataFactory;
  $scope.dataFactory.currentSess();
  $scope.userName = $scope.dataFactory.varUsername();

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

  var programs = [];

  //----- Programs & Outcomes Checkboxes --------------
  // $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

  $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];

  showData();
  function showData() {

      $scope.demoFactory.retrieveData().then(function(response) {
          $scope.data = response;
          // console.log('type of number?', typeof Number());
          $scope.data.forEach(function (item) {
              // indexOf checks from index 0 to end of index every loop

              //  console.log('sg data -----', $scope.data);

              if (programs.indexOf(item['Program']) === -1 &&
                  item['Program'] !== null &&
                  item['Program'] !== 2 &&
                  item['Program'] !== 9 &&
                  item['Program'] !== 51 &&
                  item['Program'] !== 114 &&
                  item['Program'] !== 73 &&
                  item['Program'] !== 15 &&
                  item['Program'] !== 17 &&
                  item['Program'] !== 16 &&
                  item['Program'] !== 77 &&
                  item['Program'] !== 78 &&
                  item['Program'] !== 58 &&
                  item['Program'] !== 52 &&
                  item['Program'] !== 10 &&
                  item['Program'] !== 142 &&
                  item['Program'] !== 59 &&
                  item['Program'] !== 53 &&
                  item['Program'] !== 141
              ) {
                  programs.push(item['Program']);
              }
          });
          $scope.items = angular.copy(programs);
      });
  }


//----- Programs ----------------------------

  $scope.selectedprogram = programs;

  $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
          console.log('array ----', $scope.items);
          list.splice(idx, 1);
      }
      else {
          list.push(item);
          console.log('array ----', $scope.items);
      }
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

          $scope.houseEMP={
            reside6:0,
            reside1year: 0,
            achieveStability:0,
            exited:0,
            entered:0,
            securePermenant:0,
            other:0,
            total:0
          };

          $scope.houseEMPII={
            reside6:0,
            reside1year: 0,
            achieveStability:0,
            exited:0,
            entered:0,
            securePermenant:0,
            other:0,
            total:0
          };

          $scope.houseHomeSafe={
            reside6:0,
            reside1year: 0,
            achieveStability:0,
            exited:0,
            entered:0,
            securePermenant:0,
            other:0,
            total:0
          };

          $scope.houseHomeAgain={
            reside6:0,
            reside1year: 0,
            achieveStability:0,
            exited:0,
            entered:0,
            securePermenant:0,
            other:0,
            total:0
          };

          $scope.houseHomeFront={
            reside6:0,
            reside1year: 0,
            achieveStability:0,
            exited:0,
            entered:0,
            securePermenant:0,
            other:0,
            total:0
          };

          var responseArray = response

          for (var i = 0; i < responseArray.length; i++) {
            // console.log(responseArray[i]["Achieve Housing Stability"])
            if(responseArray[i].Program == "EMP"){
              if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseEMP.reside6 += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                $scope.houseEMP.reside1year += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                $scope.houseEMP.achieveStability += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                $scope.houseEMP.exited += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseEMP.exited += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                $scope.houseEMP.securePermenant += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                $scope.houseEMP.entered += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
                $scope.houseEMP.entered += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
              else {
                $scope.houseEMP.other += parseInt(responseArray[i].count);
                $scope.houseEMP.total += parseInt(responseArray[i].count);
              }
            }

            if(responseArray[i].Program == "EMPII"){
              if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseEMPII.reside6 += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                $scope.houseEMPII.reside1year += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                $scope.houseEMPII.achieveStability += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                $scope.houseEMPII.exited += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                $scope.houseEMPII.exited += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                $scope.houseEMPII.securePermenant += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                $scope.houseEMPII.entered += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
                $scope.houseEMPII.entered += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
              else {
                // console.log(responseArray[i]["Achieve Housing Stability"]);
                $scope.houseEMPII.other += parseInt(responseArray[i].count);
                $scope.houseEMPII.total += parseInt(responseArray[i].count);
              }
            }

            if(responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe" ){
              if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseHomeSafe.reside6 += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                $scope.houseHomeSafe.reside1year += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                $scope.houseHomeSafe.achieveStability += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
                $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                $scope.houseHomeSafe.securePermenant += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                $scope.houseHomeSafe.entered += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
                $scope.houseHomeSafe.entered += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
              else {
                console.log(responseArray[i]["Achieve Housing Stability"]);
                $scope.houseHomeSafe.other += parseInt(responseArray[i].count);
                $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
              }
            }

            else if(responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again" ){
              if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseHomeAgain.reside6 += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                $scope.houseHomeAgain.reside1year += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                $scope.houseHomeAgain.achieveStability += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
                $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                $scope.houseHomeAgain.securePermenant += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing at least 6 months;Secured Permanent Housing upon exit"){
                $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
              else {
                $scope.houseHomeAgain.other += parseInt(responseArray[i].count);
                $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
              }
            }

            else if(responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front" ){
              if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseHomeFront.reside6 += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                $scope.houseHomeFront.reside1year += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                $scope.houseHomeFront.achieveStability += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
                $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                $scope.houseHomeFront.securePermenant += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing at least 6 months;Secured Permanent Housing upon exit"){
                $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else if(responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
              else {
                console.log('fuck',responseArray[i]["Achieve Housing Stability"]);
                $scope.houseHomeFront.other += parseInt(responseArray[i].count);
                $scope.houseHomeFront.total += parseInt(responseArray[i].count);
              }
            }

          }//end of for statement
          console.log('this is the TESTEMP',$scope.houseEMP);
          console.log('this is the TESTEMPII',$scope.houseEMPII);
          console.log('this is the HomeSafe',$scope.houseHomeSafe);
          console.log('this is the HomeAGain',$scope.houseHomeAgain);
          console.log('this is the HomeFront',$scope.houseHomeFront);
        });//end of houseStabil

        // $scope.outcomeFactory.adultEduAdv(selections).then(function(response) {
        //   console.log("response adultEduAdv: ", response);
        // });
        // $scope.outcomeFactory.adultLearningDis(selections).then(function(response) {
        //   console.log("response adultLearningDis: ", response);
        // });
        // $scope.outcomeFactory.childLearnDis(selections).then(function(response) {
        //   console.log("response childLearnDis: ", response);
        // });
        // $scope.outcomeFactory.hhCurrentEmp(selections).then(function(response) {
        //   console.log("response hhCurrentEmp: ", response);
        // });
        // $scope.outcomeFactory.hh2CurrentEmp(selections).then(function(response) {
        //   console.log("response hh2CurrentEmp: ", response);
        // });
        // $scope.outcomeFactory.econStabil(selections).then(function(response) {
        //   console.log("response econStabil: ", response);
        // });
        // $scope.outcomeFactory.adultDisabil(selections).then(function(response) {
        //   console.log("response adultDisabil: ", response);
        // });
        // $scope.outcomeFactory.adultMI(selections).then(function(response) {
        //   console.log("response adultMI: ", response);
        // });
        // $scope.outcomeFactory.childDis(selections).then(function(response) {
        //   console.log("response childDis: ", response);
        // });
        // $scope.outcomeFactory.childMI(selections).then(function(response) {
        //   console.log("response childMI: ", response);
        // });
        // $scope.outcomeFactory.parentEdu(selections).then(function(response) {
        //   console.log("response parentEdu: ", response);
        // });
        // $scope.outcomeFactory.parentEduThisYear(selections).then(function(response) {
        //   console.log("response parentEduThisYear: ", response);
        // });
        // $scope.outcomeFactory.parentEduYearBefore(selections).then(function(response) {
        //   console.log("response parentEduYearBefore: ", response);
        // });
        // $scope.outcomeFactory.budgetingEdu(selections).then(function(response) {
        //   console.log("response budgetingEdu: ", response);
        // });
        // $scope.outcomeFactory.budgetingEduSameYear(selections).then(function(response) {
        //   console.log("response budgetingEduSameYear: ", response);
        // });
        // $scope.outcomeFactory.budgetingEduYearBefore(selections).then(function(response) {
        //   console.log("response budgetingEduYearBefore: ", response);
        // });
        // $scope.outcomeFactory.violence(selections).then(function(response) {
        //   console.log("response violence: ", response);
        // });
        // $scope.outcomeFactory.tenantTraining(selections).then(function(response) {
        //   console.log("response tenantTraining: ", response);
        // });
        // $scope.outcomeFactory.tenantTrainingSameYear(selections).then(function(response) {
        //   console.log("response tenantTrainingSameYear: ", response);
        // });
        // $scope.outcomeFactory.tenantTrainingPriorYear(selections).then(function(response) {
        //   console.log("response tenantTrainingPriorYear: ", response);
        // });
        // $scope.outcomeFactory.dbt(selections).then(function(response) {
        //   console.log("response dbt: ", response);
        // });
        // $scope.outcomeFactory.DBTsameyear(selections).then(function(response) {
        //   console.log("response DBTsameyear: ", response);
        // });
        // $scope.outcomeFactory.DBTprioryear(selections).then(function(response) {
        //   console.log("response DBTprioryear: ", response);
        // });
        // $scope.outcomeFactory.healthImproved(selections).then(function(response) {
        //   console.log("response healthImproved: ", response);
        // });
        // $scope.outcomeFactory.socialSupport(selections).then(function(response) {
        //   console.log("response socialSupport: ", response);
        // });
        // $scope.outcomeFactory.selfGoals(selections).then(function(response) {
        //   console.log("response selfGoals: ", response);
        // });


  }//end of click

  $scope.resetQuery = function () {
    $scope.selectedprogram = [];
    $scope.selectedoutcome = [];
    $scope.startdate = new Date();
    $scope.enddate = new Date();
  }


// end controller
}]);
