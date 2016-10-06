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

    // $scope.demoFactory.dobAdults(selections).then(function(response) {
    //   console.log("response dobAdults: ", response);
    // });
    //Come back for this last (logic is hard)
    // $scope.demoFactory.dobChildren(selections).then(function(response) {
    //   // console.log("response dobChildren: ", response);
    // });
    // //Jerry- Incomplete
    // $scope.demoFactory.totalPeople(selections).then(function(response) {
    //   // console.log("response totalPeople: ", response)
    // });
    // //Jerry- Incomplete
    // $scope.demoFactory.allGender(selections).then(function(response) {
    //   // console.log("response allGender: ", response);
    // });
    // //Jerry- Incomplete
    // $scope.demoFactory.raceAdults(selections).then(function(response) {
    //   // console.log("response raceAdults: ", response);
    // });

    //Denny- Complete
    // $scope.demoFactory.raceChildren(selections).then(function(response) {
    //   console.log("response raceChildren from server: ", response);
    //    var responseArray = response;
    //
    //    var raceChildEMP = {
    //      african:0,
    //      africanAmerican:0,
    //      americanIndian:0,
    //      asian:0,
    //      caucasianWhite:0,
    //      hispanicLatino:0,
    //      multiracial:0,
    //      other:0,
    //      totalCount:0
    //    };
    //
    //    var raceChildEMPII = {
    //      african:0,
    //      africanAmerican:0,
    //      americanIndian:0,
    //      asian:0,
    //      caucasianWhite:0,
    //      hispanicLatino:0,
    //      multiracial:0,
    //      other:0,
    //      totalCount:0
    //    };
    //
    //    var raceChildHomeSafe = {
    //      african:0,
    //      africanAmerican:0,
    //      americanIndian:0,
    //      asian:0,
    //      caucasianWhite:0,
    //      hispanicLatino:0,
    //      multiracial:0,
    //      other:0,
    //      totalCount:0
    //    };
    //
    //    var raceChildHomeAgain = {
    //      african:0,
    //      africanAmerican:0,
    //      americanIndian:0,
    //      asian:0,
    //      caucasianWhite:0,
    //      hispanicLatino:0,
    //      multiracial:0,
    //      other:0,
    //      totalCount:0
    //    };
    //
    //    var raceChildHomeFront = {
    //      african:0,
    //      africanAmerican:0,
    //      americanIndian:0,
    //      asian:0,
    //      caucasianWhite:0,
    //      hispanicLatino:0,
    //      multiracial:0,
    //      other:0,
    //      totalCount:0
    //    };
    //
    //    //Total of all children
    //    var raceChildTotal = 0;
    //
    //
    //    for (var i = 0; i < responseArray.length; i++) {
    //      raceChildTotal += parseInt(responseArray[i].count)
    //
    //      if(responseArray[i].Program =="EMP"){
    //        if(responseArray[i].race == "African"){
    //          raceChildEMP.african += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          raceChildEMP.africanAmerican += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          raceChildEMP.americanIndian += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          raceChildEMP.asian += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          raceChildEMP.caucasianWhite += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          raceChildEMP.hispanicLatino += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          raceChildEMP.multiracial += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          raceChildEMP.other += parseInt(responseArray[i].count)
    //          raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="EMPII"){
    //        if(responseArray[i].race == "African"){
    //          raceChildEMPII.african += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          raceChildEMPII.africanAmerican += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          raceChildEMPII.americanIndian += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          raceChildEMPII.asian += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          raceChildEMPII.caucasianWhite += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          raceChildEMPII.hispanicLatino += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          raceChildEMPII.multiracial += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          raceChildEMPII.other += parseInt(responseArray[i].count)
    //          raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
    //        if(responseArray[i].race == "African"){
    //          raceChildHomeSafe.african += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          raceChildHomeSafe.africanAmerican += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          raceChildHomeSafe.americanIndian += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          raceChildHomeSafe.asian += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          raceChildHomeSafe.caucasianWhite += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          raceChildHomeSafe.hispanicLatino += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          raceChildHomeSafe.multiracial += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          raceChildHomeSafe.other += parseInt(responseArray[i].count)
    //          raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
    //        if(responseArray[i].race == "African"){
    //          raceChildHomeAgain.african += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          raceChildHomeAgain.africanAmerican += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          raceChildHomeAgain.americanIndian += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          raceChildHomeAgain.asian += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          raceChildHomeAgain.caucasianWhite += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          raceChildHomeAgain.hispanicLatino += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          raceChildHomeAgain.multiracial += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          raceChildHomeAgain.other += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="Home Front"||responseArray[i].Program =="HomeFront"){
    //        if(responseArray[i].race == "African"){
    //          raceChildHomeAgain.african += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          raceChildHomeAgain.africanAmerican += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          raceChildHomeAgain.americanIndian += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          raceChildHomeAgain.asian += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          raceChildHomeAgain.caucasianWhite += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          raceChildHomeAgain.hispanicLatino += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          raceChildHomeAgain.multiracial += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          raceChildHomeAgain.other += parseInt(responseArray[i].count)
    //          raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //    }//end of for statement
    //   //  console.log('results EMP',raceChildEMP)
    //   //  console.log('results EMPII',raceChildEMPII)
    //   //  console.log('raceTotal HomeSafe',raceChildHomeSafe);
    //   //  console.log('raceTotal HomeAgain',raceChildHomeAgain);
    //   //  console.log('raceTotal',raceChildTotal);
    // });//end of childRaceQuery

    //Denny- Incomplete
    // $scope.demoFactory.householdIncome(selections).then(function(response) {
    //   // console.log("response householdIncome: ", response);
    // });

    // //Denny- Incomplete
    // $scope.demoFactory.lastResidence(selections).then(function(response) {
    //   // console.log("response lastResidence: ", response);
    // });

    // //Denny- Incomplete
    // $scope.demoFactory.famsExitHousing(selections).then(function(response) {
    //   // console.log("response famsExitHousing: ", response);
    // });

    //Denny function-Complete
    // $scope.demoFactory.dobAdults(selections).then(function(response) {
    //
    //   //------------------Birthday Logic--------------------------
    //   var responseArray = response;
    //
    //   var dobEMP = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0
    //   };
    //   var dobEMPII= {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0
    //   };
    //   var dobHomeSafe = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0
    //   };
    //   var dobHomeAgain = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0
    //   };
    //   var dobHomeFront = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0
    //   };
    //
    //   for (var i = 0; i < responseArray.length; i++) {
    //     responseArray[i]['Date of Birth'] = responseArray[i]['Date of Birth'].slice(0,10);//removes excess texts from DOB
    //     var personDOB = new Date(responseArray[i]['Date of Birth']); //reformats persons DOB
    //     var age = dateDiff(personDOB,$scope.enddate);//comparing persons DOB with selected end date
    //
    //     if(responseArray[i].Program == "EMP"){
    //       if(age <= 22){
    //         // console.log("hit the 18-22 for",responseArray[i])
    //       dobEMP.age18to22 = dobEMP.age18to22+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       // console.log("hit the 23-30 for",responseArray[i])
    //       dobEMP.age23to30 = dobEMP.age23to30+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       // console.log("hit the 31-40 for",responseArray[i])
    //       dobEMP.age31to40 = dobEMP.age31to40+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       // console.log("hit the 41-54 fsor",responseArray[i])
    //       dobEMP.age41to54 = dobEMP.age41to54+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       // console.log("hit the 55-64 for",responseArray[i])
    //       dobEMP.age55to64 = dobEMP.age55to64+=1;
    //       }
    //       else if(age >=65){
    //       // console.log("hit the 65+ for",responseArray[i])
    //       dobEMP.age65tobeyond = dobEMP.age65tobeyond+=1;
    //       }
    //     }//end of EMP if
    //     else if(responseArray[i].Program == "EMPII"){
    //       if(age <= 22){
    //         dobEMPII.age18to22 = dobEMPII.age18to22+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       dobEMPII.age23to30 = dobEMPII.age23to30+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       dobEMPII.age31to40 = dobEMPII.age31to40+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       dobEMPII.age41to54 = dobEMPII.age41to54+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       dobEMPII.age55to64 = dobEMPII.age55to64+=1;
    //       }
    //       else if(age >=65){
    //       dobEMPII.age65tobeyond = dobEMPII.age65tobeyond+=1;
    //       }
    //     }
    //     else if(responseArray[i].Program == "HomeSafe"){
    //       if(age <= 22){
    //         dobHomeSafe.age18to22 = dobHomeSafe.age18to22+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       dobHomeSafe.age23to30 = dobHomeSafe.age23to30+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       dobHomeSafe.age31to40 = dobHomeSafe.age31to40+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       dobHomeSafe.age41to54 = dobHomeSafe.age41to54+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       dobHomeSafe.age55to64 = dobHomeSafe.age55to64+=1;
    //       }
    //       else if(age >=65){
    //       dobHomeSafe.age65tobeyond = dobHomeSafe.age65tobeyond+=1;
    //       }
    //     }
    //     else if(responseArray[i].Program == "Home Again"){
    //       if(age <= 22){
    //       dobHomeAgain.age18to22 = dobHomeAgain.age18to22+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       dobHomeAgain.age23to30 = dobHomeAgain.age23to30+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       dobHomeAgain.age31to40 = dobHomeAgain.age31to40+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       dobHomeAgain.age41to54 = dobHomeAgain.age41to54+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       dobHomeAgain.age55to64 = dobHomeAgain.age55to64+=1;
    //       }
    //       else if(age >=65){
    //       dobHomeAgain.age65tobeyond = dobHomeAgain.age65tobeyond+=1;
    //       }
    //     }
    //     else if(responseArray[i].Program == "Home Front" || responseArray[i].Program == "HomeFront"){//need to make sure on spelling on DB since we have no data with the name (Home Front or HomeFront)
    //       if(age <= 22){
    //       dobHomeFront.age65tobeyond = dobHomeFront.age65tobeyond+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       dobHomeFront.age65tobeyond = dobHomeFront.age65tobeyond+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       dobHomeFront.age65tobeyond = dobHomeFront.age65tobeyond+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       dobHomeFront.age65tobeyond = dobHomeFront.age65tobeyond+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       dobHomeFront.age65tobeyond = dobHomeFront.age65tobeyond+=1;
    //       }
    //       else if(age >=65){
    //       dobHomeFront.age65tobeyond = dobHomeFront.age65tobeyond+=1;
    //       }
    //     }
    //   }//end of for statement
    //   //these check for the objects to have values(these total values hsould equal response.length)
    //   console.log('emp test',dobEMP);
    //   console.log('empII test',dobEMPII);
    //   console.log('homeSafe test',dobHomeSafe);
    //   console.log('homeFront test',dobHomeFront);
    //   console.log('homeAgain test',dobHomeAgain);
    //   console.log("response length: ", response.length);
    //   // console.log("response.data: ", response.data);//this is the giant array response
    // // console.log("selections: ", selections);
    // });
  }





  ///performs age calculations
  function dateDiff(personDOB, endDate){
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
  };



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
        //need to reset $scoped out sorting variables too?
    }


// end controller
}]);
