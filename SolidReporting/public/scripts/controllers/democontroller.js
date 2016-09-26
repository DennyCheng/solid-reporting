myApp.controller("DemoController", ["$scope",'$http','DataFactory', function ($scope, $http, DataFactory) {
  console.log("hello from demoController");

  $scope.dataFactory = DataFactory;

  $scope.test = $scope.dataFactory.testVar();
  console.log($scope.test);

  var races = ['African', 'African American', 'American Indian' ,'Asian/SE Asian/Pacific Islander', 'Caucasian/White', 'Hispanic/Latino', 'Multiracial', 'Other'];
  $scope.adultRaces = races;
  $scope.childRaces = races;
  $scope.genders = ['Female', 'Male'];
  $scope.childAges = ['0-18 mths', '19-35 mths', '36-59 mths', '60-71 mths (5 y.o.)', '6-9 yrs', '10-14 yrs', '15-17 yrs', '18+ child in home'];

  //-------- for use with isteven-multi-select directive----------=
  $scope.adultAges = [{range:'18-22'}, {range:'23-30'}, {range:'31-40'}, {range:'41-54'}, {range:'55-64'}, {range:'65+'}];

  $scope.fOpen = function() {
      console.log( 'On-open' );
  }

  $scope.fClose = function() {
      console.log( 'On-close' );
  }

  $scope.fClick = function( data ) {
      console.log( 'On-item-click' );
      console.log( 'On-item-click - data:' );
      console.log( data );
  }

  $scope.fSelectAll = function() {
      console.log( 'On-select-all' );
  }

  $scope.fSelectNone = function() {
      console.log( 'On-select-none' );
  }

  $scope.fReset = function() {
      console.log( 'On-reset' );
  }

  $scope.fClear = function() {
      console.log( 'On-clear' );
  }

  $scope.fSearchChange = function( data ) {
      console.log( 'On-search-change' );
      console.log( 'On-search-change - keyword: ' + data.keyword );
      console.log( 'On-search-change - result: ' );
      console.log( data.result );
  }
  // -------------------------------------------------------

  //------- for use with angularjs-dropdown-multiselect directive
  $scope.lastResidencesModel = [];
  $scope.lastResidenceSettings = {
    displayProp: 'residence',
    smartButtonMaxItems: 10,
    smartButtonTextConverter: function(itemText, originalItem) {
      return itemText;
    }
  };
  //------------------------------------------------------------

  $scope.lastResidences = [{residence:'Ramsey'}, {residence:'Suburban Ramsey Co.'}, {residence:'Washington Co.'}, {residence:'Hennepin'}, {residence:'Suburban Hennepin Co.'}, {residence:'Other Metro County'}, {residence:'Outside Twin Cities Metro'}, {residence:'Outside of State'}];

  $scope.hhIncomes = ['At or below 100% Poverty', '101%-200% Poverty', 'At or above 200% Poverty'];

  $scope.searchTerm;
  $scope.clearSearchTerm = function() {
    $scope.searchTerm = '';
  };

  console.log($scope.outputAdultAges);
  // The md-select directive eats keydown events for some quick select
  // logic. Since we have a search input here, we don't need that logic.
  // $element.find('input').on('keydown', function(ev) {
  //   console.log("working");
  //     ev.stopPropagation();
  // });



// end controller
}]);
