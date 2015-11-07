/**
 * Created by Antonio on 04/11/2015.
 */
app.controller('BooksController',  function($http, $rootScope, $scope, $location, $routeParams) {

    $scope.pageTitle = '';

    $scope.books = [];
    $scope.newBook = null;
    $scope.listAllAuthors = [];

    $scope.mode = 'show';

    $scope.init = function() {
        console.log($location.$$url.replace(/\d/,''));
        switch($location.$$url.replace(/\d/,'')) {
            case '/books':
                $scope.loadBooks();
                break;
            case '/books/add':
                $scope.mode = 'add';
                $scope.pageTitle = 'AGGIUNGI NUOVO LIBRO';
                $scope.newBook = {
                    title: '',
                    description: '',
                    isbn: '',
                    authors: [],
                };
                $scope.loadAuthors();
                break;
            case '/books/edit/':
                $scope.mode = 'edit';
                $scope.pageTitle = 'MODIFICA LIBRO';
                $scope.loadBook($routeParams.id);
                break;
        }
    };

    $scope.loadBooks = function() {
        $http.get('/api/v1/books').success(function(data) {
            $scope.books = data;
        });
    };

    $scope.loadBook = function(id) {
        $http.get('/api/v1/books/'+ id).success(function(data) {
            $scope.newBook = data;
            $scope.loadAuthors();
        });
    };

    $scope.save = function() {
        if($scope.mode == 'add') {
            $scope.create();
        } else if($scope.mode == 'edit') {
            $scope.edit();
        }
    };

    $scope.create = function() {
        $scope.newBook.authors = $scope.getSelectedAuthors();

        $http.post('/api/v1/books', $scope.newBook).success(function(data) {
            $location.path('books');
        });
    };

    $scope.edit = function() {
        $scope.newBook.authors = $scope.getSelectedAuthors();

        $http.patch('/api/v1/books/' + $scope.newBook.id, $scope.newBook).success(function(data) {
            $location.path('books');
        });
    };

    $scope.delete = function(index) {
        if(!confirm('Sei sicuro di voler eliminare il libro ' + $scope.books[index].title + '?')) return;

        var elementId = $scope.books[index].id;
        $http.delete('/api/v1/books/' + elementId, $scope.newBook).success(function(data) {
            $scope.books.splice(index, 1);
        });
    };

    $scope.loadAuthors = function() {
        $http.get('/api/v1/authors').success(function(data) {
            $scope.listAllAuthors = data;

            angular.forEach($scope.newBook.authors, function(value, ix) {
                angular.forEach($scope.listAllAuthors, function(lValue, lIX) {
                    if(value.id == lValue.id) {
                        lValue.selected = true;
                    }
                });
            });
        });
    };

    $scope.getSelectedAuthors = function() {
        var selectedAuthors = [];
        angular.forEach($scope.listAllAuthors, function(value, key) {
            if(value.selected) this.push(value);

        }, selectedAuthors);

        return selectedAuthors;
    };

    $scope.init();
});