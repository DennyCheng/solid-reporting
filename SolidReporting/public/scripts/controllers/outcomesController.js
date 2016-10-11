myApp.controller("OutcomesController", ["$scope",'$http', '$location', 'DataFactory', '$mdSidenav', 'OutcomeFactory', 'DemoFactory', function ($scope, $http, $location, DataFactory, $mdSidenav, OutcomeFactory, DemoFactory) {
  console.log("hello from OutcomesController");

  $scope.outcomeFactory = OutcomeFactory;
  $scope.demoFactory = DemoFactory;

  $scope.toggleSide = function() {
    $mdSidenav('left').toggle();
  };

  $scope.tologout = function() {
    $scope.dataFactory.logout().then(function(response) {
      console.log('logged out');
      console.log('i redirected you to the home page');
      $location.path("/login");
    });
  };

  var programs = [];

  //----- Programs & Outcomes Checkboxes --------------
  // $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

  $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];

  showData();
  function showData() {

      $scope.demoFactory.retrieveData().then(function(response) {
          $scope.data = response;
          // console.log('type of number?', typeof parseInt());
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
          + "Last Residence: " + $scope.lastResidenceSelection + "\n");

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

        // $scope.outcomeFactory.houseStabil(selections).then(function(response) {
        //   console.log("response houseStabil: ", response);
        // });
        $scope.outcomeFactory.adultEduAdv(selections).then(function(response) {
          // console.log("response adultEduAdv: ", response);
            var data = response;
            console.log('data response adultEdu', data);
            for (var i = 0; i < data.length; i++) {

                // EMP PROGRAM
                $scope.empAdult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program === 'EMP') {
                    // Adult Completed Education
                    if(data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        $scope.empAdult.complete += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.complete === undefined ) {
                        $scope.empAdult.complete = 0;
                    }
                    console.log('emp adult complete', $scope.empAdult.complete);

                    // Adult Continue Education
                    if(data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        $scope.empAdult.continue += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.continue === undefined ) {
                        $scope.empAdult.continue = 0;
                    }
                    console.log('emp adult continue', $scope.empAdult.continue);

                    // Adult Dropout
                    if(data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        $scope.empAdult.dropout += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.dropout === undefined ) {
                        $scope.empAdult.dropout = 0;
                    }
                    console.log('emp adult Dropped', $scope.empAdult.dropout);

                    // Adult Enrolled
                    if(data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        $scope.empAdult.enrolled += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.enrolled  === undefined ) {
                        $scope.empAdult.enrolled = 0;
                    }
                    console.log('emp adult enrolled', $scope.empAdult.enrolled);

                    // EMP TOTAL
                    $scope.empAdult.total = $scope.empAdult.complete + $scope.empAdult.continue + $scope.empAdult.dropout + $scope.empAdult.enrolled;
                    console.log('emp total', $scope.empAdult.total);
                } // END OF EMP

                // EMPII PROGRAM
                $scope.emp2Adult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program === 'EMPII') {
                    console.log(' emp2 program',data[i]['Adult Edu Adv'] );
                    // Adult Completed Education
                    if(data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        var emp2Adcom = parseInt(data[i].count);
                        $scope.emp2Adult.complete += emp2Adcom;
                    }
                    if (emp2Adcom === undefined ) {
                        emp2Adcom = 0;
                    }
                    console.log('emp2 adult complete', $scope.emp2Adult.complete);

                    // Adult Continue Education
                    if(data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        var emp2Adcon = parseInt(data[i].count);
                        $scope.emp2Adult.continue = emp2Adcon;
                    }
                    if (emp2Adcon === undefined ) {
                        emp2Adcon = 0;
                    }
                    console.log('emp2 adult continue', $scope.emp2Adult.continue);

                    // Adult Dropout
                    if(data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                         var emp2Addrop = parseInt(data[i].count);
                        $scope.emp2Adult.dropout += emp2Addrop;
                    }
                    if (emp2Addrop === undefined ) {
                        emp2Addrop = 0;
                    }
                    console.log('emp2 adult Dropped', $scope.emp2Adult.dropout);

                    // Adult Enrolled
                    if(data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        var emp2Adenroll = parseInt(data[i].count);
                        $scope.emp2Adult.enrolled += emp2Adenroll;
                    }
                    if (emp2Adenroll  === undefined ) {
                        emp2Adenroll = 0;
                    }
                    console.log('emp2 adult enrolled', $scope.emp2Adult.enrolled);
                    $scope.emp2Adult.total = emp2Adenroll + emp2Addrop + emp2Adcom + emp2Adcon;
                    console.log('emp2 total', $scope.emp2Adult.total);


                } // End of EMPII


                // HOMESAFE PROGRAM
                $scope.homeSafeAdult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program == "HomeSafe" || data[i].Program == "Home Safe") {
                    // Adult Completed Education
                    if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        $scope.homeSafeAdult.complete += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.complete === undefined) {
                        $scope.homeSafeAdult.complete = 0;
                    }

                    // Adult Continue Education
                    if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        $scope.homeSafeAdult.continue += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.continue === undefined) {
                        $scope.homeSafeAdult.continue = 0;
                    }

                    // Adult Dropout Education
                    if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        $scope.homeSafeAdult.dropout += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.dropout === undefined) {
                        $scope.homeSafeAdult.dropout = 0;
                    }

                    // Adult Enrolled Education
                    if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        $scope.homeSafeAdult.enrolled += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.enrolled === undefined) {
                        $scope.homeSafeAdult.enrolled = 0;
                    }
                    console.log('HOMESAFE total', $scope.homeSafeAdult.total);
                } // End of HOMESAFE

                    // HOMEFRONT PROGRAM
                    $scope.homeFrontAdult = {
                        complete: 0,
                        continue: 0,
                        enrolled: 0,
                        dropout: 0,
                        total: 0
                    };

                    if(data[i].Program == "HomeFront" || data[i].Program == "Home Front" ) {
                        // Adult Completed Education
                        if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                            $scope.homeFrontAdult.complete += parseInt(data[i].count);
                            $scope.homeFrontAdult.total += parseInt(data[i].count);
                        }
                        if ($scope.homeFrontAdult.complete === undefined) {
                            $scope.homeFrontAdult.complete = 0;
                        }

                        // Adult Continue Education
                        if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                            $scope.homeFrontAdult.continue += parseInt(data[i].count);
                            $scope.homeFrontAdult.total += parseInt(data[i].count);
                        }
                        if ($scope.homeFrontAdult.continue === undefined) {
                            $scope.homeFrontAdult.continue = 0;
                        }

                        // Adult Dropout Education
                        if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                            $scope.homeFrontAdult.dropout += parseInt(data[i].count);
                            $scope.homeFrontAdult.total += parseInt(data[i].count);
                        }
                        if ($scope.homeFrontAdult.dropout === undefined) {
                            $scope.homeFrontAdult.dropout = 0;
                        }

                        // Adult Enrolled Education
                        if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
                            $scope.homeFrontAdult.enrolled += parseInt(data[i].count);
                            $scope.homeFrontAdult.total += parseInt(data[i].count);
                        }
                        if ($scope.homeFrontAdult.enrolled === undefined) {
                            $scope.homeFrontAdult.enrolled = 0;
                        }
                        console.log('homefront total', $scope.homefrontAdult.total);
                    } // End of HOMEFRONT

                // HOMEFAGAIN PROGRAM
                $scope.homeAgainAdult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program == "HomeAgain" || data[i].Program == "Home Again" ) {
                    // Adult Completed Education
                    if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        $scope.homeAgainAdult.complete += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.complete === undefined) {
                        $scope.homeAgainAdult.complete = 0;
                    }

                    // Adult Continue Education
                    if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        $scope.homeAgainAdult.continue += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.continue === undefined) {
                        $scope.homeAgainAdult.continue = 0;
                    }

                    // Adult Dropout Education
                    if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        $scope.homeAgainAdult.dropout += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.dropout === undefined) {
                        $scope.homeAgainAdult.dropout = 0;
                    }

                    // Adult Enrolled Education
                    if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        $scope.homeAgainAdult.enrolled += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.enrolled === undefined) {
                        $scope.homeAgainAdult.enrolled = 0;
                    }
                    console.log('homeagain  total', $scope.homeAgainAdult.total);
                } // End of HOMEFAGAIN

            } // End of for loop

        }); // adultEduAdv

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
        $scope.outcomeFactory.parentEduYearBefore(selections).then(function(response) {
          console.log("response parentEduYearBefore: ", response);

        });
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


  };

  $scope.resetQuery = function () {
    $scope.selectedprogram = [];
    $scope.selectedoutcome = [];
    $scope.startdate = new Date();
    $scope.enddate = new Date();
  };


// end controller
}]);
