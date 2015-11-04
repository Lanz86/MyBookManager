/**
 * Created by Antonio on 04/11/2015.
 */
app.controller('BooksController',  function($http, $rootScope, $scope) {
    $scope.books = [];


    $scope.init = function() {
        $http.get('/api/v1/books').success(function(data) {
            $scope.books = data;
        });
    };

    $scope.init();
});