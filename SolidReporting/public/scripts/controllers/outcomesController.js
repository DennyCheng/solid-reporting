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
      console.log("selected programs: ", $scope.selectedprogram);
  };


//------ Outcomes Checkboxes -------------------------------------------------------


  $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];


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

    $scope.firstOfTheYear = '';

    $scope.newQuery = function () {

        var justStartYear = $scope.startdate.getFullYear();

        $scope.firstOfTheYear = justStartYear + '-1-1';

        console.log("This is the data at the first of the year", $scope.firstOfTheYear);

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
            enddate: $scope.enddate,
            firstDayOfTheYear: $scope.firstOfTheYear
        };


        console.log("Program: " + $scope.selectedprogram + "\n"
            + "Outcome: " + $scope.selectedoutcome);


        // $scope.outcomeFactory.houseStabil(selections).then(function(response) {
        //     console.log("response houseStabil: ", response);
        //     $scope.houseEMP={
        //         reside6:0,
        //         reside1year: 0,
        //         achieveStability:0,
        //         exited:0,
        //         entered:0,
        //         securePermanent:0,
        //         other:0,
        //         total:0
        //     };
        //
        //     $scope.houseEMPII={
        //         reside6:0,
        //         reside1year: 0,
        //         achieveStability:0,
        //         exited:0,
        //         entered:0,
        //         securePermanent:0,
        //         other:0,
        //         total:0
        //     };
        //
        //     $scope.houseHomeSafe={
        //         reside6:0,
        //         reside1year: 0,
        //         achieveStability:0,
        //         exited:0,
        //         entered:0,
        //         securePermanent:0,
        //         other:0,
        //         total:0
        //     };
        //
        //     $scope.houseHomeAgain={
        //         reside6:0,
        //         reside1year: 0,
        //         achieveStability:0,
        //         exited:0,
        //         entered:0,
        //         securePermanent:0,
        //         other:0,
        //         total:0
        //     };
        //
        //     $scope.houseHomeFront={
        //         reside6:0,
        //         reside1year: 0,
        //         achieveStability:0,
        //         exited:0,
        //         entered:0,
        //         securePermanent:0,
        //         other:0,
        //         total:0
        //     };
        //
        //     var responseArray = response
        //
        //     for (var i = 0; i < responseArray.length; i++) {
        //         // console.log(responseArray[i]["Achieve Housing Stability"])
        //         if(responseArray[i].Program == "EMP"){
        //             if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseEMP.reside6 += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseEMP.reside1year += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
        //                 $scope.houseEMP.achieveStability += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
        //                 $scope.houseEMP.exited += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseEMP.exited += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
        //                 $scope.houseEMP.securePermanent += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
        //                 $scope.houseEMP.entered += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
        //                 $scope.houseEMP.entered += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //             else {
        //                 $scope.houseEMP.other += parseInt(responseArray[i].count);
        //                 $scope.houseEMP.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         if(responseArray[i].Program == "EMPII"){
        //             if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseEMPII.reside6 += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseEMPII.reside1year += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
        //                 $scope.houseEMPII.achieveStability += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
        //                 $scope.houseEMPII.exited += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseEMPII.exited += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
        //                 $scope.houseEMPII.securePermanent += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
        //                 $scope.houseEMPII.entered += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
        //                 $scope.houseEMPII.entered += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else {
        //                 // console.log(responseArray[i]["Achieve Housing Stability"]);
        //                 $scope.houseEMPII.other += parseInt(responseArray[i].count);
        //                 $scope.houseEMPII.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         if(responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe" ){
        //             if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeSafe.reside6 += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseHomeSafe.reside1year += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeSafe.achieveStability += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
        //                 $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
        //                 $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeSafe.securePermanent += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
        //                 $scope.houseHomeSafe.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
        //                 $scope.houseHomeSafe.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else {
        //                 console.log(responseArray[i]["Achieve Housing Stability"]);
        //                 $scope.houseHomeSafe.other += parseInt(responseArray[i].count);
        //                 $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         else if(responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again" ){
        //             if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeAgain.reside6 += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseHomeAgain.reside1year += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeAgain.achieveStability += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
        //                 $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
        //                 $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeAgain.securePermanent += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
        //                 $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing at least 6 months;Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else {
        //                 $scope.houseHomeAgain.other += parseInt(responseArray[i].count);
        //                 $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         else if(responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front" ){
        //             if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeFront.reside6 += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseHomeFront.reside1year += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeFront.achieveStability += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
        //                 $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
        //                 $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
        //                 $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeFront.securePermanent += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
        //                 $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing at least 6 months;Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
        //                 $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else {
        //                 console.log('fuck',responseArray[i]["Achieve Housing Stability"]);
        //                 $scope.houseHomeFront.other += parseInt(responseArray[i].count);
        //                 $scope.houseHomeFront.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //     }//end of for statement
        //     console.log('this is the TESTEMP',$scope.houseEMP);
        //     console.log('this is the TESTEMPII',$scope.houseEMPII);
        //     console.log('this is the HomeSafe',$scope.houseHomeSafe);
        //     console.log('this is the HomeAGain',$scope.houseHomeAgain);
        //     console.log('this is the HomeFront',$scope.houseHomeFront);
        // });  // end of houseStabil
        //Completed

        // $scope.outcomeFactory.adultEduAdv(selections).then(function(response) {
        //     // console.log("response adultEduAdv: ", response);
        //     var data = response;
        //     console.log('data response adultEdu', data);
        //     for (var i = 0; i < data.length; i++) {
        //
        //         // EMP PROGRAM Education
        //         $scope.empAdult = {
        //             complete: 0,
        //             continue: 0,
        //             enrolled: 0,
        //             dropout: 0,
        //             total: 0
        //         };
        //
        //         if(data[i].Program === 'EMP') {
        //             // Adult Completed Education
        //             if(data[i]['Adult Edu Adv'] === "Completed Education/Training") {
        //                 $scope.empAdult.complete += parseInt(data[i].count);
        //             }
        //             if ($scope.empAdult.complete === undefined ) {
        //                 $scope.empAdult.complete = 0;
        //             }
        //             console.log('emp adult complete', $scope.empAdult.complete);
        //
        //             // Adult Continue Education
        //             if(data[i]['Adult Edu Adv'] === "Continue Education or Training") {
        //                 $scope.empAdult.continue += parseInt(data[i].count);
        //             }
        //             if ($scope.empAdult.continue === undefined ) {
        //                 $scope.empAdult.continue = 0;
        //             }
        //             console.log('emp adult continue', $scope.empAdult.continue);
        //
        //             // Adult Dropout
        //             if(data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
        //                 $scope.empAdult.dropout += parseInt(data[i].count);
        //             }
        //             if ($scope.empAdult.dropout === undefined ) {
        //                 $scope.empAdult.dropout = 0;
        //             }
        //             console.log('emp adult Dropped', $scope.empAdult.dropout);
        //
        //             // Adult Enrolled
        //             if(data[i]['Adult Edu Adv'] === "Enrolled in education") {
        //                 $scope.empAdult.enrolled += parseInt(data[i].count);
        //             }
        //             if ($scope.empAdult.enrolled  === undefined ) {
        //                 $scope.empAdult.enrolled = 0;
        //             }
        //             console.log('emp adult enrolled', $scope.empAdult.enrolled);
        //
        //             // EMP TOTAL
        //             $scope.empAdult.total = $scope.empAdult.complete + $scope.empAdult.continue + $scope.empAdult.dropout + $scope.empAdult.enrolled;
        //             console.log('emp total', $scope.empAdult.total);
        //         } // END OF EMP
        //
        //         // EMPII PROGRAM Education
        //         $scope.emp2Adult = {
        //             complete: 0,
        //             continue: 0,
        //             enrolled: 0,
        //             dropout: 0,
        //             total: 0
        //         };
        //
        //         if(data[i].Program === 'EMPII') {
        //             console.log(' emp2 program',data[i]['Adult Edu Adv'] );
        //             // Adult Completed Education
        //             if(data[i]['Adult Edu Adv'] === "Completed Education/Training") {
        //                 var emp2Adcom = parseInt(data[i].count);
        //                 $scope.emp2Adult.complete += emp2Adcom;
        //             }
        //             if (emp2Adcom === undefined ) {
        //                 emp2Adcom = 0;
        //             }
        //             console.log('emp2 adult complete', $scope.emp2Adult.complete);
        //
        //             // Adult Continue Education
        //             if(data[i]['Adult Edu Adv'] === "Continue Education or Training") {
        //                 var emp2Adcon = parseInt(data[i].count);
        //                 $scope.emp2Adult.continue = emp2Adcon;
        //             }
        //             if (emp2Adcon === undefined ) {
        //                 emp2Adcon = 0;
        //             }
        //             console.log('emp2 adult continue', $scope.emp2Adult.continue);
        //
        //             // Adult Dropout
        //             if(data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
        //                 var emp2Addrop = parseInt(data[i].count);
        //                 $scope.emp2Adult.dropout += emp2Addrop;
        //             }
        //             if (emp2Addrop === undefined ) {
        //                 emp2Addrop = 0;
        //             }
        //             console.log('emp2 adult Dropped', $scope.emp2Adult.dropout);
        //
        //             // Adult Enrolled
        //             if(data[i]['Adult Edu Adv'] === "Enrolled in education") {
        //                 var emp2Adenroll = parseInt(data[i].count);
        //                 $scope.emp2Adult.enrolled += emp2Adenroll;
        //             }
        //             if (emp2Adenroll  === undefined ) {
        //                 emp2Adenroll = 0;
        //             }
        //             console.log('emp2 adult enrolled', $scope.emp2Adult.enrolled);
        //             $scope.emp2Adult.total = emp2Adenroll + emp2Addrop + emp2Adcom + emp2Adcon;
        //             console.log('emp2 total', $scope.emp2Adult.total);
        //
        //
        //         } // End of EMPII
        //
        //
        //         // HOMESAFE PROGRAM Education
        //         $scope.homeSafeAdult = {
        //             complete: 0,
        //             continue: 0,
        //             enrolled: 0,
        //             dropout: 0,
        //             total: 0
        //         };
        //
        //         if(data[i].Program == "HomeSafe" || data[i].Program == "Home Safe") {
        //             // Adult Completed Education
        //             if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
        //                 $scope.homeSafeAdult.complete += parseInt(data[i].count);
        //                 $scope.homeSafeAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeSafeAdult.complete === undefined) {
        //                 $scope.homeSafeAdult.complete = 0;
        //             }
        //
        //             // Adult Continue Education
        //             if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
        //                 $scope.homeSafeAdult.continue += parseInt(data[i].count);
        //                 $scope.homeSafeAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeSafeAdult.continue === undefined) {
        //                 $scope.homeSafeAdult.continue = 0;
        //             }
        //
        //             // Adult Dropout Education
        //             if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
        //                 $scope.homeSafeAdult.dropout += parseInt(data[i].count);
        //                 $scope.homeSafeAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeSafeAdult.dropout === undefined) {
        //                 $scope.homeSafeAdult.dropout = 0;
        //             }
        //
        //             // Adult Enrolled Education
        //             if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
        //                 $scope.homeSafeAdult.enrolled += parseInt(data[i].count);
        //                 $scope.homeSafeAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeSafeAdult.enrolled === undefined) {
        //                 $scope.homeSafeAdult.enrolled = 0;
        //             }
        //             console.log('HOMESAFE total', $scope.homeSafeAdult.total);
        //         } // End of HOMESAFE
        //
        //         // HOMEFRONT PROGRAM Education
        //         $scope.homeFrontAdult = {
        //             complete: 0,
        //             continue: 0,
        //             enrolled: 0,
        //             dropout: 0,
        //             total: 0
        //         };
        //
        //         if(data[i].Program == "HomeFront" || data[i].Program == "Home Front" ) {
        //             // Adult Completed Education
        //             if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
        //                 $scope.homeFrontAdult.complete += parseInt(data[i].count);
        //                 $scope.homeFrontAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeFrontAdult.complete === undefined) {
        //                 $scope.homeFrontAdult.complete = 0;
        //             }
        //
        //             // Adult Continue Education
        //             if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
        //                 $scope.homeFrontAdult.continue += parseInt(data[i].count);
        //                 $scope.homeFrontAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeFrontAdult.continue === undefined) {
        //                 $scope.homeFrontAdult.continue = 0;
        //             }
        //
        //             // Adult Dropout Education
        //             if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
        //                 $scope.homeFrontAdult.dropout += parseInt(data[i].count);
        //                 $scope.homeFrontAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeFrontAdult.dropout === undefined) {
        //                 $scope.homeFrontAdult.dropout = 0;
        //             }
        //
        //             // Adult Enrolled Education
        //             if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
        //                 $scope.homeFrontAdult.enrolled += parseInt(data[i].count);
        //                 $scope.homeFrontAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeFrontAdult.enrolled === undefined) {
        //                 $scope.homeFrontAdult.enrolled = 0;
        //             }
        //             console.log('homefront total', $scope.homefrontAdult.total);
        //         } // End of HOMEFRONT
        //
        //         // HOMEFAGAIN PROGRAM Education
        //         $scope.homeAgainAdult = {
        //             complete: 0,
        //             continue: 0,
        //             enrolled: 0,
        //             dropout: 0,
        //             total: 0
        //         };
        //
        //         if(data[i].Program == "HomeAgain" || data[i].Program == "Home Again" ) {
        //             // Adult Completed Education
        //             if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
        //                 $scope.homeAgainAdult.complete += parseInt(data[i].count);
        //                 $scope.homeAgainAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeAgainAdult.complete === undefined) {
        //                 $scope.homeAgainAdult.complete = 0;
        //             }
        //
        //             // Adult Continue Education
        //             if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
        //                 $scope.homeAgainAdult.continue += parseInt(data[i].count);
        //                 $scope.homeAgainAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeAgainAdult.continue === undefined) {
        //                 $scope.homeAgainAdult.continue = 0;
        //             }
        //
        //             // Adult Dropout Education
        //             if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
        //                 $scope.homeAgainAdult.dropout += parseInt(data[i].count);
        //                 $scope.homeAgainAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeAgainAdult.dropout === undefined) {
        //                 $scope.homeAgainAdult.dropout = 0;
        //             }
        //
        //             // Adult Enrolled Education
        //             if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
        //                 $scope.homeAgainAdult.enrolled += parseInt(data[i].count);
        //                 $scope.homeAgainAdult.total += parseInt(data[i].count);
        //             }
        //             if ($scope.homeAgainAdult.enrolled === undefined) {
        //                 $scope.homeAgainAdult.enrolled = 0;
        //             }
        //             console.log('homeagain  total', $scope.homeAgainAdult.total);
        //         } // End of HOMEFAGAIN
        //
        //     } // End of for loop
        //
        // }); // end of adultEduAdv
        //Completed

        // $scope.outcomeFactory.adultLearningDis(selections).then(function(response) {
        //   console.log("response adultLearningDis: ", response);
        //   var responseArray = response;
        //   var substringNormal = "Yes";
        //   var substringUpCAse = "YES";
        //
        //   $scope.adultDisEMP={
        //     countTotal:0,
        //     other:0
        //   };
        //
        //   $scope.adultDisEMPII={
        //     countTotal:0,
        //     other:0
        //   };
        //
        //   $scope.adultDisHomeAgain={
        //     countTotal:0,
        //     other:0
        //   };
        //
        //   $scope.adultDisHomeFront={
        //     countTotal:0,
        //     other:0
        //   };
        //
        //   $scope.adultDisHomeSafe={
        //     countTotal:0,
        //     other:0
        //   };
        //
        //   for (var i = 0; i < responseArray.length; i++) {
        //     if(responseArray[i].Program =="EMP"){
        //       if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //         $scope.adultDisEMP.countTotal += parseInt(responseArray[i].count);
        //       }
        //       else {
        //         $scope.adultDisEMP.other += parseInt(responseArray[i].count);
        //       }
        //     }
        //     else if(responseArray[i].Program =="EMPII"){
        //       if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //         $scope.adultDisEMPII.countTotal += parseInt(responseArray[i].count);
        //       }
        //       else {
        //         $scope.adultDisEMPII.other += parseInt(responseArray[i].count);
        //       }
        //     }
        //     else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
        //       if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //         $scope.adultDisHomeAgain.countTotal += parseInt(responseArray[i].count);
        //       }
        //       else {
        //         $scope.adultDisHomeAgain.other += parseInt(responseArray[i].count);
        //       }
        //     }
        //     else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
        //       if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //         $scope.adultDisHomeSafe.countTotal += parseInt(responseArray[i].count);
        //       }
        //       else {
        //         $scope.adultDisHomeSafe.other += parseInt(responseArray[i].count);
        //       }
        //     }
        //     else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
        //       if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //         $scope.adultDisHomeFront.countTotal += parseInt(responseArray[i].count);
        //       }
        //       else {
        //         $scope.adultDisHomeFront.other += parseInt(responseArray[i].count);
        //       }
        //     }
        //   }//end of for statement
        //   console.log("test emp",$scope.adultDisEMP);
        //   console.log("test empII",$scope.adultDisEMPII);
        //   console.log("test again",$scope.adultDisHomeAgain);
        //   console.log("test safe",$scope.adultDisHomeSafe);
        //   console.log("test homefront",$scope.adultDisHomeFront);
        // });//end of adultLearningDis
        //Completed

        // $scope.outcomeFactory.childLearnDis(selections).then(function(response) {
        //   console.log("response childLearnDis: ", response);
        //     var responseArray = response;
        //     var substringNormal = "Yes";
        //     var substringUpCAse = "YES";
        //
        //     $scope.childDisEMP={
        //       countTotal:0,
        //       other:0
        //     };
        //
        //     $scope.childDisEMPII={
        //       countTotal:0,
        //       other:0
        //     };
        //
        //     $scope.childDisHomeAgain={
        //       countTotal:0,
        //       other:0
        //     };
        //
        //     $scope.childDisHomeFront={
        //       countTotal:0,
        //       other:0
        //     };
        //
        //     $scope.childDisHomeSafe={
        //       countTotal:0,
        //       other:0
        //     };
        //
        //     for (var i = 0; i < responseArray.length; i++) {
        //       if(responseArray[i].Program =="EMP"){
        //         if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //           $scope.childDisEMP.countTotal += parseInt(responseArray[i].count);
        //         }
        //         else {
        //           $scope.childDisEMP.other += parseInt(responseArray[i].count);
        //         }
        //       }
        //       else if(responseArray[i].Program =="EMPII"){
        //         if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //           $scope.childDisEMPII.countTotal += parseInt(responseArray[i].count);
        //         }
        //         else {
        //           $scope.childDisEMPII.other += parseInt(responseArray[i].count);
        //         }
        //       }
        //       else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
        //         if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //           $scope.childDisHomeAgain.countTotal += parseInt(responseArray[i].count);
        //         }
        //         else {
        //           $scope.childDisHomeAgain.other += parseInt(responseArray[i].count);
        //         }
        //       }
        //       else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
        //         if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //           $scope.childDisHomeSafe.countTotal += parseInt(responseArray[i].count);
        //         }
        //         else {
        //           $scope.childDisHomeSafe.other += parseInt(responseArray[i].count);
        //         }
        //       }
        //       else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
        //         if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
        //           $scope.childDisHomeFront.countTotal += parseInt(responseArray[i].count);
        //         }
        //         else {
        //           $scope.childDisHomeFront.other += parseInt(responseArray[i].count);
        //         }
        //       }
        //     }//end of for statement
        //     console.log("test emp",$scope.childDisEMP);
        //     console.log("test empII",$scope.childDisEMPII);
        //     console.log("test again",$scope.childDisHomeAgain);
        //     console.log("test safe",$scope.childDisHomeSafe);
        //     console.log("test homefront",$scope.childDisHomeFront);
        // });//end of childLearnDis
        // Completed

        $scope.outcomeFactory.hhCurrentEmp(selections).then(function(response) {
          console.log("response hhCurrentEmp: ", response);
        });


        // $scope.outcomeFactory.hh2CurrentEmp(selections).then(function(response) {
        //   console.log("response hh2CurrentEmp: ", response);
        // });


        // $scope.outcomeFactory.econStabil(selections).then(function(response) {
        //     console.log("response econStabil: ", response);
        //     var responseArray = response;
        //
        //     $scope.empEconS = {
        //         work3month: 0,
        //         appliedforSSD: 0,
        //         appliedforSSDbutDenied: 0,
        //         jobAtYearEndorExit: 0,
        //         diagDisAlreadySSD: 0,
        //         approvedSSDduringProgram: 0,
        //         alreadySSD: 0,
        //         total: 0
        //     };
        //
        //     $scope.emptwoEconS = {
        //         work3month: 0,
        //         appliedforSSD: 0,
        //         appliedforSSDbutDenied: 0,
        //         jobAtYearEndorExit: 0,
        //         diagDisAlreadySSD: 0,
        //         approvedSSDduringProgram: 0,
        //         alreadySSD: 0,
        //         total: 0
        //     };
        //
        //     $scope.homeAgainEconS = {
        //         work3month: 0,
        //         appliedforSSD: 0,
        //         appliedforSSDbutDenied: 0,
        //         jobAtYearEndorExit: 0,
        //         diagDisAlreadySSD: 0,
        //         approvedSSDduringProgram: 0,
        //         alreadySSD: 0,
        //         total: 0
        //     };
        //
        //     $scope.homeSafeEconS = {
        //         work3month: 0,
        //         appliedforSSD: 0,
        //         appliedforSSDbutDenied: 0,
        //         jobAtYearEndorExit: 0,
        //         diagDisAlreadySSD: 0,
        //         approvedSSDduringProgram: 0,
        //         alreadySSD: 0,
        //         total: 0
        //     };
        //
        //     $scope.homeFrontEconS = {
        //         work3month: 0,
        //         appliedforSSD: 0,
        //         appliedforSSDbutDenied: 0,
        //         jobAtYearEndorExit: 0,
        //         diagDisAlreadySSD: 0,
        //         approvedSSDduringProgram: 0,
        //         alreadySSD: 0,
        //         total: 0
        //     };
        //
        //     for (var i = 0; i < responseArray.length; i++) {
        //         if(responseArray[i].Program == "EMP"){
        //             if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
        //                 $scope.empEconS.work3month += parseInt(responseArray[i].count);
        //                 $scope.empEconS.total ++;
        //                 console.log("emp 3 mo", $scope.empEconS.work3month);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
        //                 $scope.empEconS.appliedforSSD += parseInt(responseArray[i].count);
        //                 $scope.empEconS.total ++;
        //                 console.log("emp emp for ssd", $scope.empEconS.appliedforSSD);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
        //                 $scope.empEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
        //                 $scope.empEconS.total ++;
        //                 console.log("emp job at exit", $scope.empEconS.jobAtYearEndorExit);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
        //                 $scope.empEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
        //                 $scope.empEconS.total ++;
        //                 console.log("emp denied ssd", $scope.empEconS.appliedforSSDbutDenied);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
        //                 $scope.empEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
        //                 $scope.empEconS.total ++;
        //                 console.log("emp approved ssd", $scope.empEconS.approvedSSDduringProgram);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
        //                 $scope.empEconS.alreadySSD += parseInt(responseArray[i].count);
        //                 $scope.empEconS.total ++;
        //                 console.log("emp already ssd", $scope.empEconS.alreadySSD);
        //             }
        //         }//end of EMP if
        //         else if(responseArray[i].Program == "EMPII"){
        //             if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
        //                 $scope.emptwoEconS.work3month += parseInt(responseArray[i].count);
        //                 $scope.emptwoEconS.total ++;
        //                 console.log("empii 3 mo", $scope.emptwoEconS.work3month);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
        //                 $scope.emptwoEconS.appliedforSSD += parseInt(responseArray[i].count);
        //                 $scope.emptwoEconS.total ++;
        //                 console.log("empii for ssd", $scope.emptwoEconS.appliedforSSD);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
        //                 $scope.emptwoEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
        //                 $scope.emptwoEconS.total ++;
        //                 console.log("empii job at exit", $scope.emptwoEconS.jobAtYearEndorExit);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
        //                 $scope.emptwoEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
        //                 $scope.emptwoEconS.total ++;
        //                 console.log("empii denied ssd", $scope.emptwoEconS.appliedforSSDbutDenied);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
        //                 $scope.emptwoEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
        //                 $scope.emptwoEconS.total ++;
        //                 console.log("empii approved ssd", $scope.emptwoEconS.approvedSSDduringProgram);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
        //                 $scope.emptwoEconS.alreadySSD += parseInt(responseArray[i].count);
        //                 $scope.emptwoEconS.total ++;
        //                 console.log("empii already ssd", $scope.emptwoEconS.alreadySSD);
        //             }
        //         }//end of empII
        //         else if(responseArray[i].Program == "HomeSafe"){
        //             if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
        //                 $scope.homeSafeEconS.work3month += parseInt(responseArray[i].count);
        //                 $scope.homeSafeEconS.total ++;
        //                 console.log("homesafe 3 mo", $scope.homeSafeEconS.work3month);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
        //                 $scope.homeSafeEconS.appliedforSSD += parseInt(responseArray[i].count);
        //                 $scope.homeSafeEconS.total ++;
        //                 console.log("homesafe for ssd", $scope.homeSafeEconS.appliedforSSD);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
        //                 $scope.homeSafeEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
        //                 $scope.homeSafeEconS.total ++;
        //                 console.log("homesafe job at exit", $scope.homeSafeEconS.jobAtYearEndorExit);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
        //                 $scope.homeSafeEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
        //                 $scope.homeSafeEconS.total ++;
        //                 console.log("homesafe denied ssd", $scope.homeSafeEconS.appliedforSSDbutDenied);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
        //                 $scope.homeSafeEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
        //                 $scope.homeSafeEconS.total ++;
        //                 console.log("homesafe approved ssd", $scope.homeSafeEconS.approvedSSDduringProgram);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
        //                 $scope.homeSafeEconS.alreadySSD += parseInt(responseArray[i].count);
        //                 $scope.homeSafeEconS.total ++;
        //                 console.log("homesafe already ssd", $scope.homeSafeEconS.alreadySSD);
        //             }
        //         }//end of HomeSafe
        //         else if(responseArray[i].Program == "Home Again"){
        //             if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
        //                 $scope.homeAgainEconS.work3month += parseInt(responseArray[i].count);
        //                 $scope.homeAgainEconS.total ++;
        //                 console.log("home again 3 mo", $scope.homeAgainEconS.work3month);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
        //                 $scope.homeAgainEconS.appliedforSSD += parseInt(responseArray[i].count);
        //                 $scope.homeAgainEconS.total ++;
        //                 console.log("home again for ssd", $scope.homeAgainEconS.appliedforSSD);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
        //                 $scope.homeAgainEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
        //                 $scope.homeAgainEconS.total ++;
        //                 console.log("home again job at exit", $scope.homeAgainEconS.jobAtYearEndorExit);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
        //                 $scope.homeAgainEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
        //                 $scope.homeAgainEconS.total ++;
        //                 console.log("home again denied ssd", $scope.homeAgainEconS.appliedforSSDbutDenied);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
        //                 $scope.homeAgainEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
        //                 $scope.homeAgainEconS.total ++;
        //                 console.log("home again approved ssd", $scope.homeAgainEconS.approvedSSDduringProgram);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
        //                 $scope.homeAgainEconS.alreadySSD += parseInt(responseArray[i].count);
        //                 $scope.homeAgainEconS.total ++;
        //                 console.log("home again already ssd", $scope.homeAgainEconS.alreadySSD);
        //             }
        //         }//end of Home Again
        //         else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
        //             if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
        //                 $scope.homeFrontEconS.work3month += parseInt(responseArray[i].count);
        //                 $scope.homeFrontEconS.total ++;
        //                 console.log("home front 3 mo", $scope.homeFrontEconS.work3month);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
        //                 $scope.homeFrontEconS.appliedforSSD += parseInt(responseArray[i].count);
        //                 $scope.homeFrontEconS.total ++;
        //                 console.log("home front for ssd", $scope.homeFrontEconS.appliedforSSD);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
        //                 $scope.homeFrontEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
        //                 $scope.homeFrontEconS.total ++;
        //                 console.log("home front job at exit", $scope.homeFrontEconS.jobAtYearEndorExit);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
        //                 $scope.homeFrontEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
        //                 $scope.homeFrontEconS.total ++;
        //                 console.log("home front denied ssd", $scope.homeFrontEconS.appliedforSSDbutDenied);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
        //                 $scope.homeFrontEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
        //                 $scope.homeFrontEconS.total ++;
        //                 console.log("home front approved ssd", $scope.homeFrontEconS.approvedSSDduringProgram);
        //             }
        //             else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
        //                 $scope.homeFrontEconS.alreadySSD += parseInt(responseArray[i].count);
        //                 $scope.homeFrontEconS.total ++;
        //                 console.log("home front already ssd", $scope.homeFrontEconS.alreadySSD);
        //             }
        //         }//end of homeFront
        //     }//these check for the objects to have values(these total values hsould equal response.length)
        // }); // End of econStabil
        //Completed

        // $scope.outcomeFactory.adultDisabil(selections).then(function(response) {
        //     console.log("response adultDisabil: ", response);
        //     var responseArray = response;
        //
        //     $scope.empAdultDis = {
        //         total: 0,
        //     };
        //
        //     $scope.emptwoAdultDis = {
        //         total: 0,
        //     };
        //
        //     $scope.homeAgainAdultDis = {
        //         total: 0,
        //     };
        //
        //     $scope.homeSafeAdultDis = {
        //         total: 0,
        //     };
        //
        //     $scope.homeFrontAdultDis = {
        //         total: 0,
        //     };
        //
        //     for (var i = 0; i < responseArray.length; i++) {
        //         if(responseArray[i].Program == "EMP"){
        //             console.log("pre if", responseArray[i].count);
        //             if(responseArray[i]['Is There a Disability'] === true){
        //                 $scope.empAdultDis.total += parseInt(responseArray[i].count);
        //                 console.log("emp Disability true", $scope.empAdultDis.total);
        //             }
        //         }//end of EMP if
        //         else if(responseArray[i].Program == "EMPII"){
        //             if(responseArray[i]['Is There a Disability'] === true){
        //                 $scope.emptwoAdultDis.total += parseInt(responseArray[i].count);
        //                 console.log("empii Disability true", $scope.emptwoAdultDis.total);
        //             }
        //         }//end of empII
        //         else if(responseArray[i].Program == "HomeSafe"){
        //             console.log("whats going on here", responseArray[i]['Is There a Disability']);
        //             if(responseArray[i]['Is There a Disability'] === true){
        //                 $scope.homeSafeAdultDis.total += parseInt(responseArray[i].count);
        //                 console.log("home safe Disability true", $scope.homeSafeAdultDis.total);
        //             }
        //         }//end of HomeSafe
        //         else if(responseArray[i].Program == "Home Again"){
        //             if(responseArray[i]['Is There a Disability'] === true){
        //                 $scope.homeAgainAdultDis.total += parseInt(responseArray[i].count);
        //                 console.log("home again Disability true", $scope.homeAgainAdultDis.total);
        //             }
        //         }//end of Home Again
        //         else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
        //             if(responseArray[i]['Is There a Disability'] === true){
        //                 $scope.homeFrontAdultDis.total += parseInt(responseArray[i].count);
        //                 console.log("home front Disability true", $scope.homeFrontAdultDis.total);
        //             }
        //         }//end of homeFront
        //     }
        // }); // end of adultDisabil
        //Completed

        // $scope.outcomeFactory.childDis(selections).then(function(response) {
        //   console.log("response childDis: ", response);
        // });


        // $scope.outcomeFactory.parentEduYearBefore(selections).then(function(response) {
        //     console.log("response parentEduYearBefore: ", response);
        //     var data = response;
        //
        //
        //     $scope.empParentEdu_priorYr = {
        //         completed: 0
        //     };
        //
        //     $scope.emp2ParentEdu_priorYr = {
        //         completed: 0
        //     };
        //
        //     $scope.homeagainParentEdu_priorYr = {
        //         completed: 0
        //     };
        //
        //     $scope.homesafeParentEdu_priorYr = {
        //         completed: 0
        //     };
        //
        //     $scope.homefrontParentEdu_priorYr = {
        //         completed: 0
        //     };
        //
        //     for (var i = 0; i < data.length; i++) {
        //
        //         if(data[i].Program === "EMP") {
        //             $scope.empParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
        //             console.log('emp parent edu', $scope.empParentEdu_priorYr.completed);
        //         }
        //         if(data[i].Program === "EMPII") {
        //             $scope.emp2ParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
        //             console.log('emp2 parent edu', $scope.emp2ParentEdu_priorYr.completed);
        //         }
        //         if(data[i].Program === "Home Again") {
        //             $scope.homeagainParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
        //             console.log('homeagain parent edu',$scope.homeagainParentEdu_priorYr.completed);
        //         }
        //         if(data[i].Program === "Home Safe" || data[i].Program === "HomeSafe") {
        //             $scope.homesafeParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
        //             console.log('home safe', $scope.homesafeParentEdu_priorYr.completed);
        //         }
        //         if(data[i].Program === "Home Front" || data[i].Program === "HomeFront") {
        //             $scope.homefrontParentEdu.completed= parseInt(data[i]['Parenting Completed']);
        //             console.log('home safe', $scope.homefrontParentEdu.completed);
        //         }
        //     }
        //
        // });  // end of parentEduYearBefore
        //completed

        // $scope.outcomeFactory.parentEduThisYear(selections).then(function(response) {
        //     console.log("response parentEduThisYear: ", response);
        //     $scope.parentEduThisYear_EMP = {
        //         total:0
        //     };
        //
        //     $scope.parentEduThisYear_EMPII = {
        //         total:0
        //     };
        //
        //     $scope.parentEduThisYear_HomeSafe = {
        //         total:0
        //     };
        //
        //     $scope.parentEduThisYear_HomeAgain = {
        //         total:0
        //     };
        //
        //     $scope.parentEduThisYear_HomeFront = {
        //         total:0
        //     };
        //
        //     $scope.parentEduThisYear_Total = 0;
        //
        //     var responseArray = response
        //
        //     for (var i = 0; i < responseArray.length; i++) {
        //         $scope.parentEduThisYear_Total += parseInt(responseArray[i]["Parenting Completed"]);
        //
        //         if (responseArray[i].Program == "EMP"){
        //             $scope.parentEduThisYear_EMP.total += parseInt(responseArray[i]["Parenting Completed"]);
        //         }
        //         else if (responseArray[i].Program == "EMPII"){
        //             $scope.parentEduThisYear_EMPII.total += parseInt(responseArray[i]["Parenting Completed"]);
        //         }
        //         else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
        //             $scope.parentEduThisYear_HomeSafe.total += parseInt(responseArray[i]["Parenting Completed"]);
        //         }
        //
        //         else if (responseArray[i].Program == "HomeAgain" || responseArray[i].Program == "Home Again"){
        //             $scope.parentEduThisYear_HomeAgain.total += parseInt(responseArray[i]["Parenting Completed"]);
        //         }
        //
        //         else if (responseArray[i].Program == "HomeFront"|| responseArray[i].Program == "Home Front"){
        //             $scope.parentEduThisYear_HomeFront += parseInt(responseArray[i]["Parenting Completed"]);
        //         }
        //     } // end for loop
        // });  // end of parentEduThisYear
        // Completed

        // $scope.outcomeFactory.parentEdu(selections).then(function(response) {
        //     console.log("response parentEdu: ", response);
        //     var responseArray = response;
        //     $scope.empParentEdu = {
        //         total: 0,
        //     };
        //     $scope.emptwoParentEdu = {
        //         total: 0,
        //     };
        //     $scope.homeAgainParentEdu = {
        //         total: 0,
        //     };
        //     $scope.homeSafeParentEdu = {
        //         total: 0,
        //     };
        //     $scope.homeFrontParentEdu = {
        //         total: 0,
        //     };
        //
        //     $scope.parentEdu_Total = 0;
        //
        //     for (var i = 0; i < responseArray.length; i++) {
        //         $scope.parentEdu_Total += responseArray[i].count;
        //
        //         if(responseArray[i].Program == "EMP"){
        //             if(responseArray[i]['Parenting Education'] === true){
        //                 $scope.empParentEdu.total += parseInt(responseArray[i].count);
        //                 console.log("emp parent true", $scope.empParentEdu.total);
        //             }
        //         }//end of EMP if
        //         else if(responseArray[i].Program == "EMPII"){
        //             if(responseArray[i]['Parenting Education'] === true){
        //                 $scope.emptwoParentEdu.total += parseInt(responseArray[i].count);
        //                 console.log("empii parent true", $scope.emptwoParentEdu.total);
        //             }
        //         }//end of empII
        //         else if(responseArray[i].Program == "HomeSafe"){
        //             console.log("whats going on here", responseArray[i]['Is There a Disability']);
        //             if(responseArray[i]['Parenting Education'] === true){
        //                 $scope.homeSafeParentEdu.total += parseInt(responseArray[i].count);
        //                 console.log("home safe parent true", $scope.homeSafeParentEdu.total);
        //             }
        //         }//end of HomeSafe
        //         else if(responseArray[i].Program == "Home Again"){
        //             if(responseArray[i]['Parenting Education'] === true){
        //                 $scope.homeAgainParentEdu.total += parseInt(responseArray[i].count);
        //                 console.log("home again partent true", $scope.homeAgainParentEdu.total);
        //             }
        //         }//end of Home Again
        //         else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
        //             if(responseArray[i]['Parenting Education'] === true){
        //                 $scope.homeFrontParentEdu.total += parseInt(responseArray[i].count);
        //                 console.log("home front parent true", $scope.homeFrontParentEdu.total);
        //             }
        //         }//end of homeFront
        //     }
        //
        // }); //end of parentEdu
        //
        //Completed

        // $scope.outcomeFactory.childMI(selections).then(function(response) {
        //   console.log("response childMI: ", response);
        // });


        // $scope.outcomeFactory.adultMI(selections).then(function(response) {
        //     console.log("response adultMI: ", response);
        //     $scope.adultMI_EMP = {
        //         yesAndBeingTreated:0,
        //         yesAndNotBeingTreated:0,
        //         yesAndReferredForAssessment:0,
        //         undiagnosedReferredForAssessment:0,
        //         total:0
        //     };
        //
        //     $scope.adultMI_EMPII = {
        //         yesAndBeingTreated:0,
        //         yesAndNotBeingTreated:0,
        //         yesAndReferredForAssessment:0,
        //         undiagnosedReferredForAssessment:0,
        //         total:0
        //     };
        //
        //     $scope.adultMI_HomeSafe = {
        //         yesAndBeingTreated:0,
        //         yesAndNotBeingTreated:0,
        //         yesAndReferredForAssessment:0,
        //         undiagnosedReferredForAssessment:0,
        //         total:0
        //     };
        //
        //     $scope.adultMI_HomeAgain = {
        //         yesAndBeingTreated:0,
        //         yesAndNotBeingTreated:0,
        //         yesAndReferredForAssessment:0,
        //         undiagnosedReferredForAssessment:0,
        //         total:0
        //     };
        //
        //     $scope.adultMI_HomeFront = {
        //         yesAndBeingTreated:0,
        //         yesAndNotBeingTreated:0,
        //         yesAndReferredForAssessment:0,
        //         undiagnosedReferredForAssessment:0,
        //         total:0
        //     };
        //
        //     $scope.adultMI_Total = 0;
        //
        //     var responseArray = response
        //
        //     for (var i = 0; i < responseArray.length; i++) {
        //         $scope.adultMI_Total += parseInt(responseArray[i].count);
        //         if (responseArray[i].Program == "EMP"){
        //             if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
        //                 $scope.adultMI_EMP.yesAndBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
        //                 $scope.adultMI_EMP.yesAndNotBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
        //                 $scope.adultMI_EMP.yesAndReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
        //                 $scope.adultMI_EMP.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         else if (responseArray[i].Program == "EMPII"){
        //             if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
        //                 $scope.adultMI_EMPII.yesAndBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
        //                 $scope.adultMI_EMPII.yesAndNotBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
        //                 $scope.adultMI_EMPII.yesAndReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
        //                 $scope.adultMI_EMPII.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
        //             if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
        //                 $scope.adultMI_HomeSafe.yesAndBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
        //                 $scope.adultMI_HomeSafe.yesAndNotBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
        //                 $scope.adultMI_HomeSafe.yesAndReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
        //                 $scope.adultMI_HomeSafe.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         else if (responseArray[i].Program == "HomeAgain" || responseArray[i].Program == "Home Again"){
        //             if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
        //                 $scope.adultMI_HomeAgain.yesAndBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
        //                 $scope.adultMI_HomeAgain.yesAndNotBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
        //                 $scope.adultMI_HomeAgain.yesAndReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
        //                 $scope.adultMI_HomeAgain.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //
        //         else if (responseArray[i].Program == "HomeFront"|| responseArray[i].Program == "Home Front"){
        //             if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
        //                 $scope.adultMI_HomeFront.yesAndBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
        //                 $scope.adultMI_HomeFront.yesAndNotBeingTreated += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
        //                 $scope.adultMI_HomeFront.yesAndReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
        //             }
        //             else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
        //                 $scope.adultMI_HomeFront.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
        //                 $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
        //             }
        //         }
        //     }//end for for loop
        //     console.log('test EMP', $scope.adultMI_EMP);
        //     console.log('test EMPII', $scope.adultMI_EMPII);
        //     console.log('test Safe', $scope.adultMI_HomeSafe);
        //     console.log('test Again', $scope.adultMI_HomeAgain);
        //     console.log('test Front', $scope.adultMI_HomeFront);
        //     console.log('TOTAL', $scope.adultMI_Total);
        //
        // });
        // Completed


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
    } //end of click

    $scope.exportDataOutcome = function () {
        var blob = new Blob([document.getElementById('exportableOutcome').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Solid_Ground_Report.xls");
    };

    $scope.resetQuery = function () {
        $scope.selectedprogram = [];
        $scope.selectedoutcome = [];
        $scope.startdate = new Date();
        $scope.enddate = new Date();
    };


// end controller
}]);
