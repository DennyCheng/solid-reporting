myApp.factory('DataFactory', ['$http', function($http) {

  //Private API Scope
  var randomArray = [1,2,3];
  


    // PUBLIC API scope
    return {//start of return scope

    testVar: function(){
      return randomArray;
    },


    };//end of public scope
}]);
