myApp.controller("DemoController", ["$scope",'$http','DataFactory', '$location', 'DemoFactory', '$mdSidenav', function ($scope, $http, DataFactory, $location, DemoFactory, $mdSidenav) {
    console.log("hello from demoController");

    $scope.dataFactory = DataFactory;
    $scope.dataFactory.currentSess();
    $scope.userName = $scope.dataFactory.varUsername();
    $scope.demoFactory = DemoFactory;

    $scope.tologout = function() {
      $scope.dataFactory.logout().then(function(response) {
        console.log('logged out');
        console.log('i redirected you to the home page');
        $location.path("/login");
      });
    }
    $scope.toggleSide = function() {
      $mdSidenav('left').toggle();
    };

    var races = [];
    var residences = [];
    var programs = [];
    var programDataEMP = [];
    var programsQuery =[];

    var selections;
    var programSelected;
    var raceAdultSelection;
    var raceChildrenSelection;
    var genderSelection;
    var ageAdultSelection;
    var ageChildrenSelection;
    var lastResidenceSelection;
    $scope.residences = residences;



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
                if (residences.indexOf(item['County of Last Residence']) === -1) {
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


    //----- Dropdowns --------------------------------
    $scope.genders = ['Female', 'Male'];

    $scope.adultRaces = races;
    $scope.childRaces = races;

    $scope.childAges = ['0-18 mths', '19-35 mths', '36-59 mths', '60-71 mths (5 y.o.)', '6-9 yrs', '10-14 yrs', '15-17 yrs', '18+ child in home'];

    $scope.adultAges = ['18-22', '23-30', '31-40', '41-54', '55-64', '65+'];

    // $scope.residences = ['Ramsey', 'Suburban Ramsey', 'Washington', 'Hennepin', 'Suburban Hennepin', 'Other Metro County', 'OutsideTwin Cities Metro', 'Outside of state', 'Other Twin Cities Metro'];

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

  $scope.newQuery = function () {


    console.log("Program: " + $scope.selectedprogram + "\n"
      + "Gender: " + $scope.selectedgender + "\n"
      + "Adult Race: " + $scope.selectedadultRace + "\n"
      + "Adult Age: " + $scope.selectedadultAge + "\n"
      + "Children Race: " + $scope.selectedchildRace + "\n"
      + "Children Age: " + $scope.selectedchildAge + "\n"
      + "Last Residence: " + $scope.selectedresidence + "\n")

    console.log("$scope.startdate newQuery: ", $scope.startdate);
    console.log("$scope.enddate newQuery: ", $scope.enddate);

    // calculate age ranges for criteria selections:

    var ageParamsDiff = ageParams($scope.selectedadultAge, $scope.enddate);
    console.log("ageParamsDiff: ", ageParamsDiff);

    selections = {
      programSelected: $scope.selectedprogram,
      raceAdultSelection: $scope.selectedadultRace,
      raceChildrenSelection: $scope.selectedchildRace,
      genderSelection: $scope.selectedgender,
      ageAdultSelection: $scope.selectedadultAge,
      ageChildrenSelection: $scope.selectedchildAge,
      lastResidenceSelection: $scope.selectedresidence,
      startdate: $scope.startdate,
      enddate: $scope.enddate,
      arrayDateRanges: ageParamsDiff,
    };

    //Denny- Complete

    $scope.demoFactory.dobAdults(selections).then(function(response){
      //------------------Birthday Logic--------------------------
      var responseArray = response;

      $scope.dobEMP = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0,
        total:0
      };
      $scope.dobEMPII= {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0,
        total:0
      };
      $scope.dobHomeSafe = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0,
        total:0
      };
      
      $scope.dobHomeAgain = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0,
        total:0
      };
      $scope.dobHomeFront = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0,
        total:0
      };

      for (var i = 0; i < responseArray.length; i++) {
        responseArray[i]['Date of Birth'] = responseArray[i]['Date of Birth'].slice(0,10);//removes excess texts from DOB
        var personDOB = new Date(responseArray[i]['Date of Birth']); //reformats persons DOB
        var age = dateDiff(personDOB,$scope.enddate);//comparing persons DOB with selected end date

        if(responseArray[i].Program == "EMP"){
          if(age <= 22){
            // console.log("hit the 18-22 for",responseArray[i])
          $scope.dobEMP.age18to22+=1;
          $scope.dobEMP.total+=1;
          }
          else if(age <=30 && age >= 23){
          // console.log("hit the 23-30 for",responseArray[i])
          $scope.dobEMP.age23to30+=1;
          $scope.dobEMP.total+=1;
          }
          else if(age <=40 && age >= 31){
          // console.log("hit the 31-40 for",responseArray[i])
          $scope.dobEMP.age31to40+=1;
          $scope.dobEMP.total+=1;
          }
          else if(age <=54 && age >= 41){
          // console.log("hit the 41-54 fsor",responseArray[i])
          $scope.dobEMP.age41to54+=1;
          $scope.dobEMP.total+=1;
          }
          else if(age <=64 && age >= 55){
          // console.log("hit the 55-64 for",responseArray[i])
          $scope.dobEMP.age55to64+=1;
          $scope.dobEMP.total+=1;
          }
          else if(age >=65){
          // console.log("hit the 65+ for",responseArray[i])
          $scope.dobEMP.age65tobeyond+=1;
          $scope.dobEMP.total+=1;
          }
        }//end of EMP if
        else if(responseArray[i].Program == "EMPII"){
          if(age <= 22){
          $scope.dobEMPII.age18to22+=1;
          $scope.dobEMPII.total+=1;
          }
          else if(age <=30 && age >= 23){
          $scope.dobEMPII.age23to30+=1;
          $scope.dobEMPII.total+=1;
          }
          else if(age <=40 && age >= 31){
          $scope.dobEMPII.age31to40+=1;
          $scope.dobEMPII.total+=1;
          }
          else if(age <=54 && age >= 41){
          $scope.dobEMPII.age41to54+=1;
          $scope.dobEMPII.total+=1;
          }
          else if(age <=64 && age >= 55){
          $scope.dobEMPII.age55to64+=1;
          $scope.dobEMPII.total+=1;
          }
          else if(age >=65){
          $scope.dobEMPII.age65tobeyond+=1;
          $scope.dobEMPII.total+=1;
          }
        }
        else if(responseArray[i].Program == "HomeSafe" ||responseArray[i].Program == "Home Safe"){
          if(age <= 22){
          $scope.dobHomeSafe.age18to22+=1;
          $scope.dobHomeSafe.total+=1;
          }
          else if(age <=30 && age >= 23){
          $scope.dobHomeSafe.age23to30+=1;
          $scope.dobHomeSafe.total+=1;
          }
          else if(age <=40 && age >= 31){
          $scope.dobHomeSafe.age31to40+=1;
          $scope.dobHomeSafe.total+=1;
          }
          else if(age <=54 && age >= 41){
          $scope.dobHomeSafe.age41to54+=1;
          $scope.dobHomeSafe.total+=1;
          }
          else if(age <=64 && age >= 55){
          $scope.dobHomeSafe.age55to64+=1;
          $scope.dobHomeSafe.total+=1;
          }
          else if(age >=65){
          $scope.dobHomeSafe.age65tobeyond+=1;
          $scope.dobHomeSafe.total+=1;
          }
        }
        else if(responseArray[i].Program == "Home Again" ||responseArray[i].Program == "HomeAgain"){
          if(age <= 22){
          $scope.dobHomeAgain.age18to22+=1;
          $scope.dobHomeAgain.total+=1;
          }
          else if(age <=30 && age >= 23){
          $scope.dobHomeAgain.age23to30+=1;
          $scope.dobHomeAgain.total+=1;
          }
          else if(age <=40 && age >= 31){
          $scope.dobHomeAgain.age31to40+=1;
          $scope.dobHomeAgain.total+=1;
          }
          else if(age <=54 && age >= 41){
          $scope.dobHomeAgain.age41to54+=1;
          $scope.dobHomeAgain.total+=1;
          }
          else if(age <=64 && age >= 55){
          $scope.dobHomeAgain.age55to64+=1;
          $scope.dobHomeAgain.total+=1;
          }
          else if(age >=65){
          $scope.dobHomeAgain.age65tobeyond+=1;
          $scope.dobHomeAgain.total+=1;
          }
        }
        else if(responseArray[i].Program == "Home Front" || responseArray[i].Program == "HomeFront"){//need to make sure on spelling on DB since we have no data with the name (Home Front or HomeFront)
          if(age <= 22){
          $scope.dobHomeFront.age65tobeyond+=1;
          $scope.dobHomeFront.total+=1;
          }
          else if(age <=30 && age >= 23){
          $scope.dobHomeFront.age65tobeyond+=1;
          $scope.dobHomeFront.total+=1;
          }
          else if(age <=40 && age >= 31){
          $scope.dobHomeFront.age65tobeyond+=1;
          $scope.dobHomeFront.total+=1;
          }
          else if(age <=54 && age >= 41){
          $scope.dobHomeFront.age65tobeyond+=1;
          $scope.dobHomeFront.total+=1;
          }
          else if(age <=64 && age >= 55){
          $scope.dobHomeFront.age65tobeyond+=1;
          $scope.dobHomeFront.total+=1;
          }
          else if(age >=65){
          $scope.dobHomeFront.age65tobeyond+=1;
          $scope.dobHomeFront.total+=1;
          }
        }
      }//end of for statement
      //these check for the objects to have values(these total values hsould equal response.length)
      console.log('emp test',$scope.dobEMP);
      console.log('empII test',$scope.dobEMPII);
      console.log('homeSafe test',$scope.dobHomeSafe);
      console.log('homeFront test',$scope.dobHomeFront);
      console.log('homeAgain test',$scope.dobHomeAgain);
      console.log("response length: ", response.length);
      // console.log("response.data: ", response.data);//this is the giant array response
    // console.log("selections: ", selections);
    });//ends dobAdults call

    // Come back for this last (logic is hard)
    $scope.demoFactory.dobChildren(selections).then(function(response) {
      // console.log("response dobChildren: ", response);
    });

    $scope.demoFactory.totalPeople(selections).then(function (response) {
      console.log("response totalPeople: ", response);
      var data = response;
      // console.log('data---------', data);

      // console.log('3204239438403324-23------',dataProgram);
      for (var i = 0; i < data.length; i++) {
        // console.log('3204239438403324-23DATATAT------', data[i]);
        var dataProgram = data[i]['Program'];
        var dataRole = data[i]['role'];

        if (dataProgram === 'EMP' && dataRole === 'Adults') {
          var empSum = Number(data[i]['sum']);
          console.log('total sum emp adult -------', empSum);
        }
        if (dataProgram === 'EMP' && dataRole === 'Children') {
          var empChildrenSum = Number(data[i]['sum']);
          console.log('total sum emp children -------', empChildrenSum);
        }
        if (dataProgram === 'EMPII' && dataRole === 'Adults') {
          var emp2Sum = Number(data[i]['sum']);
          console.log('total sum empII adult -------', emp2Sum);
        }
        if (dataProgram === 'EMPII' && dataRole === 'Children') {
          var emp2ChildrenSum = Number(data[i]['sum']);
          console.log('total sum empII children -------', emp2ChildrenSum);
        }

        if (dataProgram === 'HomeSafe' && dataRole === 'Adults') {
          var homesafeSum = Number(data[i]['sum']);
          console.log('total sum HomeSafe Adults -------', homesafeSum);
        }
        if (dataProgram === 'HomeSafe' && dataRole === 'Children') {
          var homesafeChildrenSum = Number(data[i]['sum']);
          console.log('total sum HomeSafe children -------', homesafeChildrenSum);
        }
        if (dataProgram === 'Home Again' && dataRole === 'Adults') {
          var homeAgainSum = Number(data[i]['sum']);
          console.log('total sum Home Again Adults -------', homeAgainSum);
        }
        if (dataProgram === 'Home Again' && dataRole === 'Children') {
          var homeAgainChildrenSum = Number(data[i]['sum']);
          console.log('total sum Home Again children -------', homeAgainChildrenSum);
        }
        if(dataProgram =="Home Front"|| dataProgram =="HomeFront"  && dataRole === 'Adults') {
          var homeFrontSum = Number(data[i]['sum']);
          console.log('total sum Home front adult -------', homeFrontSum);
        }
        if(dataProgram == "Home Front"|| dataProgram == "HomeFront" && dataRole === 'Children') {
          var homeFrontChildrenSum = Number(data[i]['sum']);
          console.log('total sum Home front children -------', homeFrontChildrenSum);
        }
        if(homeFrontChildrenSum === undefined) {
          homeFrontChildrenSum = 0;
        }
        if(homeFrontSum === undefined) {
          homeFrontSum= 0;
        }
        if(homeAgainSum === undefined) {
          homeAgainSum = 0;
        }
        if(homeAgainChildrenSum === undefined) {
          homeAgainChildrenSum = 0;
        }
        if(homesafeSum === undefined) {
          homesafeSum = 0;
        }
        if(homesafeChildrenSum === undefined) {
          homesafeChildrenSum= 0;
        }
        if(emp2Sum === undefined) {
          emp2Sum = 0;
        }
        if(emp2ChildrenSum === undefined) {
          emp2ChildrenSum = 0;
        }
        if(empSum === undefined) {
          empSum = 0;
        }
        if(empChildrenSum === undefined) {
          empChildrenSum = 0;
        }
      }

      // EMP1
      $scope.empPeople = {
        adult: 0,
        children: 0
      };

      $scope.empPeople.adult = empSum;
      console.log('emp1adult sum value',$scope.empPeople.adult);

      $scope.empPeople.children = empChildrenSum;
      console.log('emp1children sum value',$scope.empPeople.children);

      // EMP2
      $scope.emp2People = {
        adult: 0,
        children: 0
      };

      $scope.emp2People.adult = emp2Sum;
      console.log('emp2adult sum value',$scope.emp2People.adult);

      $scope.emp2People.children = emp2ChildrenSum;
      console.log('emp2children sum value',$scope.emp2People.children);

      // HOMESAFE
      $scope.homesafePeople = {
        adult: 0,
        children: 0
      };

      $scope.homesafePeople.adult = homesafeSum;
      console.log('homesafeadult sum value',$scope.homesafePeople.adult);

      $scope.homesafePeople.children = homesafeChildrenSum ;
      console.log('homesafechildren sum value',$scope.homesafePeople.children);

      // HOMEAGAIN People
      $scope.homeagainPeople = {
        adult: 0,
        children: 0
      };

      $scope.homeagainPeople.adult = homeAgainSum;
      console.log('homeagianadult sum value',$scope.homeagainPeople.adult);

      $scope.homeagainPeople.children = homeAgainChildrenSum;
      console.log('homeagianchildren sum value',$scope.homeagainPeople.children);

      // HOMEFRONT People
      $scope.homeafrontPeople = {
        adult: 0,
        children: 0
      };

      //Program Adult and Children People Total
      $scope.programPeopleTotal = {
        adult: 0,
        children: 0,
        emp1: 0,
        emp2: 0,
        homeagain: 0,
        homesafe: 0,
        homefront: 0,
        adultChildrenTotal: 0
      };

      $scope.homeafrontPeople.adult = homeFrontSum;
      console.log('homefrontadult sum value',$scope.homeafrontPeople.adult);

      $scope.homeafrontPeople.children = homeFrontChildrenSum;
      console.log('homefrontchildren sum value',$scope.homeafrontPeople.children);

      // Adult Total People
      $scope.programPeopleTotal.adult = empSum + emp2Sum + homesafeSum + homeAgainSum + homeFrontSum + homeFrontChildrenSum;
      console.log('Program adult total ', $scope.programPeopleTotal.adult);

      //Children Total People
      $scope.programPeopleTotal.children = empChildrenSum +  emp2ChildrenSum + homesafeChildrenSum + homeAgainChildrenSum;
      console.log('Program children total ', $scope.programPeopleTotal.children);

      //EMP1 Total People
      $scope.programPeopleTotal.emp1 = empSum + empChildrenSum;
      console.log('Program EMP1 total ', $scope.programPeopleTotal.emp1);

      //EMP2 Total People
      $scope.programPeopleTotal.emp2 = emp2Sum + emp2ChildrenSum;
      console.log('Program EMP2 total ', $scope.programPeopleTotal.emp2);

      //HomeAgain People Total
      $scope.programPeopleTotal.homeagain = homeAgainSum + homeAgainChildrenSum;
      console.log('Program HomeAgain total ', $scope.programPeopleTotal.homeagain);

      //HomeSafe People Total
      $scope.programPeopleTotal.homesafe = homesafeSum + homesafeChildrenSum;
      console.log('Program homesafe total ', $scope.programPeopleTotal.homesafe);

      //HomeFront People Total
      $scope.programPeopleTotal.homefront = homeFrontSum + homeFrontChildrenSum;
      console.log('Program homefront total ', $scope.programPeopleTotal.homefront);

      $scope.programPeopleTotal.adultChildrenTotal = $scope.programPeopleTotal.adult + $scope.programPeopleTotal.children;
      console.log('Program Adult and Children total ', $scope.programPeopleTotal.adultChildrenTotal);


    });

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
        if(data[i]['Program'] == "Home Front" || data[i]['Program'] =="HomeFront"  && data[i]['Gender'] === 'Male') {
          var homefrontMale = Number(data[i]['sum']);
          console.log('total sum Home front adult -------', homefrontMale);
        }
        if(data[i]['Program'] == "Home Front" || data[i]['Program'] == "HomeFront" && data[i]['Gender'] === 'Female') {
          var homefrontFemale = Number(data[i]['sum']);
          console.log('total sum Home front children -------', homefrontFemale);
        }
        if(homefrontMale === undefined) {
          homefrontMale = 0;
        }
        if(homefrontFemale === undefined) {
          homefrontFemale= 0;
        }
        if(homeagainFemale === undefined) {
          homeagainFemale = 0;
        }
        if(homeagainMale === undefined) {
          homeagainMale = 0;
        }
        if(homesafeFemale === undefined) {
          homesafeFemale = 0;
        }
        if(homesafeMale === undefined) {
          homesafeMale= 0;
        }
        if(emp2Female === undefined) {
          emp2Female = 0;
        }
        if(emp2Male === undefined) {
          emp2Male = 0;
        }
        if(empFemale === undefined) {
          empFemale = 0;
        }
        if(empMale === undefined) {
          empMale = 0;
        }
      }

      // EMP 1 Gender
      $scope.empGender = {
        male: 0,
        female: 0,
        unknown: 0,
        total: 0
      };

      $scope.empGender.female = empFemale;
      console.log('gender ----empfemale-', $scope.empGender.female);
      $scope.empGender.male = empMale;
      console.log('gender -----empmale', $scope.empGender.male);
      $scope.empGender.total = $scope.empGender.female + $scope.empGender.male;
      console.log('gender -----empGender total',$scope.empGender.total);

      // EMP 2 Gender
      $scope.emp2Gender = {
        male: 0,
        female: 0,
        unknown: 0,
        total: 0
      };

      $scope.emp2Gender.female = emp2Female;
      console.log('gender -----emp2female',emp2Female);
      $scope.emp2Gender.male = emp2Male;
      console.log('gender -----emp2male',emp2Male);
      $scope.emp2Gender.total = $scope.emp2Gender.female + $scope.emp2Gender.male;
      console.log('gender -----emp2Gender total',$scope.emp2Gender.total);

      // HomeSafeGender
      $scope.homesafeGender = {
        male: 0,
        female: 0,
        unknown: 0,
        total: 0
      };

      $scope.homesafeGender.female = homesafeFemale;
      console.log('gender -----homesafeFemale', $scope.homesafeGender.female);
      $scope.homesafeGender.male = homesafeMale;
      console.log('gender -----homesafeMale', $scope.homesafeGender.male);
      // $scope.homesafeGender.unknown = homesafeunknown;
      // console.log('gender -----homesafeunknown', $scope.homesafeGender.unknown);
      $scope.homesafeGender.total = $scope.homesafeGender.female + $scope.homesafeGender.male;
      console.log('gender -----homesafe total', $scope.homesafeGender.total);

      //Home Front
      $scope.homefrontGender = {
        female: 0,
        male: 0,
        total: 0
      };

      $scope.homefrontGender.female = homefrontFemale;
      console.log('gender ----- homefrontfemale', $scope.homefrontGender.female);
      $scope.homefrontGender.male = homefrontMale ;
      console.log('gender ----- homefrontmale', $scope.homefrontGender.male);
      $scope.homefrontGender.total = $scope.homefrontGender.female + $scope.homefrontGender.male;
      console.log('gender ----- homefronttotal', $scope.homefrontGender.total);

      //  HomeAgainGender
      $scope.homeagainGender = {
        male: 0,
        female: 0,
        unknown: 0,
        total: 0
      };

      $scope.homeagainGender.female = homeagainFemale;
      console.log('gender ----- homeagainfemale',homeagainFemale);
      $scope.homeagainGender.male = homeagainMale ;
      console.log('gender ----- homeagainmale',homeagainMale);
      $scope.homeagainGender.total = $scope.homeagainGender.female + $scope.homeagainGender.male;
      console.log('gender ----- homeagaintotal', $scope.homeagainGender.total);

      // Gender Total
      $scope.genderTotal = {
        female: 0,
        male: 0,
        total: 0
      };

      $scope.genderTotal.female = empFemale + emp2Female + homesafeFemale + homeagainFemale;
      console.log('All Program female total', $scope.genderTotal.female);
      $scope.genderTotal.male = empMale + emp2Male + homesafeMale + homeagainMale;
      console.log('All Program male t   otal', $scope.genderTotal.male);
      $scope.genderTotal.total = $scope.genderTotal.female + $scope.genderTotal.male;
      console.log('All Program grand total', $scope.genderTotal.total);
    });

    $scope.demoFactory.raceAdults(selections).then(function(response) {
      console.log("response raceAdults: ", response);
      var data = response;
      for (var i = 0; i < data.length; i++) {

        // EMP
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] === "Caucasian/White") {
          var empWhite = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] === "African American") {
          var empAfricanAmerican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] === "Multiracial") {
          var empMultiracial = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] === "African") {
          var empAfrican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] === "Hispanic/Chicano") {
          var empHispanic = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] === "Asian/SE Asian Pacfic Islander") {
          var empAsian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] === "American Indian") {
          var empIndian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMP' && data[i]['Race Code'] !== "American Indian" && data[i]['Race Code'] !== "Caucasian/White" && data[i]['Race Code'] !== "African American" && data[i]['Race Code'] !== "Multiracial" && data[i]['Race Code'] !== "African" && data[i]['Race Code'] !== "Hispanic/Chicano" && data[i]['Race Code'] !== "Asian/SE Asian Pacfic Islander") {
          var empOther = parseInt(data[i]['sum']);
        }

        if (empAsian === undefined){
          empAsian = 0;
        }
        if (empWhite === undefined) {
          empWhite =0;
        }
        if (empAfrican === undefined) {
          empAfrican =0;
        }
        if (empAfricanAmerican === undefined) {
          empAfricanAmerican =0;
        }
        if (empMultiracial === undefined ) {
          empMultiracial = 0;
        }
        if (empHispanic === undefined ) {
          empHispanic = 0;
        }
        if (empIndian === undefined) {
          empIndian = 0;
        }
        if (empOther === undefined ) {
          empOther = 0;
        }

        // EMP2
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] === "Caucasian/White") {
          var emp2White = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] === "African American") {
          var emp2AfricanAmerican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] === "Multiracial") {
          var emp2Multiracial = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] === "African") {
          var emp2African = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] === "Hispanic/Chicano") {
          var emp2Hispanic = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] === "Asian/SE Asian Pacfic Islander") {
          var emp2Asian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] === "American Indian") {
          var emp2Indian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'EMPII' && data[i]['Race Code'] !== "American Indian" && data[i]['Race Code'] !== "Caucasian/White" && data[i]['Race Code'] !== "African American" && data[i]['Race Code'] !== "Multiracial" && data[i]['Race Code'] !== "African" && data[i]['Race Code'] !== "Hispanic/Chicano" && data[i]['Race Code'] !== "Asian/SE Asian Pacfic Islander") {
          var emp2Other = parseInt(data[i]['sum']);
        }
        if(emp2Asian === undefined){
          emp2Asian = 0;
        }
        if (emp2White === undefined) {
          emp2White =0;
        }
        if (emp2African === undefined) {
          emp2African =0;
        }
        if (emp2AfricanAmerican === undefined) {
          emp2AfricanAmerican =0;
        }
        if (emp2Multiracial === undefined ) {
          emp2Multiracial = 0;
        }
        if (emp2Hispanic === undefined ) {
          emp2Hispanic = 0;
        }
        if (emp2Indian === undefined) {
          emp2Indian = 0;
        }
        if (emp2Other === undefined ) {
          emp2Other = 0;
        }

        // HomeSafe
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] === "Caucasian/White") {
          var homeSafeWhite = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] === "African American") {
          var homeSafeAfricanAmerican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] === "Multiracial") {
          var homeSafeMultiracial = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] === "African") {
          var homeSafeAfrican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] === "Hispanic/Chicano") {
          var homeSafeHispanic = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] === "Asian/SE Asian Pacfic Islander") {
          var homeSafeAsian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] === "American Indian") {
          var homeSafeIdian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'HomeSafe' && data[i]['Race Code'] !== "American Indian" && data[i]['Race Code'] !== "Caucasian/White" && data[i]['Race Code'] !== "African American" && data[i]['Race Code'] !== "Multiracial" && data[i]['Race Code'] !== "African" && data[i]['Race Code'] !== "Hispanic/Chicano" && data[i]['Race Code'] !== "Asian/SE Asian Pacfic Islander") {
          var homeSafeOther = parseInt(data[i]['sum']);
        }
        if (homeSafeAsian === undefined){
          homeSafeAsian = 0;
        }
        if (homeSafeWhite === undefined) {
          homeSafeWhite =0;
        }
        if (homeSafeAfrican === undefined) {
          homeSafeAfrican =0;
        }
        if (homeSafeAfricanAmerican === undefined) {
          homeSafeAfricanAmerican =0;
        }
        if (homeSafeMultiracial === undefined ) {
          homeSafeMultiracial = 0;
        }
        if (homeSafeHispanic === undefined ) {
          homeSafeHispanic = 0;
        }
        if (homeSafeIdian === undefined) {
          homeSafeIdian = 0;
        }
        if (homeSafeOther === undefined ) {
          homeSafeOther = 0;
        }

        // Home Again
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] === "Caucasian/White") {
          var homeAgainWhite = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] === "African American") {
          var homeAgainAfricanAmerican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] === "Multiracial") {
          var homeAgainMultiracial = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] === "African") {
          var homeAgainAfrican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] === "Hispanic/Chicano") {
          var homeAgainHispanic = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] === "Asian/SE Asian Pacfic Islander") {
          var homeAgainAsian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] === "American Indian") {
          var homeAgainIdian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Again' && data[i]['Race Code'] !== "American Indian" && data[i]['Race Code'] !== "Caucasian/White" && data[i]['Race Code'] !== "African American" && data[i]['Race Code'] !== "Multiracial" && data[i]['Race Code'] !== "African" && data[i]['Race Code'] !== "Hispanic/Chicano" && data[i]['Race Code'] !== "Asian/SE Asian Pacfic Islander") {
          var homeAgainOther = parseInt(data[i]['sum']);
        }
        if (homeAgainAsian === undefined){
          homeAgainAsian = 0;
        }
        if (homeAgainWhite === undefined) {
          homeAgainWhite =0;
        }
        if (homeAgainAfrican === undefined) {
          homeAgainAfrican =0;
        }
        if (homeAgainAfricanAmerican === undefined) {
          homeAgainAfricanAmerican =0;
        }
        if (homeAgainMultiracial === undefined ) {
          homeAgainMultiracial = 0;
        }
        if (homeAgainHispanic === undefined ) {
          homeAgainHispanic = 0;
        }
        if (homeAgainIdian === undefined) {
          homeAgainIdian = 0;
        }
        if (homeAgainOther === undefined ) {
          homeAgainOther = 0;
        }

        // Home Front
        if (data[i]['Program'] === "Home Front" || data[i]['Program'] === "HomeFront" && data[i]['Race Code'] === "Caucasian/White") {
          var homefrontWhite = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === "Home Front" || data[i]['Program'] === "HomeFront" && data[i]['Race Code'] === "African American") {
          var homefrontAfricanAmerican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === "Home Front" || data[i]['Program'] === "HomeFront" && data[i]['Race Code'] === "Multiracial") {
          var homefrontMultiracial = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === "Home Front" || data[i]['Program'] === "HomeFront" && data[i]['Race Code'] === "African") {
          var homefrontAfrican = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === "Home Front" || data[i]['Program'] === "HomeFront" && data[i]['Race Code'] === "Hispanic/Chicano") {
          var homefrontHispanic = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === "Home Front" || data[i]['Program'] === "HomeFront" && data[i]['Race Code'] === "Asian/SE Asian Pacfic Islander") {
          var homefrontAsian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Front' && data[i]['Race Code'] === "American Indian") {
          var homefrontIndian = parseInt(data[i]['sum']);
        }
        if (data[i]['Program'] === 'Home Front' && data[i]['Race Code'] !== "American Indian" && data[i]['Race Code'] !== "Caucasian/White" && data[i]['Race Code'] !== "African American" && data[i]['Race Code'] !== "Multiracial" && data[i]['Race Code'] !== "African" && data[i]['Race Code'] !== "Hispanic/Chicano" && data[i]['Race Code'] !== "Asian/SE Asian Pacfic Islander") {
          var homefrontOther = parseInt(data[i]['sum']);
        }
        if (homefrontAsian === undefined){
          homefrontAsian = 0;
        }
        if (homefrontWhite === undefined) {
          homefrontWhite =0;
        }
        if (homefrontAfrican === undefined) {
          homefrontAfrican = 0;
        }
        if (homefrontAfricanAmerican === undefined) {
          homefrontAfricanAmerican = 0;
        }
        if (homefrontMultiracial === undefined ) {
          homefrontMultiracial = 0;
        }
        if (homefrontHispanic === undefined ) {
          homefrontHispanic = 0;
        }
        if (homefrontIndian === undefined) {
          homefrontIndian = 0;
        }
        if (homefrontOther === undefined ) {
          homefrontOther = 0;
        }

      }
      // EMP Race
      $scope.empRace = {
        african:0,
        africanAmerican:0,
        americanIndian:0,
        asian:0,
        caucasianWhite:0,
        hispanicLatino:0,
        multiracial:0,
        other:0,
        total:0
      };
      // EMP white
      $scope.empRace.caucasianWhite = empWhite;
      console.log('emp race white', $scope.empRace.caucasianWhite);

      // EMP African American
      $scope.empRace.africanAmerican = empAfricanAmerican;
      console.log('emp race africanAmerican', $scope.empRace.africanAmerican);

      // EMP Multiracial
      $scope.empRace.multiracial = empMultiracial;
      console.log('emp race  multiracial', $scope.empRace.multiracial);

      // EMP African
      $scope.empRace.african = empAfrican;
      console.log('emp race African', $scope.empRace.african);

      // EMP Hispanic
      $scope.empRace.hispanicLatino = empHispanic;
      console.log('emp race Hispanic', $scope.empRace.hispanicLatino);

      // EMP Asian
      $scope.empRace.asian = empAsian;
      console.log('emp race Asian', $scope.empRace.asian);

      // EMP Indian
      $scope.empRace.americanIndian = empIndian;
      console.log('emp race indian', $scope.empRace.americanIndian);

      // EMP Other
      $scope.empRace.other = empOther;
      console.log('emp race other', $scope.empRace.other);

      // EMP Total
      $scope.empRace.total = empWhite + empAfricanAmerican + empAsian + empMultiracial +  empAfrican + empHispanic + $scope.empRace.other + $scope.empRace.americanIndian;
      console.log('emp race Total', $scope.empRace.total);

      // EMP2 Race
      $scope.emp2Race = {
        african:0,
        africanAmerican:0,
        americanIndian:0,
        asian:0,
        caucasianWhite:0,
        hispanicLatino:0,
        multiracial:0,
        other:0,
        total:0
      };
      // EMP white
      $scope.emp2Race.caucasianWhite = emp2White;
      console.log('emp2 race white', $scope.emp2Race.caucasianWhite);

      // EMP  African American
      $scope.emp2Race.africanAmerican = emp2AfricanAmerican;
      console.log('emp2 race africanAmerican', $scope.emp2Race.africanAmerican);

      // EMP Multiracial
      $scope.emp2Race.multiracial = emp2Multiracial;
      console.log('emp2 race multiracial', $scope.emp2Race.multiracial);

      // EMP African
      $scope.emp2Race.african = emp2African;
      console.log('emp2 race African', $scope.emp2Race.african);

      // EMP Hispanic
      $scope.emp2Race.hispanicLatino = emp2Hispanic;
      console.log('emp2 race Hispanic', $scope.emp2Race.hispanicLatino);

      // EMP Asian
      $scope.emp2Race.asian = emp2Asian;
      console.log('emp2 race Asian', $scope.emp2Race.asian);

      // EMP Indian
      $scope.emp2Race.americanIndian = emp2Indian;
      console.log('emp2 race indian', $scope.emp2Race.americanIndian);

      // EMP other
      $scope.emp2Race.other = emp2Other;
      console.log('emp2 race other', $scope.emp2Race.other);

      // EMP  total
      $scope.emp2Race.total = emp2White + emp2AfricanAmerican + emp2Asian + emp2Multiracial +  emp2African + emp2Hispanic + emp2Indian + emp2Other;
      console.log('emp2 race Total', $scope.emp2Race.total);

      // Home Safe Race
      $scope.homesafeRace = {
        african:0,
        africanAmerican:0,
        americanIndian:0,
        asian:0,
        caucasianWhite:0,
        hispanicLatino:0,
        multiracial:0,
        other:0,
        total:0
      };

      // Home Safe white
      $scope.homesafeRace.caucasianWhite = homeSafeWhite;
      console.log('homeSafe race white', $scope.homesafeRace.caucasianWhite);

      // Home Safe african american
      $scope.homesafeRace.africanAmerican = homeSafeAfricanAmerican;
      console.log('homeSafe race africanAmerican', $scope.homesafeRace.africanAmerican);

      // Home Safe multiracial
      $scope.homesafeRace.multiracial = homeSafeMultiracial;
      console.log('homeSafe race multiracial', $scope.homesafeRace.multiracial);

      // Home Safe african
      $scope.homesafeRace.african = homeSafeAfrican;
      console.log('homeSafe race African', $scope.homesafeRace.african);

      // Home Safe hispanic
      $scope.homesafeRace.hispanicLatino = homeSafeHispanic;
      console.log('homeSafe race Hispanic', $scope.homesafeRace.hispanicLatino);

      // Home Safe asian
      $scope.homesafeRace.asian = homeSafeAsian;
      console.log('homeSafe race Asian', $scope.homesafeRace.asian);

      // Home Safe Indian
      $scope.homesafeRace.americanIndian = homeSafeIdian;
      console.log('HomeSafe race indian', $scope.homesafeRace.americanIndian);

      // Home Safe other
      $scope.homesafeRace.other = homeSafeOther;
      console.log('HomeSafe race other', $scope.homesafeRace.other);

      // Home Safe total
      $scope.homesafeRace.total = homeSafeWhite + homeSafeAfricanAmerican + homeSafeAsian + homeSafeMultiracial +  homeSafeAfrican + homeSafeHispanic + homeSafeOther;
      console.log('homeSafe race Total', $scope.homesafeRace.total);

      // home Again Race
      $scope.homeagainRace = {
        african:0,
        africanAmerican:0,
        americanIndian:0,
        asian:0,
        caucasianWhite:0,
        hispanicLatino:0,
        multiracial:0,
        other:0,
        total:0
      };

      // Home Again white
      $scope.homeagainRace.caucasianWhite = homeAgainWhite;
      console.log('homeSafe race white', $scope.homeagainRace.caucasianWhite);

      // Home Again African American
      $scope.homeagainRace.africanAmerican = homeAgainAfricanAmerican;
      console.log('homeAgain race africanAmerican', $scope.homeagainRace.africanAmerican);

      // Home Again Multiracial
      $scope.homeagainRace.multiracial = homeAgainMultiracial;
      console.log('homeAgain race multiracial', $scope.homeagainRace.multiracial);

      // Home Again African
      $scope.homeagainRace.african = homeAgainAfrican;
      console.log('homeAgain race African', $scope.homeagainRace.african);

      // Home Again Hispanic
      $scope.homeagainRace.hispanicLatino = homeAgainHispanic;
      console.log('homeAgain race Hispanic', $scope.homeagainRace.hispanicLatino);

      // Home Again Asain
      $scope.homeagainRace.asian = homeAgainAsian;
      console.log('homeAgain race Asian', $scope.homeagainRace.asian);

      // Home Again Indian
      $scope.homeagainRace.americanIndian = homeAgainIdian;
      console.log('HomeAgain race indian', $scope.homeagainRace.americanIndian);

      // Home Again other
      $scope.homeagainRace.other = homeAgainOther;
      console.log('HomeAgain race other', $scope.homeagainRace.other);

      // Home Again Total
      $scope.homeagainRace.total = homeAgainWhite + homeAgainAfricanAmerican + homeAgainAsian + homeAgainMultiracial +  homeAgainAfrican + homeAgainHispanic + homeAgainIdian + homeAgainOther;
      console.log('homeAgain race Total', $scope.homeagainRace.total);

      // home Front
      $scope.homefrontRace = {
        african:0,
        africanAmerican:0,
        americanIndian:0,
        asian:0,
        caucasianWhite:0,
        hispanicLatino:0,
        multiracial:0,
        other:0,
        total:0
      };

      // HomeFront White
      $scope.homefrontRace.caucasianWhite = homefrontWhite;
      console.log('homefront race white', $scope.homefrontRace.caucasianWhite);

      // HomeFront African American
      $scope.homefrontRace.africanAmerican = homefrontAfricanAmerican;
      console.log('homefront race africanAmerican', $scope.homefrontRace.africanAmerican);

      // HomeFront Multiracial
      $scope.homefrontRace.multiracial = homefrontMultiracial;
      console.log('homefront race multiracial', $scope.homefrontRace.multiracial);

      // HomeFront African
      $scope.homefrontRace.african = homefrontAfrican;
      console.log('homefront race African', $scope.homefrontRace.african);

      // HomeFront Hispanic
      $scope.homefrontRace.hispanicLatino = homefrontHispanic;
      console.log('homefront race Hispanic', $scope.homefrontRace.hispanicLatino);

      // HomeFront Asain
      $scope.homefrontRace.asian = homefrontAsian;
      console.log('homefront race Asian', $scope.homefrontRace.asian);

      // Home Again Indian
      $scope.homefrontRace.americanIndian = homefrontIndian;
      console.log('Homefront race indian', $scope.homefrontRace.americanIndian);

      // Home Again other
      $scope.homefrontRace.other = homefrontOther;
      console.log('Homefront race other', $scope.homefrontRace.other);

      // HomeFront Total
      $scope.homefrontRace.total = homefrontWhite + homefrontAfricanAmerican + homefrontAsian + homefrontMultiracial +  homefrontAfrican + homefrontHispanic + homefrontOther + homefrontIndian;
      console.log('homefront race Total', $scope.homefrontRace.total);

      // Program Total Race
      $scope.raceTotal = {
        african:0,
        africanAmerican:0,
        americanIndian:0,
        asian:0,
        caucasianWhite:0,
        hispanicLatino:0,
        multiracial:0,
        other:0,
        total:0
      };

      // Total White
      $scope.raceTotal.caucasianWhite = empWhite + emp2White + homeSafeWhite + homeAgainWhite + homefrontWhite;
      console.log('Program total race white', $scope.raceTotal.caucasianWhite);

      // Total African American
      $scope.raceTotal.africanAmerican = empAfricanAmerican + emp2AfricanAmerican + homeSafeAfricanAmerican + homeAgainAfricanAmerican + homefrontAfricanAmerican;
      console.log('Program total race africanAmerican', $scope.raceTotal.africanAmerican);

      // Total Multiracial
      $scope.raceTotal.multiracial = empMultiracial + emp2Multiracial + homeSafeMultiracial + homeAgainMultiracial + homefrontMultiracial;
      console.log('Program total race multiracial', $scope.raceTotal.multiracial);

      // Total African
      $scope.raceTotal.african = empAfrican  + emp2African + homeSafeAfrican + homeAgainAfrican + homefrontAfrican;
      console.log('Program total race African', $scope.raceTotal.african);

      // Total Hispanic
      $scope.raceTotal.hispanicLatino = empHispanic + emp2Hispanic + homeSafeHispanic + homeAgainHispanic + homefrontHispanic;
      console.log('Program total race Hispanic', $scope.raceTotal.hispanicLatino);

      // Total Asain
      $scope.raceTotal.asian = empAsian + emp2Asian + homeSafeAsian + homeAgainAsian + homefrontAsian;
      console.log('Program total race Asian', $scope.raceTotal.asian);

      // Total Indian
      $scope.raceTotal.americanIndian = empIndian + emp2Indian + homeSafeIdian + homeAgainIdian + homefrontIndian;
      console.log('Program total race Indian', $scope.raceTotal.americanIndian);

      // Total other
      $scope.raceTotal.other = empOther + emp2Other + homeSafeOther + homeAgainOther + homefrontOther;
      console.log('Program total race other', $scope.raceTotal.other);

      // Grand  Total
      $scope.raceTotal.total = $scope.raceTotal.caucasianWhite + $scope.raceTotal.africanAmerican + $scope.raceTotal.multiracial + $scope.raceTotal.african + $scope.raceTotal.hispanicLatino + $scope.raceTotal.asian + $scope.homefrontRace.total + $scope.raceTotal.americanIndian + $scope.raceTotal.other;
      console.log('Program total race Total', $scope.raceTotal.total);
    });  // end of race

    //Denny - Complete

    $scope.demoFactory.raceChildren(selections).then(function(response) {
       var responseArray = response;

       $scope.raceChildEMP = {
         african:0,
         africanAmerican:0,
         americanIndian:0,
         asian:0,
         caucasianWhite:0,
         hispanicLatino:0,
         multiracial:0,
         other:0,
         totalCount:0
       };

       $scope.raceChildEMPII = {
         african:0,
         africanAmerican:0,
         americanIndian:0,
         asian:0,
         caucasianWhite:0,
         hispanicLatino:0,
         multiracial:0,
         other:0,
         totalCount:0
       };

       $scope.raceChildHomeSafe = {
         african:0,
         africanAmerican:0,
         americanIndian:0,
         asian:0,
         caucasianWhite:0,
         hispanicLatino:0,
         multiracial:0,
         other:0,
         totalCount:0
       };

       $scope.raceChildHomeAgain = {
         african:0,
         africanAmerican:0,
         americanIndian:0,
         asian:0,
         caucasianWhite:0,
         hispanicLatino:0,
         multiracial:0,
         other:0,
         totalCount:0
       };

       $scope.raceChildHomeFront = {
         african:0,
         africanAmerican:0,
         americanIndian:0,
         asian:0,
         caucasianWhite:0,
         hispanicLatino:0,
         multiracial:0,
         other:0,
         totalCount:0
       };

       //Total of all children
      $scope.raceChildTotal = 0;


       for (var i = 0; i < responseArray.length; i++) {
         $scope.raceChildTotal += parseInt(responseArray[i].count)
         console.log(responseArray[i]);
         if(responseArray[i].Program =="EMP"){
           if(responseArray[i].race == "African"){
             $scope.raceChildEMP.african += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="African American"){
             $scope.raceChildEMP.africanAmerican += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="American Indian"){
             $scope.raceChildEMP.americanIndian += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
             $scope.raceChildEMP.asian += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Caucasian/White"){
             $scope.raceChildEMP.caucasianWhite += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Hispanic/Chicano"){
             $scope.raceChildEMP.hispanicLatino += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Multiracial"){
             $scope.raceChildEMP.multiracial += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
           else{
             $scope.raceChildEMP.other += parseInt(responseArray[i].count)
             $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
           }
         }
         else if(responseArray[i].Program =="EMPII"){
           if(responseArray[i].race == "African"){
             $scope.raceChildEMPII.african += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="African American"){
             $scope.raceChildEMPII.africanAmerican += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="American Indian"){
             $scope.raceChildEMPII.americanIndian += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
             $scope.raceChildEMPII.asian += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Caucasian/White"){
             $scope.raceChildEMPII.caucasianWhite += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Hispanic/Chicano"){
             $scope.raceChildEMPII.hispanicLatino += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Multiracial"){
             $scope.raceChildEMPII.multiracial += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
           else{
             $scope.raceChildEMPII.other += parseInt(responseArray[i].count)
             $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
           }
         }
         else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
           if(responseArray[i].race == "African"){
             $scope.raceChildHomeSafe.african += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="African American"){
             $scope.raceChildHomeSafe.africanAmerican += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="American Indian"){
             $scope.raceChildHomeSafe.americanIndian += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
             $scope.raceChildHomeSafe.asian += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Caucasian/White"){
             $scope.raceChildHomeSafe.caucasianWhite += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Hispanic/Chicano"){
             $scope.raceChildHomeSafe.hispanicLatino += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Multiracial"){
             $scope.raceChildHomeSafe.multiracial += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
           else{
             $scope.raceChildHomeSafe.other += parseInt(responseArray[i].count)
             $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
           }
         }
         else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
           if(responseArray[i].race == "African"){
             $scope.raceChildHomeAgain.african += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="African American"){
             $scope.raceChildHomeAgain.africanAmerican += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="American Indian"){
             $scope.raceChildHomeAgain.americanIndian += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
             $scope.raceChildHomeAgain.asian += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Caucasian/White"){
             $scope.raceChildHomeAgain.caucasianWhite += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Hispanic/Chicano"){
             $scope.raceChildHomeAgain.hispanicLatino += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Multiracial"){
             $scope.raceChildHomeAgain.multiracial += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else{
             $scope.raceChildHomeAgain.other += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
         }
         else if(responseArray[i].Program =="Home Front"||responseArray[i].Program =="HomeFront"){
           if(responseArray[i].race == "African"){
             $scope.raceChildHomeAgain.african += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="African American"){
             $scope.raceChildHomeAgain.africanAmerican += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="American Indian"){
             $scope.raceChildHomeAgain.americanIndian += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
             $scope.raceChildHomeAgain.asian += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Caucasian/White"){
             $scope.raceChildHomeAgain.caucasianWhite += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Hispanic/Chicano"){
             $scope.raceChildHomeAgain.hispanicLatino += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else if(responseArray[i].race =="Multiracial"){
             $scope.raceChildHomeAgain.multiracial += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
           else{
             $scope.raceChildHomeAgain.other += parseInt(responseArray[i].count)
             $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
           }
         }
       }//end of for statement
       console.log('results EMP',$scope.raceChildEMP)
       console.log('results EMPII',$scope.raceChildEMPII)
       console.log('raceTotal HomeSafe',$scope.raceChildHomeSafe);
       console.log('raceTotal HomeAgain',$scope.raceChildHomeAgain);
       console.log('raceTotal',$scope.raceChildTotal);
    });//end of childRaceQuery

      //Denny- Complete

    $scope.demoFactory.householdIncome(selections).then(function(response){

      //Earned Income
      $scope.earnedIncomeEMP={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      }
      $scope.earnedIncomeEMPII={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.earnedIncomeHomeSafe={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.earnedIncomeHomeAgain={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.earnedIncomeHomeFront={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };

      //Unearned Income
      $scope.unearnedIncomeEMP={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.unearnedIncomeEMPII={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.unearnedIncomeHomeSafe={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.unearnedIncomeHomeAgain={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.unearnedIncomeHomeFront={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };

      //Total Income Income
      $scope.totalIncomeEMP={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.totalIncomeEMPII={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.totalIncomeHomeSafe={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };
      $scope.totalIncomeHomeAgain={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };

      $scope.totalIncomeHomeFront={
        n0_499:0,
        n500_999:0,
        n1000_1999:0,
        n2000_2999:0,
        n3000_plus:0,
        total:0
      };

        var responseArray = response

        //filter for earnedIncome
        for (var i = 0; i < responseArray.length; i++) {
          // console.log(responseArray[i]);
          if(responseArray[i].Program =="EMP"){
            if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
              $scope.earnedIncomeEMP.n0_499+=1
              $scope.earnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
              $scope.earnedIncomeEMP.n500_999+=1
              $scope.earnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
              $scope.earnedIncomeEMP.n1000_1999+=1
              $scope.earnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
              $scope.earnedIncomeEMP.n2000_2999+=1
              $scope.earnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
              $scope.earnedIncomeEMP.n3000_plus+=1
              $scope.earnedIncomeEMP.total+=1
            }
            else {
              //if null then it means they have no income or $0
              $scope.earnedIncomeEMP.n0_499+=1
              $scope.earnedIncomeEMP.total+=1
            }
          }
            else if(responseArray[i].Program =="EMPII"){
              if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.earnedIncomeEMPII.n0_499+=1
                $scope.earnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.earnedIncomeEMPII.n500_999+=1
                $scope.earnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.earnedIncomeEMPII.n1000_1999+=1
                $scope.earnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.earnedIncomeEMPII.n2000_2999+=1
                $scope.earnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.earnedIncomeEMPII.n3000_plus+=1
                $scope.earnedIncomeEMPII.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.earnedIncomeEMPII.n0_499+=1
                $scope.earnedIncomeEMPII.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
              if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.earnedIncomeHomeSafe.n0_499+=1
                $scope.earnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.earnedIncomeHomeSafe.n500_999+=1
                $scope.earnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.earnedIncomeHomeSafe.n1000_1999+=1
                $scope.earnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.earnedIncomeHomeSafe.n2000_2999+=1
                $scope.earnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.earnedIncomeHomeSafe.n3000_plus+=1
                $scope.earnedIncomeHomeSafe.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.earnedIncomeHomeSafe.n0_499+=1
                $scope.earnedIncomeHomeSafe.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
              if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.earnedIncomeHomeAgain.n0_499+=1
                $scope.earnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.earnedIncomeHomeAgain.n500_999+=1
                $scope.earnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.earnedIncomeHomeAgain.n1000_1999+=1
                $scope.earnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.earnedIncomeHomeAgain.n2000_2999+=1
                $scope.earnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.earnedIncomeHomeAgain.n3000_plus+=1
                $scope.earnedIncomeHomeAgain.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.earnedIncomeHomeAgain.n0_499+=1
                $scope.earnedIncomeHomeAgain.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
              if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.earnedIncomeHomeFront.n0_499+=1
                $scope.earnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.earnedIncomeHomeFront.n500_999+=1
                $scope.earnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.earnedIncomeHomeFront.n1000_1999+=1
                $scope.earnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.earnedIncomeHomeFront.n2000_2999+=1
                $scope.earnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.earnedIncomeHomeFront.n3000_plus+=1
                $scope.earnedIncomeHomeFront.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.earnedIncomeHomeFront.n0_499+=1
                $scope.earnedIncomeHomeFront.total+=1
              }
            }
        }//end of for loop


        //filter for unearnedIncome
        for (var i = 0; i < responseArray.length; i++) {
          // console.log(responseArray[i]);
          if(responseArray[i].Program =="EMP"){
            if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=499){
              $scope.unearnedIncomeEMP.n0_499+=1
              $scope.unearnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=999){
              $scope.unearnedIncomeEMP.n500_999+=1
              $scope.unearnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=1999){
              $scope.unearnedIncomeEMP.n1000_1999+=1
              $scope.unearnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=2999){
              $scope.unearnedIncomeEMP.n2000_2999+=1
              $scope.unearnedIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=3000){
              $scope.unearnedIncomeEMP.n3000_plus+=1
              $scope.unearnedIncomeEMP.total+=1
            }
            else {
              //if null then it means they have no income or $0
              $scope.unearnedIncomeEMP.n0_499+=1
              $scope.unearnedIncomeEMP.total+=1
            }
          }
            else if(responseArray[i].Program =="EMPII"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=499){
                $scope.unearnedIncomeEMPII.n0_499+=1
                $scope.unearnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=999){
                $scope.unearnedIncomeEMPII.n500_999+=1
                $scope.unearnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=1999){
                $scope.unearnedIncomeEMPII.n1000_1999+=1
                $scope.unearnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=2999){
                $scope.unearnedIncomeEMPII.n2000_2999+=1
                $scope.unearnedIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=3000){
                $scope.unearnedIncomeEMPII.n3000_plus+=1
                $scope.unearnedIncomeEMPII.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.unearnedIncomeEMPII.n0_499+=1
                $scope.unearnedIncomeEMPII.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=499){
                $scope.unearnedIncomeHomeSafe.n0_499+=1
                $scope.unearnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=999){
                $scope.unearnedIncomeHomeSafe.n500_999+=1
                $scope.unearnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=1999){
                $scope.unearnedIncomeHomeSafe.n1000_1999+=1
                $scope.unearnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=2999){
                $scope.unearnedIncomeHomeSafe.n2000_2999+=1
                $scope.unearnedIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=3000){
                $scope.unearnedIncomeHomeSafe.n3000_plus+=1
                $scope.unearnedIncomeHomeSafe.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.unearnedIncomeHomeSafe.n0_499+=1
                $scope.unearnedIncomeHomeSafe.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=499){
                $scope.unearnedIncomeHomeAgain.n0_499+=1
                $scope.unearnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=999){
                $scope.unearnedIncomeHomeAgain.n500_999+=1
                $scope.unearnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=1999){
                $scope.unearnedIncomeHomeAgain.n1000_1999+=1
                $scope.unearnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=2999){
                $scope.unearnedIncomeHomeAgain.n2000_2999+=1
                $scope.unearnedIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=3000){
                $scope.unearnedIncomeHomeAgain.n3000_plus+=1
                $scope.unearnedIncomeHomeAgain.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.unearnedIncomeHomeAgain.n0_499+=1
                $scope.unearnedIncomeHomeAgain.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=499){
                $scope.unearnedIncomeHomeFront.n0_499+=1
                $scope.unearnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=999){
                $scope.unearnedIncomeHomeFront.n500_999+=1
                $scope.unearnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=1999){
                $scope.unearnedIncomeHomeFront.n1000_1999+=1
                $scope.unearnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])<=2999){
                $scope.unearnedIncomeHomeFront.n2000_2999+=1
                $scope.unearnedIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])>=3000){
                $scope.unearnedIncomeHomeFront.n3000_plus+=1
                $scope.unearnedIncomeHomeFront.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.unearnedIncomeHomeFront.n0_499+=1
                $scope.unearnedIncomeHomeFront.total+=1
              }
            }
        }//end of for loop for unearned


        //filter for incomeTotals
        for (var i = 0; i < responseArray.length; i++) {

          //remove null values from properties
          if(responseArray[i]['HoH Mthly  Earned Income'] == null){
            responseArray[i]['HoH Mthly  Earned Income']= "0"
          }
          if (responseArray[i]['HoH Mthly UnEarned Incom'] == null){
            responseArray[i]['HoH Mthly UnEarned Incom']= "0"
          }

          if(responseArray[i].Program =="EMP"){
            if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
              $scope.totalIncomeEMP.n0_499+=1
              $scope.totalIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
              $scope.totalIncomeEMP.n500_999+=1
              $scope.totalIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
              $scope.totalIncomeEMP.n1000_1999+=1
              $scope.totalIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
              $scope.totalIncomeEMP.n2000_2999+=1
              $scope.totalIncomeEMP.total+=1
            }
            else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
              $scope.totalIncomeEMP.n3000_plus+=1
              $scope.totalIncomeEMP.total+=1
            }
            else {
              //if null then it means they have no income or $0
              $scope.totalIncomeEMP.n0_499+=1
              $scope.totalIncomeEMP.total+=1
            }
          }
            else if(responseArray[i].Program =="EMPII"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.totalIncomeEMPII.n0_499+=1
                $scope.totalIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.totalIncomeEMPII.n500_999+=1
                $scope.totalIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.totalIncomeEMPII.n1000_1999+=1
                $scope.totalIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.totalIncomeEMPII.n2000_2999+=1
                $scope.totalIncomeEMPII.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.totalIncomeEMPII.n3000_plus+=1
                $scope.totalIncomeEMPII.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.totalIncomeEMPII.n0_499+=1
                $scope.totalIncomeEMPII.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.totalIncomeHomeSafe.n0_499+=1
                $scope.totalIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.totalIncomeHomeSafe.n500_999+=1
                $scope.totalIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.totalIncomeHomeSafe.n1000_1999+=1
                $scope.totalIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.totalIncomeHomeSafe.n2000_2999+=1
                $scope.totalIncomeHomeSafe.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.totalIncomeHomeSafe.n3000_plus+=1
                $scope.totalIncomeHomeSafe.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.totalIncomeHomeSafe.n0_499+=1
                $scope.totalIncomeHomeSafe.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.totalIncomeHomeAgain.n0_499+=1
                $scope.totalIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.totalIncomeHomeAgain.n500_999+=1
                $scope.totalIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.totalIncomeHomeAgain.n1000_1999+=1
                $scope.totalIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.totalIncomeHomeAgain.n2000_2999+=1
                $scope.totalIncomeHomeAgain.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.totalIncomeHomeAgain.n3000_plus+=1
                $scope.totalIncomeHomeAgain.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.totalIncomeHomeAgain.n0_499+=1
                $scope.totalIncomeHomeAgain.total+=1
              }
            }
            else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
              if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
                $scope.totalIncomeHomeFront.n0_499+=1
                $scope.totalIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=500 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=999){
                $scope.totalIncomeHomeFront.n500_999+=1
                $scope.totalIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=1000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=1999){
                $scope.totalIncomeHomeFront.n1000_1999+=1
                $scope.totalIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=2000 && parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=2999){
                $scope.totalIncomeHomeFront.n2000_2999+=1
                $scope.totalIncomeHomeFront.total+=1
              }
              else if(parseInt(responseArray[i]['HoH Mthly UnEarned Incom'])+parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=3000){
                $scope.totalIncomeHomeFront.n3000_plus+=1
                $scope.totalIncomeHomeFront.total+=1
              }
              else {
                //if null then it means they have no income or $0
                $scope.totalIncomeHomeFront.n0_499+=1
                $scope.totalIncomeHomeFront.total+=1
              }
            }
        }//end of FOR loop for totals

        console.log('earnedincome total',$scope.earnedIncomeEMP);
        console.log('earnedincome total',$scope.earnedIncomeEMPII);
        console.log('earnedincome total',$scope.earnedIncomeHomeSafe);
        console.log('earnedincome total',$scope.earnedIncomeHomeAgain);
        console.log('earnedincome total',$scope.earnedIncomeHomeFront);


        console.log('unearnedincome total',$scope.unearnedIncomeEMP);
        console.log('unearnedincome total',$scope.unearnedIncomeEMPII);
        console.log('unearnedincome total',$scope.unearnedIncomeHomeSafe);
        console.log('unearnedincome total',$scope.unearnedIncomeHomeAgain);
        console.log('unearnedincome total',$scope.unearnedIncomeHomeFront);

        console.log('EMP',$scope.totalIncomeEMP);
        console.log('EMPII',$scope.totalIncomeEMPII);
        console.log('Safe',$scope.totalIncomeHomeSafe);
        console.log('Again',$scope.totalIncomeHomeAgain);
        console.log('Front',$scope.totalIncomeHomeFront);
    });//end of householdincome call

    //Denny- Complete

    $scope.demoFactory.lastResidence(selections).then(function(response) {

      $scope.residenceEMP={
        ramsey:0,
        subRamsey:0,
        washington:0,
        hennepin:0,
        subHennepin:0,
        otherMetroC:0,
        outsideTCMetro:0,
        outsideState:0,
        other:0,
        total:0
      };
      $scope.residenceEMPII={
        ramsey:0,
        subRamsey:0,
        washington:0,
        hennepin:0,
        subHennepin:0,
        otherMetroC:0,
        outsideTCMetro:0,
        outsideState:0,
        other:0,
        total:0
      };
      $scope.residenceHomeSafe={
        ramsey:0,
        subRamsey:0,
        washington:0,
        hennepin:0,
        subHennepin:0,
        otherMetroC:0,
        outsideTCMetro:0,
        outsideState:0,
        other:0,
        total:0
      };
      $scope.residenceHomeAgain={
        ramsey:0,
        subRamsey:0,
        washington:0,
        hennepin:0,
        subHennepin:0,
        otherMetroC:0,
        outsideTCMetro:0,
        outsideState:0,
        other:0,
        total:0
      };
      $scope.residenceHomeFront={
        ramsey:0,
        subRamsey:0,
        washington:0,
        hennepin:0,
        subHennepin:0,
        otherMetroC:0,
        outsideTCMetro:0,
        outsideState:0,
        other:0,
        total:0
      };

      $scope.residenceTotal=0;

      var responseArray = response
      for (var i = 0; i < responseArray.length; i++) {
        $scope.residenceTotal += parseInt(responseArray[i].count);
        //emp
        if(responseArray[i].Program == "EMP"){
          if(responseArray[i]['County of Last Residence']=="Ramsey"){
            $scope.residenceEMP.ramsey += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Ramsey"){
            $scope.residenceEMP.subRamsey += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Washington"){
            $scope.residenceEMP.washington += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Hennepin"){
            $scope.residenceEMP.hennepin += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Hennepin"){
            $scope.residenceEMP.subHennepin += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Other Twin Cities Metro"){
            $scope.residenceEMP.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="OutsideTwin Cities Metro"){
            $scope.residenceEMP.outsideTCMetro += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Outside of state"){
            $scope.residenceEMP.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.residenceEMP.other += parseInt(responseArray[i].count)
            $scope.residenceEMP.total += parseInt(responseArray[i].count)
          }
        }
        //empII
        if(responseArray[i].Program == "EMPII"){
          if(responseArray[i]['County of Last Residence']=="Ramsey"){
            $scope.residenceEMPII.ramsey += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Ramsey"){
            $scope.residenceEMPII.subRamsey += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Washington"){
            $scope.residenceEMPII.washington += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Hennepin"){
            $scope.residenceEMPII.hennepin += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Hennepin"){
            $scope.residenceEMPII.subHennepin += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Other Twin Cities Metro"){
            $scope.residenceEMPII.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="OutsideTwin Cities Metro"){
            $scope.residenceEMPII.outsideTCMetro += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Outside of state"){
            $scope.residenceEMPII.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.residenceEMPII.other += parseInt(responseArray[i].count)
            $scope.residenceEMPII.total += parseInt(responseArray[i].count)
          }
        }

        //homesafe
        else if(responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
          if(responseArray[i]['County of Last Residence']=="Ramsey"){
            $scope.residenceHomeSafe.ramsey += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Ramsey"){
            $scope.residenceHomeSafe.subRamsey += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Washington"){
            $scope.residenceHomeSafe.washington += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Hennepin"){
            $scope.residenceHomeSafe.hennepin += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Hennepin"){
            $scope.residenceHomeSafe.subHennepin += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Other Twin Cities Metro"){
            $scope.residenceHomeSafe.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="OutsideTwin Cities Metro"){
            $scope.residenceHomeSafe.outsideTCMetro += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Outside of state"){
            $scope.residenceHomeSafe.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.residenceHomeSafe.other += parseInt(responseArray[i].count)
            $scope.residenceHomeSafe.total += parseInt(responseArray[i].count)
          }
        }

        //homeAgain
        else if(responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again"){
          if(responseArray[i]['County of Last Residence']=="Ramsey"){
            $scope.residenceHomeAgain.ramsey += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Ramsey"){
            $scope.residenceHomeAgain.subRamsey += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Washington"){
            $scope.residenceHomeAgain.washington += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Hennepin"){
            $scope.residenceHomeAgain.hennepin += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Hennepin"){
            $scope.residenceHomeAgain.subHennepin += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Other Twin Cities Metro"){
            $scope.residenceHomeAgain.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="OutsideTwin Cities Metro"){
            $scope.residenceHomeAgain.outsideTCMetro += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Outside of state"){
            $scope.residenceHomeAgain.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.residenceHomeAgain.other += parseInt(responseArray[i].count)
            $scope.residenceHomeAgain.total += parseInt(responseArray[i].count)
          }
        }
        //homefront
        else if(responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front"){
          if(responseArray[i]['County of Last Residence']=="Ramsey"){
            $scope.residenceHomeFront.ramsey += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Ramsey"){
            $scope.residenceHomeFront.subRamsey += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Washington"){
            $scope.residenceHomeFront.washington += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Hennepin"){
            $scope.residenceHomeFront.hennepin += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Suburban Hennepin"){
            $scope.residenceHomeFront.subHennepin += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Other Twin Cities Metro"){
            $scope.residenceHomeFront.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="OutsideTwin Cities Metro"){
            $scope.residenceHomeFront.outsideTCMetro += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]['County of Last Residence']=="Outside of state"){
            $scope.residenceHomeFront.otherMetroC += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.residenceHomeFront.other += parseInt(responseArray[i].count)
            $scope.residenceHomeFront.total += parseInt(responseArray[i].count)
          }
        }
      }//end of for statement
      console.log('residenceEMP',$scope.residenceEMP);
      console.log('residenceEMPII',$scope.residenceEMPII);
      console.log('residenceHomeSafe',$scope.residenceHomeSafe);
      console.log('residenceHomeAgain',$scope.residenceHomeAgain);
      console.log('residenceHomeFront',$scope.residenceHomeFront);
      console.log('Total',$scope.residenceTotal);

    });//end of lastResidence request

    // //Denny Complete
    $scope.demoFactory.famsExitHousing(selections).then(function(response) {
      console.log("response famsExitHousing: ", response);

      $scope.exitEMP = {
        graduated:0,
        leftVoluntarily:0,
        terminated:0,
        other:0,
        total:0
      };

      $scope.exitEMPII = {
        graduated:0,
        leftVoluntarily:0,
        terminated:0,
        other:0,
        total:0
      };

      $scope.exitHomeSafe = {
        graduated:0,
        leftVoluntarily:0,
        terminated:0,
        other:0,
        total:0
      };

      $scope.exitHomeAgain = {
        graduated:0,
        leftVoluntarily:0,
        terminated:0,
        other:0,
        total:0
      };

      $scope.exitHomeFront = {
        graduated:0,
        leftVoluntarily:0,
        terminated:0,
        other:0,
        total:0
      };

      $scope.exitTotal = 0;

      var responseArray = response

      for (var i = 0; i < responseArray.length; i++) {
        $scope.exitTotal+= parseInt(responseArray[i].count)
        if (responseArray[i].Program== "EMP"){
          if(responseArray[i]["Reason for Leaving"]=="Completed program" ||responseArray[i]["Reason for Leaving"]== "Completed program;Other"){
            $scope.exitEMP.graduated += parseInt(responseArray[i].count)
            $scope.exitEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Left for housing opportunity before completing the program" ||responseArray[i]["Reason for Leaving"]== "Reached maximum time allowed"){
            $scope.exitEMP.leftVoluntarily += parseInt(responseArray[i].count)
            $scope.exitEMP.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Non-compliance w/program" ||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence"||responseArray[i]["Reason for Leaving"]== "Disagreement with rules/persons;Other"||responseArray[i]["Reason for Leaving"]== " Criminal activity/violence;Non-compliance w/program"||responseArray[i]["Reason for Leaving"]== "Non-compliance w/program;Other_____________________________________________"||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence;Non-compliance w/program"){
            $scope.exitEMP.terminated += parseInt(responseArray[i].count)
            $scope.exitEMP.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.exitEMP.other += parseInt(responseArray[i].count)
            $scope.exitEMP.total += parseInt(responseArray[i].count)
          }
        }

        else if (responseArray[i].Program== "EMPII"){
          if(responseArray[i]["Reason for Leaving"]=="Completed program" ||responseArray[i]["Reason for Leaving"]== "Completed program;Other"){
            $scope.exitEMPII.graduated += parseInt(responseArray[i].count)
            $scope.exitEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Left for housing opportunity before completing the program" ||responseArray[i]["Reason for Leaving"]== "Reached maximum time allowed"){
            $scope.exitEMPII.leftVoluntarily += parseInt(responseArray[i].count)
            $scope.exitEMPII.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Non-compliance w/program" ||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence"||responseArray[i]["Reason for Leaving"]== "Disagreement with rules/persons;Other"||responseArray[i]["Reason for Leaving"]== " Criminal activity/violence;Non-compliance w/program"||responseArray[i]["Reason for Leaving"]== "Non-compliance w/program;Other_____________________________________________"||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence;Non-compliance w/program"){
            $scope.exitEMPII.terminated += parseInt(responseArray[i].count)
            $scope.exitEMPII.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.exitEMPII.other += parseInt(responseArray[i].count)
            $scope.exitEMPII.total += parseInt(responseArray[i].count)
          }
        }

        else if (responseArray[i].Program== "HomeSafe"||responseArray[i].Program== "Home Safe"){
          if(responseArray[i]["Reason for Leaving"]=="Completed program" ||responseArray[i]["Reason for Leaving"]== "Completed program;Other"){
            $scope.exitHomeSafe.graduated += parseInt(responseArray[i].count)
            $scope.exitHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Left for housing opportunity before completing the program" ||responseArray[i]["Reason for Leaving"]== "Reached maximum time allowed"){
            $scope.exitHomeSafe.leftVoluntarily += parseInt(responseArray[i].count)
            $scope.exitHomeSafe.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Non-compliance w/program" ||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence"||responseArray[i]["Reason for Leaving"]== "Disagreement with rules/persons;Other"||responseArray[i]["Reason for Leaving"]== " Criminal activity/violence;Non-compliance w/program"||responseArray[i]["Reason for Leaving"]== "Non-compliance w/program;Other_____________________________________________"||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence;Non-compliance w/program"){
            $scope.exitHomeSafe.terminated += parseInt(responseArray[i].count)
            $scope.exitHomeSafe.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.exitHomeSafe.other += parseInt(responseArray[i].count)
            $scope.exitHomeSafe.total += parseInt(responseArray[i].count)
          }
        }

        else if (responseArray[i].Program== "HomeAgain"||responseArray[i].Program== "Home Again"){
          if(responseArray[i]["Reason for Leaving"]=="Completed program" ||responseArray[i]["Reason for Leaving"]== "Completed program;Other"){
            $scope.exitHomeAgain.graduated += parseInt(responseArray[i].count)
            $scope.exitHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Left for housing opportunity before completing the program" ||responseArray[i]["Reason for Leaving"]== "Reached maximum time allowed"){
            $scope.exitHomeAgain.leftVoluntarily += parseInt(responseArray[i].count)
            $scope.exitHomeAgain.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Non-compliance w/program" ||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence"||responseArray[i]["Reason for Leaving"]== "Disagreement with rules/persons;Other"||responseArray[i]["Reason for Leaving"]== " Criminal activity/violence;Non-compliance w/program"||responseArray[i]["Reason for Leaving"]== "Non-compliance w/program;Other_____________________________________________"||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence;Non-compliance w/program"){
            $scope.exitHomeAgain.terminated += parseInt(responseArray[i].count)
            $scope.exitHomeAgain.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.exitHomeAgain.other += parseInt(responseArray[i].count)
            $scope.exitHomeAgain.total += parseInt(responseArray[i].count)
          }
        }

        else if (responseArray[i].Program== "HomeFront"||responseArray[i].Program== "Home Front"){
          if(responseArray[i]["Reason for Leaving"]=="Completed program" ||responseArray[i]["Reason for Leaving"]== "Completed program;Other"){
            $scope.exitHomeFront.graduated += parseInt(responseArray[i].count)
            $scope.exitHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Left for housing opportunity before completing the program" ||responseArray[i]["Reason for Leaving"]== "Reached maximum time allowed"){
            $scope.exitHomeFront.leftVoluntarily += parseInt(responseArray[i].count)
            $scope.exitHomeFront.total += parseInt(responseArray[i].count)
          }
          else if(responseArray[i]["Reason for Leaving"]=="Non-compliance w/program" ||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence"||responseArray[i]["Reason for Leaving"]== "Disagreement with rules/persons;Other"||responseArray[i]["Reason for Leaving"]== " Criminal activity/violence;Non-compliance w/program"||responseArray[i]["Reason for Leaving"]== "Non-compliance w/program;Other_____________________________________________"||responseArray[i]["Reason for Leaving"]== "Criminal activity/violence;Non-compliance w/program"){
            $scope.exitHomeFront.terminated += parseInt(responseArray[i].count)
            $scope.exitHomeFront.total += parseInt(responseArray[i].count)
          }
          else{
            $scope.exitHomeFront.other += parseInt(responseArray[i].count)
            $scope.exitHomeFront.total += parseInt(responseArray[i].count)
          }
        }
      }//end for for loop
      console.log('test EMP', $scope.exitEMP);
      console.log('test EMPII', $scope.exitEMPII);
      console.log('test Safe', $scope.exitHomeSafe);
      console.log('test Again', $scope.exitHomeAgain);
      console.log('test Front', $scope.exitHomeFront);
      console.log('TOTAL', $scope.exitTotal);
    });//end of famsExitHousing

}; //end of click button function

    /// filters through age parameters and converts them to date ranges for queries to be sent to server:
    function ageParams(selectedAgeRanges, endDate) {
        console.log("selectedAgeRanges: ", selectedAgeRanges);
        console.log("endDate: ", endDate);
        var endYear = endDate.getFullYear();
        var endMonth = endDate.getMonth();
        var endDate = endDate.getDate();
        var arrayOfDateRanges = [];

        selectedAgeRanges.forEach(function(range, i) {
            var rangeDates = {};
            if(range.indexOf("-") == 2) {
                var agesArray = range.split("-");
                var firstYear = parseInt(agesArray[0]);
                var secondYear = parseInt(agesArray[1]);
                var year1Math = endYear - firstYear;
                var year2Math = endYear - secondYear;
                var dateRange1 = (year1Math + "-" + endMonth + "-" + endDate);
                var dateRange2 = (year2Math + "-" + endMonth + "-" + endDate);

                rangeDates = {
                    ageRange: range,
                    date1Range: dateRange1,
                    date2Range: dateRange2,
                };
                arrayOfDateRanges.push(rangeDates);
            }
            if(range.indexOf("+") == 2) {
                var ages2Array = range.split("+");
                var firstYear = parseInt(ages2Array[0]);
                var year1Math = endYear - firstYear;
                var dateRange1 = (year1Math + "-" + endMonth + "-" + endDate);

                rangeDates = {
                    ageRange: range,
                    date1Range: dateRange1,
                    date2Range: ""
                }
                arrayOfDateRanges.push(rangeDates);
            }
        });

        return arrayOfDateRanges;
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
  


    $scope.exportData = function () {
      var blob = new Blob([document.getElementById('exportable').innerHTML], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
      saveAs(blob, "Solid_Ground_Report.xls");
    };

  $scope.tests = [{
    "Name": "HomeFront",
    "Date": "10/02/2014",
    "Race": ["African", "White", "Asian"]
  }, {
    "Name": "Home Safe",
    "Date": "10/02/2014",
    "Race": ["Others", "Latinos", "African America"]
  }];

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
    };

// end controller
}]);
