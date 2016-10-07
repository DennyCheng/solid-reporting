myApp.controller("DemoController", ["$scope",'$http','DataFactory', '$location', 'DemoFactory', function ($scope, $http, DataFactory, $location, DemoFactory) {
    console.log("hello from demoController");
    var races = [];
    var residences = [];
    var programs = [];
    var programDataEMP = [];

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
                    // console.log('item------00000',item ['Race Code']);
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
                }
            });
            $scope.items = angular.copy(programs);
        });
    }

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

      $scope.programTotal = {
          adult: 0,
          children: 0,
          emp1: 0,
          emp2: 0,
          homeagain: 0,
          homesafe: 0,
          adultChildrenTotal: 0
      };

      $scope.emp1 = {
          adult: 0,
          children: 0
      };
      $scope.emp2 = {
          adult: 0,
          children: 0
      };
      $scope.homesafe = {
          adult: 0,
          children: 0
      };
      $scope.homeagian = {
          adult: 0,
          children: 0
      };

        // $scope.demoFactory.totalPeople(selections).then(function (response) {
        //     console.log("response totalPeople: ", response);
        //     var data = response;
        //     console.log('data---------', data);
        //
        //     // console.log('3204239438403324-23------',dataProgram);
        //     for (var i = 0; i < data.length; i++) {
        //         console.log('3204239438403324-23DATATAT------', data[i]);
        //         var dataProgram = data[i]['Program'];
        //         var dataRole = data[i]['role'];
        //
        //         if (dataProgram === 'EMP' && dataRole === 'Adults') {
        //             var empSum = Number(data[i]['sum']);
        //             // console.log('total sum emp adult -------', empSum);
        //         }
        //         if (dataProgram === 'EMP' && dataRole === 'Children') {
        //             var empChildrenSum = Number(data[i]['sum']);
        //             // console.log('total sum emp children -------', empChildrenSum);
        //         }
        //         if (dataProgram === 'EMPII' && dataRole === 'Adults') {
        //             var emp2Sum = Number(data[i]['sum']);
        //             // console.log('total sum empII adult -------', emp2Sum);
        //         }
        //         if (dataProgram === 'EMPII' && dataRole === 'Children') {
        //             var emp2ChildrenSum = Number(data[i]['sum']);
        //             // console.log('total sum empII children -------', emp2ChildrenSum);
        //         }
        //
        //         if (dataProgram === 'HomeSafe' && dataRole === 'Adults') {
        //             var homesafeSum = Number(data[i]['sum']);
        //             // console.log('total sum HomeSafe Adults -------', homesafeSum);
        //         }
        //         if (dataProgram === 'HomeSafe' && dataRole === 'Children') {
        //             var homesafeChildrenSum = Number(data[i]['sum']);
        //             // console.log('total sum HomeSafe children -------', homesafeChildrenSum);
        //         }
        //         if (dataProgram === 'Home Again' && dataRole === 'Adults') {
        //             var homeAgianSum = Number(data[i]['sum']);
        //             // console.log('total sum Home Again Adults -------', homeAgianSum);
        //         }
        //         if (dataProgram === 'Home Again' && dataRole === 'Children') {
        //             var homeAgianChildrenSum = Number(data[i]['sum']);
        //             // console.log('total sum Home Again children -------', homeAgianChildrenSum);
        //         }
        //     }
        //     // EMP1
        //     $scope.emp1.adult = empSum;
        //     $scope.emp1.children = empChildrenSum;
        //     console.log('emp1adult sum value',$scope.emp1.adult);
        //     console.log('emp1children sum value',$scope.emp1.children);
        //
        //     // EMP2
        //     $scope.emp2.adult = emp2Sum;
        //     $scope.emp2.children = emp2ChildrenSum;
        //     console.log('emp2adult sum value',$scope.emp2.adult);
        //     console.log('emp2children sum value',$scope.emp2.children);
        //
        //     // HOMESAFE
        //     $scope.homesafe.adult = homesafeSum;
        //     $scope.homesafe.children = homesafeChildrenSum ;
        //     console.log('homesafeadult sum value',$scope.homesafe.adult);
        //     console.log('homesafechildren sum value',$scope.homesafe.children);
        //
        //     // HOMEAGAIN
        //     $scope.homeagian.adult = homeAgianSum;
        //     $scope.homeagian.children = homeAgianChildrenSum;
        //     console.log('homeagianadult sum value',$scope.homeagian.adult);
        //     console.log('homeagianchildren sum value',$scope.homeagian.children);
        //
        //     // Adult Total
        //     $scope.programTotal.adult = empSum + emp2Sum + homesafeSum + homeAgianSum;
        //     console.log('Program adult total ', $scope.programTotal.adult);
        //
        //     //Children Total
        //     $scope.programTotal.children = empChildrenSum +  emp2ChildrenSum + homesafeChildrenSum + homeAgianChildrenSum;
        //     console.log('Program children total ', $scope.programTotal.children);
        //
        //     //EMP1 Total
        //     $scope.programTotal.emp1 = empSum + empChildrenSum;
        //     console.log('Program EMP1 total ', $scope.programTotal.emp1);
        //
        //     //EMP2 Total
        //     $scope.programTotal.emp2 = emp2Sum + emp2ChildrenSum;
        //     console.log('Program EMP2 total ', $scope.programTotal.emp2);
        //
        //     //HomeAgain Total
        //     $scope.programTotal.homeagain = homeAgianSum + homeAgianChildrenSum;
        //     console.log('Program HomeAgain total ', $scope.programTotal.homeagain);
        //
        //     //HomeSafe Total
        //     $scope.programTotal.homesafe = homesafeSum + homesafeChildrenSum;
        //     console.log('Program HomeSafe total ', $scope.programTotal.homesafe);
        //
        //     //Program Adult and Children Total
        //     $scope.programTotal.adultChildrenTotal = $scope.programTotal.adult + $scope.programTotal.children;
        //     console.log('Program Adult and Children total ', $scope.programTotal.adultChildrenTotal);
        //
        // });


      $scope.empGender = {
          male: 0,
          female: 0,
          unknown: 0
      };
      $scope.emp2Gender = {
          male: 0,
          female: 0,
          unknown: 0
      };
      $scope.homesafeGender = {
          male: 0,
          female: 0,
          unknown: 0
      };
      $scope.homeagianGender = {
          male: 0,
          female: 0,
          unknown: 0
      };

    $scope.demoFactory.allGender(selections).then(function(response) {
      console.log("response allGender: ", response);
        var data = response;
        for(var i = 0; i < data.length; i++) {
            if (data[i]['Program'] === 'EMP' && data[i]['Gender'] === 'Female') {
                var empFemale = parseInt(data[i]['sum']);
                // console.log('total sum emp gender Female -------', empFemale );
            }
            if (data[i]['Program'] === 'EMP' && data[i]['Gender'] === 'Male') {
                var empMale = parseInt(data[i]['sum']);
                // console.log('total sum emp gender Male -------', empMale );
            }
            if (data[i]['Program'] === 'EMPII' && data[i]['Gender'] === 'Female') {
                var emp2Female = parseInt(data[i]['sum']);
                // console.log('total sum emp2 gender Female -------', emp2Female );
            }
            if (data[i]['Program'] === 'EMPII' && data[i]['Gender'] === 'Male') {
                var emp2Male = parseInt(data[i]['sum']);
                // console.log('total sum emp2 gender Male -------', emp2Male );
            }
            if (data[i]['Program'] === 'HomeSafe' && data[i]['Gender'] === 'Female') {
                var homesafeFemale = parseInt(data[i]['sum']);
                // console.log('total sum HomeSafe gender Female -------', homesafeFemale );
            }
            if (data[i]['Program'] === 'HomeSafe' && data[i]['Gender'] === 'Male') {
                var homesafeMale = parseInt(data[i]['sum']);
                // console.log('total sum HomeSafe gender Male -------', homesafeMale );
            }
            if (data[i]['Program'] === 'HomeSafe' && data[i]['Gender'] === null) {
                var homesafeunknown = parseInt(data[i]['sum']);
                // console.log('total sum HomeSafe gender unknown -------', homesafeunknown );
            }
            if (data[i]['Program'] === 'Home Again' && data[i]['Gender'] === 'Female') {
                var homeagainFemale = parseInt(data[i]['sum']);
                // console.log('total sum Home Again gender Female -------', homeagainFemale );
            }
            if (data[i]['Program'] === 'Home Again' && data[i]['Gender'] === 'Male') {
                var homeagainMale = parseInt(data[i]['sum']);
                // console.log('total sum Home Again gender Male -------', homeagainMale );
            }

        }

        $scope.empGender.female = empFemale;
        console.log('gender ----empfemale-',empFemale);
        $scope.empGender.male = empMale;
        console.log('gender -----empmale',empMale);
        $scope.emp2Gender.female = emp2Female;
        console.log('gender -----emp2female',emp2Female);
        $scope.emp2Gender.male = emp2Male;
        console.log('gender -----emp2male',emp2Male);
        $scope.homesafeGender.female = homesafeFemale;
        console.log('gender -----homesafeFemale',homesafeFemale);
        $scope.homesafeGender.male = homesafeMale;
        console.log('gender -----homesafeMale',homesafeMale);
        $scope.homesafeGender.unknown = homesafeunknown;
        console.log('gender -----homesafeunknown',homesafeunknown);
        $scope.homeagianGender.female = homeagainFemale;
        console.log('gender ----- homeagainfemale',homeagainFemale);
        $scope.homeagianGender.male = homeagainMale ;
        console.log('gender ----- homeagainmale',homeagainMale);
    });

    // $scope.demoFactory.raceAdults(selections).then(function(response) {
    //   console.log("response raceAdults: ", response);
    // });
    //
    // $scope.demoFactory.raceChildren(selections).then(function(response) {
    //   console.log("response raceChildren: ", response);
    // });
    //
    // $scope.demoFactory.householdIncome(selections).then(function(response) {
    //   console.log("response householdIncome: ", response);
    // });
    //
    // $scope.demoFactory.lastResidence(selections).then(function(response) {
    //   console.log("response lastResidence: ", response);
    // });
    //
    // $scope.demoFactory.famsExitHousing(selections).then(function(response) {
    //   console.log("response famsExitHousing: ", response);
    // });
    //start of denny function
    $scope.demoFactory.dobAdults(selections).then(function(response) {

      //------------------Birthday Logic--------------------------
      var responseArray = response;

      var emp = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var empII= {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var homeSafe = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var homeAgain = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0
      };
      var homeFront = {
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
            emp.age18to22 = emp.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          // console.log("hit the 23-30 for",responseArray[i])
          emp.age23to30 = emp.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          // console.log("hit the 31-40 for",responseArray[i])
          emp.age31to40 = emp.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          // console.log("hit the 41-54 fsor",responseArray[i])
          emp.age41to54 = emp.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          // console.log("hit the 55-64 for",responseArray[i])
          emp.age55to64 = emp.age55to64+=1;
          }
          else if(age >=65){
          // console.log("hit the 65+ for",responseArray[i])
          emp.age65tobeyond = emp.age65tobeyond+=1;
          }
        }//end of EMP if
        else if(responseArray[i].Program == "EMPII"){
          if(age <= 22){
            empII.age18to22 = empII.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          empII.age23to30 = empII.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          empII.age31to40 = empII.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          empII.age41to54 = empII.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          empII.age55to64 = empII.age55to64+=1;
          }
          else if(age >=65){
          empII.age65tobeyond = empII.age65tobeyond+=1;
          }
        }
        else if(responseArray[i].Program == "HomeSafe"){
          if(age <= 22){
            homeSafe.age18to22 = homeSafe.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          homeSafe.age23to30 = homeSafe.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          homeSafe.age31to40 = homeSafe.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          homeSafe.age41to54 = homeSafe.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          homeSafe.age55to64 = homeSafe.age55to64+=1;
          }
          else if(age >=65){
          homeSafe.age65tobeyond = homeSafe.age65tobeyond+=1;
          }
        }
        else if(responseArray[i].Program == "Home Again"){
          if(age <= 22){
            homeAgain.age18to22 = homeAgain.age18to22+=1;
          }
          else if(age <=30 && age >= 23){
          homeAgain.age23to30 = homeAgain.age23to30+=1;
          }
          else if(age <=40 && age >= 31){
          homeAgain.age31to40 = homeAgain.age31to40+=1;
          }
          else if(age <=54 && age >= 41){
          homeAgain.age41to54 = homeAgain.age41to54+=1;
          }
          else if(age <=64 && age >= 55){
          homeAgain.age55to64 = homeAgain.age55to64+=1;
          }
          else if(age >=65){
          homeSafe.age65tobeyond = homeSafe.age65tobeyond+=1;
          }
        }
        else if(responseArray[i].Program == "Home Front" || responseArray[i].Program == "HomeFront"){//need to make sure on spelling on DB since we have no data with the name (Home Front or HomeFront)
          if(age <= 22){
          homeFront.age65tobeyond = homeFront.age65tobeyond+=1;
          }
          else if(age <=30 && age >= 23){
          homeFront.age65tobeyond = homeFront.age65tobeyond+=1;
          }
          else if(age <=40 && age >= 31){
          homeFront.age65tobeyond = homeFront.age65tobeyond+=1;
          }
          else if(age <=54 && age >= 41){
          homeFront.age65tobeyond = homeFront.age65tobeyond+=1;
          }
          else if(age <=64 && age >= 55){
          homeFront.age65tobeyond = homeFront.age65tobeyond+=1;
          }
          else if(age >=65){
          homeFront.age65tobeyond = homeFront.age65tobeyond+=1;
          }
        }
      }//end of for statement
      //these check for the objects to have values(these total values hsould equal response.length)
      console.log('emp test',emp);
      console.log('empII test',empII);
      console.log('homeSafe test',homeSafe);
      console.log('homeFront test',homeFront);
      console.log('homeAgain test',homeAgain);
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
