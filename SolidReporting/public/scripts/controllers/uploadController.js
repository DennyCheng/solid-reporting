myApp.controller('uploadController', ['$scope', 'DataFactory', '$http', '$location', function($scope, DataFactory, $http, $location){

  $scope.dataFactory = DataFactory;


  $scope.dataFactory.currentSess();

  $scope.userName = $scope.dataFactory.varUsername();

  // $scope.tologout = function() {
  //   $scope.dataFactory.logout().then(function(response) {
  //     console.log('logged out');
  //     console.log('i redirected you to the home page');
  //     $location.path("/login");
  //   });
  //
  // };

   // $scope.dataFactory.currentSess();
   //
   // $scope.userName = $scope.dataFactory.varUsername();
   //
   // $scope.tologout = function() {
   //   $scope.dataFactory.logout().then(function(response) {
   //     console.log('logged out');
   //     console.log('i redirected you to the home page');
   //     $location.path("/login");
   //   });
   //
   // }

    // $scope.uploadFile = function(){
    //     var file = $scope.myFile;
    //
    //     if(file) {
    //         var textFile = file.name.substr(file.name.length - 4);
    //         if (textFile == '.sql') {
    //             var uploadUrl = "/fileUpload";
    //             fileUpload.uploadFileToUrl(file, uploadUrl);
    //         } else {
    //             alert('Please insert sql file');
    //         }
    //     } else {
    //         alert('Please enter file');
    //     }
    // };

    $scope.onSubmit = function(){
        var file = $scope.file[0];
        console.log(file);
        if (file) {
            var textFile = file.lfFileName.substr(file.lfFileName.length - 4);
            if (textFile == '.sql') {
                var formData = new FormData();
                angular.forEach($scope.file, function (obj) {
                    formData.append('file', obj.lfFile);
                });

                $http.post('./fileUpload', formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function (result) {
                    // do someting
                    $location.path("/demographics");
                }, function (err) {
                    // do someting
                });
            } else {
                alert('Please insert sql file');
            }
        } else {
            alert('Please insert file');
        }


    };

}]);

// myApp.directive('fileModel', ['$parse', function ($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;
//
//             element.bind('change', function(){
//                 scope.$apply(function(){
//                     modelSetter(scope, element[0].files[0]);
//                 });
//             });
//         }
//     };
// }]);

// myApp.service('fileUpload', ['$http', function ($http) {
//     this.uploadFileToUrl = function(file, uploadUrl){
//         var fd = new FormData();
//         fd.append('file', file);
//         $http.post(uploadUrl, fd, {
//             transformRequest: angular.identity,
//             headers: {'Content-Type': undefined}
//         })
//             .success(function(){
//             })
//             .error(function(){
//             });
//     }
// }]);
