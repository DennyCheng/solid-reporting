myApp.controller("DemoController", ["$scope",'$http','DataFactory', '$location', 'DemoFactory', function ($scope, $http, DataFactory, $location, DemoFactory) {
  console.log("hello from demoController");
    var races = [];
    var residences = [];
    $scope.dataFactory = DataFactory;
    $scope.dataFactory.currentSess();
    $scope.userName = $scope.dataFactory.varUsername();
    $scope.demoFactory = DemoFactory;
    var dates;

    //----GET Massive Data ----------------------------------------------
    showData();
    function showData() {

        $scope.demoFactory.retrieveData().then(function(response) {
            $scope.data = response;
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


  //----- Dropdowns --------------------------------
  $scope.genders = ['Female', 'Male'];

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


  //----- Dropdowns --------------------------------
  $scope.genders = ['Female', 'Male'];


  //----- Dropdowns -------------------------------------------------


  var races = ['African', 'African American', 'American Indian' ,'Asian/SE Asian/Pacific Islander', 'Caucasian/White', 'Hispanic/Latino', 'Multiracial', 'Other'];

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
      + "Adult Age: " + $scope.selectedadultAge)

    // $http.get('/demoquery').then(function(response) {
    // console.log('data', response.data);
    // $scope.data = response.data;
    // });
    console.log("$scope.startdate newQuery: ", $scope.startdate);
    console.log("$scope.enddate newQuery: ", $scope.enddate);
    dates = {
      startdate: $scope.startdate,
      enddate: $scope.enddate
    }
    $scope.demoFactory.getDemo(dates).then(function(response) {

      //------------------Birthday Logic--------------------------
      var responseArray = response;
      var emp = {
        age18to22:0,
        age23to30:0,
        age31to40:0,
        age41to54:0,
        age55to64:0,
        age65tobeyond:0,
      };
      var empII= [];
      var homeSafe = [];
      var homeFront = [];
      var homeAgain = [];

      for (var i = 0; i < responseArray.length; i++) {
        responseArray[i]['Date of Birth'] = responseArray[i]['Date of Birth'].slice(0,10);//removes excess texts from DOB
        var personDOB = new Date(responseArray[i]['Date of Birth']); //reformats persons DOB
        var age = dateDiff(personDOB,$scope.enddate);//comparing persons DOB with selected end date
        console.log('age', age);
        console.log(responseArray[i].Program);//able to access individaul persons age and program to sort

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
        }

      }//end of for statement
      console.log('emp test',emp);
      console.log("response length: ", response.length);
      // console.log("response.data: ", response.data);//this is the giant array response
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
