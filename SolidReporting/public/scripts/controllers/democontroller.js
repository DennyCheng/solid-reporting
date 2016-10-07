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

    // Denny function-Complete
    // $scope.demoFactory.dobAdults(selections).then(function(response){
    //   //------------------Birthday Logic--------------------------
    //   var responseArray = response;
    //
    //   $scope.dobEMP = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0,
    //     total:0
    //   };
    //   $scope.dobEMPII= {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0,
    //     total:0
    //   };
    //   $scope.dobHomeSafe = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0,
    //     total:0
    //   };
    //   $scope.dobHomeAgain = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0,
    //     total:0
    //   };
    //   $scope.dobHomeFront = {
    //     age18to22:0,
    //     age23to30:0,
    //     age31to40:0,
    //     age41to54:0,
    //     age55to64:0,
    //     age65tobeyond:0,
    //     total:0
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
    //       $scope.dobEMP.age18to22+=1;
    //       $scope.dobEMP.total+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       // console.log("hit the 23-30 for",responseArray[i])
    //       $scope.dobEMP.age23to30+=1;
    //       $scope.dobEMP.total+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       // console.log("hit the 31-40 for",responseArray[i])
    //       $scope.dobEMP.age31to40+=1;
    //       $scope.dobEMP.total+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       // console.log("hit the 41-54 fsor",responseArray[i])
    //       $scope.dobEMP.age41to54+=1;
    //       $scope.dobEMP.total+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       // console.log("hit the 55-64 for",responseArray[i])
    //       $scope.dobEMP.age55to64+=1;
    //       $scope.dobEMP.total+=1;
    //       }
    //       else if(age >=65){
    //       // console.log("hit the 65+ for",responseArray[i])
    //       $scope.dobEMP.age65tobeyond+=1;
    //       $scope.dobEMP.total+=1;
    //       }
    //     }//end of EMP if
    //     else if(responseArray[i].Program == "EMPII"){
    //       if(age <= 22){
    //       $scope.dobEMPII.age18to22+=1;
    //       $scope.dobEMPII.total+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       $scope.dobEMPII.age23to30+=1;
    //       $scope.dobEMPII.total+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       $scope.dobEMPII.age31to40+=1;
    //       $scope.dobEMPII.total+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       $scope.dobEMPII.age41to54+=1;
    //       $scope.dobEMPII.total+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       $scope.dobEMPII.age55to64+=1;
    //       $scope.dobEMPII.total+=1;
    //       }
    //       else if(age >=65){
    //       $scope.dobEMPII.age65tobeyond+=1;
    //       $scope.dobEMPII.total+=1;
    //       }
    //     }
    //     else if(responseArray[i].Program == "HomeSafe"){
    //       if(age <= 22){
    //       $scope.dobHomeSafe.age18to22+=1;
    //       $scope.dobHomeSafe.total+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       $scope.dobHomeSafe.age23to30+=1;
    //       $scope.dobHomeSafe.total+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       $scope.dobHomeSafe.age31to40+=1;
    //       $scope.dobHomeSafe.total+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       $scope.dobHomeSafe.age41to54+=1;
    //       $scope.dobHomeSafe.total+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       $scope.dobHomeSafe.age55to64+=1;
    //       $scope.dobHomeSafe.total+=1;
    //       }
    //       else if(age >=65){
    //       $scope.dobHomeSafe.age65tobeyond+=1;
    //       $scope.dobHomeSafe.total+=1;
    //       }
    //     }
    //     else if(responseArray[i].Program == "Home Again"){
    //       if(age <= 22){
    //       $scope.dobHomeAgain.age18to22+=1;
    //       $scope.dobHomeAgain.total+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       $scope.dobHomeAgain.age23to30+=1;
    //       $scope.dobHomeAgain.total+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       $scope.dobHomeAgain.age31to40+=1;
    //       $scope.dobHomeAgain.total+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       $scope.dobHomeAgain.age41to54+=1;
    //       $scope.dobHomeAgain.total+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       $scope.dobHomeAgain.age55to64+=1;
    //       $scope.dobHomeAgain.total+=1;
    //       }
    //       else if(age >=65){
    //       $scope.dobHomeAgain.age65tobeyond+=1;
    //       $scope.dobHomeAgain.total+=1;
    //       }
    //     }
    //     else if(responseArray[i].Program == "Home Front" || responseArray[i].Program == "HomeFront"){//need to make sure on spelling on DB since we have no data with the name (Home Front or HomeFront)
    //       if(age <= 22){
    //       $scope.dobHomeFront.age65tobeyond+=1;
    //       $scope.dobHomeFront.total+=1;
    //       }
    //       else if(age <=30 && age >= 23){
    //       $scope.dobHomeFront.age65tobeyond+=1;
    //       $scope.dobHomeFront.total+=1;
    //       }
    //       else if(age <=40 && age >= 31){
    //       $scope.dobHomeFront.age65tobeyond+=1;
    //       $scope.dobHomeFront.total+=1;
    //       }
    //       else if(age <=54 && age >= 41){
    //       $scope.dobHomeFront.age65tobeyond+=1;
    //       $scope.dobHomeFront.total+=1;
    //       }
    //       else if(age <=64 && age >= 55){
    //       $scope.dobHomeFront.age65tobeyond+=1;
    //       $scope.dobHomeFront.total+=1;
    //       }
    //       else if(age >=65){
    //       $scope.dobHomeFront.age65tobeyond+=1;
    //       $scope.dobHomeFront.total+=1;
    //       }
    //     }
    //   }//end of for statement
    //   //these check for the objects to have values(these total values hsould equal response.length)
    //   console.log('emp test',$scope.dobEMP);
    //   console.log('empII test',$scope.dobEMPII);
    //   console.log('homeSafe test',$scope.dobHomeSafe);
    //   console.log('homeFront test',$scope.dobHomeFront);
    //   console.log('homeAgain test',$scope.dobHomeAgain);
    //   console.log("response length: ", response.length);
    //   // console.log("response.data: ", response.data);//this is the giant array response
    // // console.log("selections: ", selections);
    // });//ends dobAdults call

    // // Come back for this last (logic is hard)
    // $scope.demoFactory.dobChildren(selections).then(function(response) {
    //   // console.log("response dobChildren: ", response);
    // });//end of dobChildren call
    //
    // //Jerry- Incomplete
    // $scope.demoFactory.totalPeople(selections).then(function(response) {
    //   // console.log("response totalPeople: ", response)
    // });
    //
    // //Jerry- Incomplete
    // $scope.demoFactory.allGender(selections).then(function(response) {
    //   // console.log("response allGender: ", response);
    // });
    //
    // //Jerry- Incomplete
    // $scope.demoFactory.raceAdults(selections).then(function(response) {
    //   // console.log("response raceAdults: ", response);
    // });

    // Denny- Complete
    // $scope.demoFactory.raceChildren(selections).then(function(response) {
    //   console.log("response raceChildren from server: ", response);
    //    var responseArray = response;
    //
    //    $scope.raceChildEMP = {
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
    //    $scope.raceChildEMPII = {
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
    //    $scope.raceChildHomeSafe = {
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
    //    $scope.raceChildHomeAgain = {
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
    //    $scope.raceChildHomeFront = {
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
    //   $scope.raceChildTotal = 0;
    //
    //
    //    for (var i = 0; i < responseArray.length; i++) {
    //      $scope.raceChildTotal += parseInt(responseArray[i].count)
    //      console.log(responseArray[i]);
    //      if(responseArray[i].Program =="EMP"){
    //        if(responseArray[i].race == "African"){
    //          $scope.raceChildEMP.african += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          $scope.raceChildEMP.africanAmerican += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          $scope.raceChildEMP.americanIndian += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          $scope.raceChildEMP.asian += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          $scope.raceChildEMP.caucasianWhite += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          $scope.raceChildEMP.hispanicLatino += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          $scope.raceChildEMP.multiracial += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          $scope.raceChildEMP.other += parseInt(responseArray[i].count)
    //          $scope.raceChildEMP.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="EMPII"){
    //        if(responseArray[i].race == "African"){
    //          $scope.raceChildEMPII.african += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          $scope.raceChildEMPII.africanAmerican += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          $scope.raceChildEMPII.americanIndian += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          $scope.raceChildEMPII.asian += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          $scope.raceChildEMPII.caucasianWhite += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          $scope.raceChildEMPII.hispanicLatino += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          $scope.raceChildEMPII.multiracial += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          $scope.raceChildEMPII.other += parseInt(responseArray[i].count)
    //          $scope.raceChildEMPII.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
    //        if(responseArray[i].race == "African"){
    //          $scope.raceChildHomeSafe.african += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          $scope.raceChildHomeSafe.africanAmerican += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          $scope.raceChildHomeSafe.americanIndian += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          $scope.raceChildHomeSafe.asian += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          $scope.raceChildHomeSafe.caucasianWhite += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          $scope.raceChildHomeSafe.hispanicLatino += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          $scope.raceChildHomeSafe.multiracial += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          $scope.raceChildHomeSafe.other += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeSafe.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
    //        if(responseArray[i].race == "African"){
    //          $scope.raceChildHomeAgain.african += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          $scope.raceChildHomeAgain.africanAmerican += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          $scope.raceChildHomeAgain.americanIndian += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          $scope.raceChildHomeAgain.asian += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          $scope.raceChildHomeAgain.caucasianWhite += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          $scope.raceChildHomeAgain.hispanicLatino += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          $scope.raceChildHomeAgain.multiracial += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          $scope.raceChildHomeAgain.other += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //      else if(responseArray[i].Program =="Home Front"||responseArray[i].Program =="HomeFront"){
    //        if(responseArray[i].race == "African"){
    //          $scope.raceChildHomeAgain.african += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="African American"){
    //          $scope.raceChildHomeAgain.africanAmerican += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="American Indian"){
    //          $scope.raceChildHomeAgain.americanIndian += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Asian/SE Asian/Pacific Islander"){
    //          $scope.raceChildHomeAgain.asian += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Caucasian/White"){
    //          $scope.raceChildHomeAgain.caucasianWhite += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Hispanic/Chicano"){
    //          $scope.raceChildHomeAgain.hispanicLatino += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else if(responseArray[i].race =="Multiracial"){
    //          $scope.raceChildHomeAgain.multiracial += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //        else{
    //          $scope.raceChildHomeAgain.other += parseInt(responseArray[i].count)
    //          $scope.raceChildHomeAgain.totalCount += parseInt(responseArray[i].count)
    //        }
    //      }
    //    }//end of for statement
    //    console.log('results EMP',$scope.raceChildEMP)
    //    console.log('results EMPII',$scope.raceChildEMPII)
    //    console.log('raceTotal HomeSafe',$scope.raceChildHomeSafe);
    //    console.log('raceTotal HomeAgain',$scope.raceChildHomeAgain);
    //    console.log('raceTotal',$scope.raceChildTotal);
    // });//end of childRaceQuery

    // Denny- WIP
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

      };
      $scope.unearnedIncomeEMPII={

      };
      $scope.unearnedIncomeHomeSafe={

      };
      $scope.unearnedIncomeHomeAgain={

      };
      $scope.unearnedIncomeHomeFront={

      };

      //Total Income Income
      $scope.totalIncomeEMP={

      };
      $scope.totalIncomeEMPII={

      };
      $scope.totalIncomeHomeSafe={

      };
      $scope.totalIncomeHomeAgain={

      };

      $scope.totalIncomeHomeFront={

      };

      console.log("response householdIncome: ", response);
         var responseArray = response
        for (var i = 0; i < responseArray.length; i++) {
          // console.log(responseArray[i]);
          if(responseArray[i].Program =="EMP"){
            console.log(parseInt(responseArray[i]['HoH Mthly  Earned Income']));
            if(parseInt(responseArray[i]['HoH Mthly  Earned Income'])>=0 && parseInt(responseArray[i]['HoH Mthly  Earned Income'])<=499){
              console.log('below 499',responseArray[i]);
              $scope.earnedIncomeEMP.n0_499+=1
              $scope.total+=1
            }

          }

        }//end of for loop
        console.log('earnedincome total',$scope.earnedIncomeEMP);
    });//end of householdincome call

    // //Denny- Incomplete
    // $scope.demoFactory.lastResidence(selections).then(function(response) {
    //   // console.log("response lastResidence: ", response);
    // });//end of lastResidence
    //
    // //Denny- Incomplete
    // $scope.demoFactory.famsExitHousing(selections).then(function(response) {
    //   // console.log("response famsExitHousing: ", response);
    // });//end of famsExitHousing

}//end of click button function





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
