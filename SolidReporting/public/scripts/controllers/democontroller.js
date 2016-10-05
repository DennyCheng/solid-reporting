myApp.controller("DemoController", ["$scope",'$http','DataFactory', '$location', 'DemoFactory', function ($scope, $http, DataFactory, $location, DemoFactory) {
    console.log("hello from demoController");
    var races = [];
    var residences = [];
    var programs = [];
    var programsQuery =[];

    $scope.dataFactory = DataFactory;
    $scope.dataFactory.currentSess();
    $scope.userName = $scope.dataFactory.varUsername();
    $scope.demoFactory = DemoFactory;
    var selections;
    var programSelected;
    var raceAdultSelection;
    var raceChildrenSelection;
    var genderSelection;
    var ageAdultSelection;
    var ageChildrenSelection;
    var lastResidenceSelection;


    //----GET Massive Data ----------------------------------------------
    showData();
    function showData() {

        $scope.demoFactory.retrieveData().then(function(response) {
            $scope.data = response;
            // console.log('type of number?', typeof Number());
            $scope.data.forEach(function (item) {
                // indexOf checks from index 0 to end of index every loop

                //  console.log('sg data -----', $scope.data);

                if (races.indexOf(item['Race Code']) === -1 ) {
                    races.push(item['Race Code']);
                }
                if (residences.indexOf(item['County of Last Residence']) === -1 &&
                    item['County of Last Residence'] !== null &&
                    item['County of Last Residence'] !== undefined) {
                    residences.push(item['County of Last Residence']);
                }
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
                    // programsQuery.push(item['Program']);
                }
            });
            $scope.items = angular.copy(programs);
        });
    }


  //----- Programs ----------------------------

  $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

  //----- Logic for program checkboxes ----------------

  $scope.selectedprogram = $scope.programs;
  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };


 $scope.dataFactory.currentSess();

 $scope.userName = $scope.dataFactory.varUsername();

 $scope.tologout = function() {
   $scope.dataFactory.logout().then(function(response) {
     console.log('logged out');
     console.log('i redirected you to the home page');
     $location.path("/login");
   });

 }

  //----- Programs ----------------------------

  $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

  //----- Logic for program checkboxes ----------------

  $scope.selectedprogram = $scope.programs;
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
    return ($scope.selectedprogram.length !== 0 &&
        $scope.selectedprogram.length !== $scope.programs.length);
  };

  $scope.isChecked = function() {
    return $scope.selectedprogram.length === $scope.programs.length;
  };

  $scope.toggleAll = function() {
    if ($scope.selectedprogram.length === $scope.programs.length) {
      $scope.selectedprogram = [];
    } else if ($scope.selectedprogram.length === 0 || $scope.selectedprogram.length > 0) {
      $scope.selectedprogram = $scope.programs.slice(0);
    }
  };

    $scope.selectedProgram = [];
    $scope.selected = programs;
    $scope.selectedprogram = programs;

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            var idxs = programsQuery.indexOf(item);
                if(idxs === -1) {
                    programsQuery.push(item);
                } else {
                    programsQuery.splice(idxs, 1);
                }
            $scope.toggleSelect != $scope.toggleSelect;
        }
        else {
            programsQuery.push(item);
        }
    };

    $scope.selected = programs;
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

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.isIndeterminate = function() {
        return ($scope.selected.length !== 0 &&
        $scope.selected.length !== $scope.items.length);
    };

    $scope.isChecked = function() {
        return $scope.selected.length === $scope.items.length;
    };

    $scope.toggleAll = function() {
        if ($scope.selected.length === $scope.items.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.items.slice(0);
        }
    };

    //----- Dropdowns --------------------------------
    $scope.genders = ['Female', 'Male'];

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.isIndeterminate = function() {
        return ($scope.selectedprogram.length !== 0 &&
        $scope.selectedprogram.length !== $scope.programs.length);
    };

  //----- Dropdowns -------------------------------------------------

  $scope.adultRaces = races;
  $scope.childRaces = races;

    $scope.isChecked = function() {
        return $scope.selectedprogram.length === $scope.programs.length;
    };

    $scope.toggleAll = function() {
        if ($scope.selectedprogram.length === $scope.programs.length) {
            $scope.selectedprogram = [];
        } else if ($scope.selectedprogram.length === 0 || $scope.selectedprogram.length > 0) {
            $scope.selectedprogram = $scope.programs.slice(0);
        }
    };

    //----- Dropdowns --------------------------------
    $scope.genders = ['Female', 'Male'];


    //----- Dropdowns -------------------------------------------------

    $scope.adultRaces = races;
    $scope.childRaces = races;

    $scope.childAges = ['0-18 mths', '19-35 mths', '36-59 mths', '60-71 mths (5 y.o.)', '6-9 yrs', '10-14 yrs', '15-17 yrs', '18+ child in home'];

    $scope.adultAges = ['18-22', '23-30', '31-40', '41-54', '55-64', '65+'];

    $scope.residences = ['Ramsey', 'Suburban Ramsey Co.', 'Washington Co.', 'Hennepin', 'Suburban Hennepin Co.', 'Other Metro County', 'Outside Twin Cities Metro', 'Outside of State'];

    $scope.hhIncomes = ['At or below 100% Poverty', '101%-200% Poverty', 'At or above 200% Poverty'];

    $scope.exitReasons = ['Graduated', 'Left voluntarily (not grad)', 'Terminated/Mutual termination', 'Other (i.e. death)'];


    //----- Dropdown Search field (doesn't work right) ------------------------
    $scope.searchTerm;
    $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
    };


    //------ Calendar -------------------------------------------------------

    // var startDate;
    // var endDate;


  $scope.enddate = new Date();
  console.log("$scope.enddate: ", $scope.enddate);
  $scope.startdate = new Date();
  $scope.startdate = $scope.startdate.setFullYear($scope.startdate.getFullYear() - 1);
  $scope.startdate = new Date($scope.startdate);
  console.log("$scope.startdate: ", $scope.startdate);

  $scope.maxDate = new Date(
      $scope.enddate.getFullYear(),
      $scope.enddate.getMonth(),
      $scope.enddate.getDate()
    );

    // $scope.startDate = function(date) {
    //   var startDate = date;
    //   console.log('startDate: ', startDate);
    // };
    // $scope.endDate = function(date) {
    //   var endDate = date;
    //   console.log('endDate: ', endDate);
    // };

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

    // $http.get('/demoquery').then(function(response) {
    // console.log('data', response.data);
    // $scope.data = response.data;
    // });
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
    }

    $scope.demoFactory.dobAdults(selections).then(function(response) {
      console.log("response dobAdults: ", response);
    });

    $scope.demoFactory.dobChildren(selections).then(function(response) {
      console.log("response dobChildren: ", response);
    });

    $scope.demoFactory.totalPeople(selections).then(function(response) {
      console.log("response totalPeople: ", response);
    });

    $scope.demoFactory.allGender(selections).then(function(response) {
      console.log("response allGender: ", response);
    });

    $scope.demoFactory.raceAdults(selections).then(function(response) {
      console.log("response raceAdults: ", response);
    });

    $scope.demoFactory.raceChildren(selections).then(function(response) {
      console.log("response raceChildren: ", response);
    });

    $scope.demoFactory.householdIncome(selections).then(function(response) {
      console.log("response householdIncome: ", response);
    });

    $scope.demoFactory.lastResidence(selections).then(function(response) {
      console.log("response lastResidence: ", response);
    });

    $scope.demoFactory.famsExitHousing(selections).then(function(response) {
      console.log("response famsExitHousing: ", response);
    });
    //start of denny function
    $scope.demoFactory.dobAdults(selections).then(function(response) {

      //------------------Birthday Logic--------------------------
      var responseArray = response;

      var dobemp = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var dobempII= {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var dobhomeSafe = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var dobhomeAgain = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var dobhomeFront = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };

      for (var i = 0; i < responseArray.length; i++) {
        responseArray[i]['Date of Birth'] = responseArray[i]['Date of Birth'].slice(0,10);//removes excess texts from DOB
        var personDOB = new Date(responseArray[i]['Date of Birth']); //reformats persons DOB
        var age = dateDiff(personDOB,$scope.enddate);//comparing persons DOB with selected end date

        if(responseArray[i].Program == "EMP"){
          if(age <= 22){
            // console.log("hit the 18-22 for",responseArray[i])
            dobemp.age18to22 = dobemp.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          // console.log("hit the 23-30 for",responseArray[i])
          dobemp.age23to30 = dobemp.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          // console.log("hit the 31-40 for",responseArray[i])
          dobemp.age31to40 = dobemp.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          // console.log("hit the 41-54 fsor",responseArray[i])
          dobemp.age41to54 = dobemp.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          // console.log("hit the 55-64 for",responseArray[i])
          dobemp.age55to64 = dobemp.age55to64+=1;
          }
          else if(age >=65){
          // console.log("hit the 65+ for",responseArray[i])
          dobemp.age65tobeyond = dobemp.age65tobeyond+=1;
          }
        }//end of EMP if
        else if(responseArray[i].Program == "EMPII"){
          if(age <= 22){
            dobempII.age18to22 = dobempII.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          dobempII.age23to30 = dobempII.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          dobempII.age31to40 = dobempII.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          dobempII.age41to54 = dobempII.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          dobempII.age55to64 = dobempII.age55to64+=1;
          }
          else if(age >=65){
          dobempII.age65tobeyond = dobempII.age65tobeyond+=1;
          }
        }
        else if(responseArray[i].Program == "HomeSafe"){
          if(age <= 22){
            dobhomeSafe.age18to22 = dobhomeSafe.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          dobhomeSafe.age23to30 = dobhomeSafe.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          dobhomeSafe.age31to40 = dobhomeSafe.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          dobhomeSafe.age41to54 = dobhomeSafe.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          dobhomeSafe.age55to64 = dobhomeSafe.age55to64+=1;
          }
          else if(age >=65){
          dobhomeSafe.age65tobeyond = dobhomeSafe.age65tobeyond+=1;
          }
        }
        else if(responseArray[i].Program == "Home Again"){
          if(age <= 22){
            dobhomeAgain.age18to22 = dobhomeAgain.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          dobhomeAgain.age23to30 = dobhomeAgain.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          dobhomeAgain.age31to40 = dobhomeAgain.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          dobhomeAgain.age41to54 = dobhomeAgain.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          dobhomeAgain.age55to64 = dobhomeAgain.age55to64+=1;
          }
          else if(age >=65){
          dobhomeSafe.age65tobeyond = dobhomeSafe.age65tobeyond+=1;
          }
        }
        else if(responseArray[i].Program == "Home Front" || responseArray[i].Program == "HomeFront"){//need to make sure on spelling on DB since we have no data with the name (Home Front or HomeFront)
          if(age <= 22){
          dobhomeFront.age65tobeyond = dobhomeFront.age65tobeyond+=1;
          }
          else if(age <=30 && age >= 23){
          dobhomeFront.age65tobeyond = dobhomeFront.age65tobeyond+=1;
          }
          else if(age <=40 && age >= 31){
          dobhomeFront.age65tobeyond = dobhomeFront.age65tobeyond+=1;
          }
          else if(age <=54 && age >= 41){
          dobhomeFront.age65tobeyond = dobhomeFront.age65tobeyond+=1;
          }
          else if(age <=64 && age >= 55){
          dobhomeFront.age65tobeyond = dobhomeFront.age65tobeyond+=1;
          }
          else if(age >=65){
          dobhomeFront.age65tobeyond = dobhomeFront.age65tobeyond+=1;
          }
        }
      }//end of for statement
      //these check for the objects to have values(these total values hsould equal response.length)
      console.log('emp test',dobemp);
      console.log('empII test',dobempII);
      console.log('homeSafe test',dobhomeSafe);
      console.log('homeFront test',dobhomeFront);
      console.log('homeAgain test',dobhomeAgain);
      console.log("response length: ", response.length);
      // console.log("response.data: ", response.data);//this is the giant array response

    console.log("selections: ", selections);
  });
  }





  ///performs age calculations
  function dateDiff(personDOB, endDate)
  {
    var personYear = endDate.getFullYear();
    var personMonth = endDate.getMonth();
    var personDate = endDate.getDate();
    var endYear = personDOB.getFullYear();
    var endMonth = personDOB.getMonth();
    var endDay = personDOB.getDate();
    var diff = personYear - endYear;
    if(endMonth > personMonth) diff--;
    else
    {
      if(endMonth == personMonth)
      {
        if(endDay > personDate) diff--;
      }
    }
    return diff;
  }



    //********** Second option selected function ****************

    // $scope.newQuery = function() {
    //     // get call to the server passing the data
    //     $http.get('/uploadfile/data').then(function(response){
    //         console.log('response', response.data);
    //         $scope.selectedgender;
    //         console.log($scope.selectedgender[0]);
    //         $scope.selectedadultRace;
    //         console.log($scope.selectedadultRace);
    //         $scope.selectedchildAge;
    //         console.log($scope.selectedchildAge);
    //         $scope.selectedresidence;
    //         console.log($scope.selectedresidence);
    //         $scope.selectedhhIncome;
    //         console.log($scope.selectedhhIncome);
    //         $scope.selectedexitingPerson;
    //         console.log($scope.selectedexitingPerson);
    //         $scope.date1;
    //         console.log('selectedDate', $scope.date1);
    //         $scope.date2;
    //         console.log('selectedDate', $scope.date2);
    //     })
    //
    // }

    $scope.resetQuery = function () {
        $scope.selectedprogram = [];
        $scope.selectedgender = [];
        $scope.selectedadultRace = [];
        $scope.selectedchildRace = [];
        $scope.selectedchildAge = [];
        $scope.selectedadultAge = [];
        $scope.selectedresidence = [];
        $scope.selectedhhIncome = [];
        $scope.selectedexitReason = [];
        $scope.startdate = new Date();
        $scope.enddate = new Date();
    }


// end controller
}]);
