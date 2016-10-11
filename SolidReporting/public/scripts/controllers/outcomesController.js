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
          $scope.adultMI_EMP = {
               yesAndBeingTreated:0,
               yesAndNotBeingTreated:0,
               yesAndReferredForAssessment:0,
               undiagnosedReferredForAssessment:0,
               total:0
             };

             $scope.adultMI_EMPII = {
               yesAndBeingTreated:0,
               yesAndNotBeingTreated:0,
               yesAndReferredForAssessment:0,
               undiagnosedReferredForAssessment:0,
               total:0
             };

             $scope.adultMI_HomeSafe = {
               yesAndBeingTreated:0,
               yesAndNotBeingTreated:0,
               yesAndReferredForAssessment:0,
               undiagnosedReferredForAssessment:0,
               total:0
             };

             $scope.adultMI_HomeAgain = {
               yesAndBeingTreated:0,
               yesAndNotBeingTreated:0,
               yesAndReferredForAssessment:0,
               undiagnosedReferredForAssessment:0,
               total:0
             };

             $scope.adultMI_HomeFront = {
               yesAndBeingTreated:0,
               yesAndNotBeingTreated:0,
               yesAndReferredForAssessment:0,
               undiagnosedReferredForAssessment:0,
               total:0
             };

             $scope.adultMI_Total = 0;

             var responseArray = response

             for (var i = 0; i < responseArray.length; i++) {
                  $scope.adultMI_Total += parseInt(responseArray[i].count);
                  if (responseArray[i].Program == "EMP"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.adultMI_EMP.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.adultMI_EMP.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.adultMI_EMP.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.adultMI_EMP.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                  }

                  else if (responseArray[i].Program == "EMPII"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.adultMI_EMPII.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.adultMI_EMPII.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.adultMI_EMPII.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.adultMI_EMPII.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                  }

                  else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.adultMI_HomeSafe.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.adultMI_HomeSafe.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.adultMI_HomeSafe.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.adultMI_HomeSafe.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                  }

                  else if (responseArray[i].Program == "HomeAgain" || responseArray[i].Program == "Home Again"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.adultMI_HomeAgain.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.adultMI_HomeAgain.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.adultMI_HomeAgain.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.adultMI_HomeAgain.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                  }

                  else if (responseArray[i].Program == "HomeFront"|| responseArray[i].Program == "Home Front"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.adultMI_HomeFront.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.adultMI_HomeFront.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.adultMI_HomeFront.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.adultMI_HomeFront.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                  }
                }//end for for loop
                console.log('test EMP', $scope.adultMI_EMP);
                console.log('test EMPII', $scope.adultMI_EMPII);
                console.log('test Safe', $scope.adultMI_HomeSafe);
                console.log('test Again', $scope.adultMI_HomeAgain);
                console.log('test Front', $scope.adultMI_HomeFront);
                console.log('TOTAL', $scope.adultMI_Total);

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
            $scope.parentEduThisYear_EMP = {
                 total:0
               };

               $scope.parentEduThisYear_EMPII = {
                 total:0
               };

               $scope.parentEduThisYear_HomeSafe = {
                 total:0
               };

               $scope.parentEduThisYear_HomeAgain = {
                 total:0
               };

               $scope.parentEduThisYear_HomeFront = {
                 total:0
               };

               $scope.parentEduThisYear_Total = 0;

               var responseArray = response

               for (var i = 0; i < responseArray.length; i++) {
                    $scope.parentEduThisYear_Total += parseInt(responseArray[i]["Parenting Completed"]);

                    if (responseArray[i].Program == "EMP"){
                        $scope.parentEduThisYear_EMP.total += parseInt(responseArray[i]["Parenting Completed"]);
                    }
                    else if (responseArray[i].Program == "EMPII"){
                        $scope.parentEduThisYear_EMPII.total += parseInt(responseArray[i]["Parenting Completed"]);
                    }
                    else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
                        $scope.parentEduThisYear_HomeSafe.total += parseInt(responseArray[i]["Parenting Completed"]);
                    }

                    else if (responseArray[i].Program == "HomeAgain" || responseArray[i].Program == "Home Again"){
                        $scope.parentEduThisYear_HomeAgain.total += parseInt(responseArray[i]["Parenting Completed"]);
                    }

                    else if (responseArray[i].Program == "HomeFront"|| responseArray[i].Program == "Home Front"){
                        $scope.parentEduThisYear_HomeFront += parseInt(responseArray[i]["Parenting Completed"]);
                    }
                } // end for loop
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


  }

  $scope.resetQuery = function () {
    $scope.selectedprogram = [];
    $scope.selectedoutcome = [];
    $scope.startdate = new Date();
    $scope.enddate = new Date();
  }


// end controller
}]);
