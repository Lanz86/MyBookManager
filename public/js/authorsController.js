app.controller('AuthorsController',  function($http, $rootScope, $scope, $location, $routeParams) {

    $scope.authors = [];
    $scope.newAuthor = null;

    $scope.init = function() {
        console.log('init');
    };

    $scope.create = function() {
        $http.post('/api/v1/authors/', self.newAuthor).success(function(data) {
            console.log(data);
        });
    };


    $scope.init();

});
