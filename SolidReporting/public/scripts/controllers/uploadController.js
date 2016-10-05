myApp.controller('uploadController', ['$scope', 'DataFactory', '$http', '$location', 'toaster', function($scope, DataFactory, $http, $location , toaster){

  $scope.dataFactory = DataFactory;


  $scope.dataFactory.currentSess();

  $scope.userName = $scope.dataFactory.varUsername();

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
                toaster.error('Please insert sql file');
            }
        } else {
            toaster.error('Please insert file');
        }


    };

}]);

