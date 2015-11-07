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
        switch($location.$$url.replace(/\d+/,'')) {
            case '/books':
                $scope.loadBooks();
                break;
            case '/books/add':
                $scope.mode = 'add';
                $scope.pageTitle = 'AGGIUNGI NUOVO LIBRO';
                if($rootScope.newBook) {
                    console.log($rootScope.newBook);
                    $scope.newBook = $rootScope.newBook;
                    $rootScope.newBook = undefined;
                }
                else {
                    $scope.newBook = {
                        title: '',
                        description: '',
                        isbn: '',
                        authors: [],
                    };
                }
                $scope.loadAuthors();
                break;
            case '/books/edit/':
                $scope.mode = 'edit';
                $scope.pageTitle = 'MODIFICA LIBRO';
                if($rootScope.newBook) {
                    $scope.newBook = $rootScope.newBook;
                    $rootScope.newBook = undefined;
                    $scope.loadAuthors();
                } else {
                    $scope.loadBook($routeParams.id);
                }

                break;
        }
    };

    $scope.loadBooks = function() {
        $http.get('/api/v1/books').success(function(data) {
            $scope.books = data;
        });
    };

    $scope.loadBook = function(id) {
        $http.get('/index.php/api/v1/books/'+ id).success(function(data) {
            $scope.newBook = data;
            $scope.loadAuthors();
        }).error(function(data, status) {
            if(status == 404) {
                $location.path( "/s404" );
            }
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

        $http.post('/index.php/api/v1/books', $scope.newBook).success(function(data) {
            $location.path('books');
        });
    };

    $scope.edit = function() {
        $scope.newBook.authors = $scope.getSelectedAuthors();

        $http.put('/index.php/api/v1/books/' + $scope.newBook.id, $scope.newBook).success(function(data) {
            $location.path('books');
        });
    };

    $scope.delete = function(index) {
        if(!confirm('Sei sicuro di voler eliminare il libro ' + $scope.books[index].title + '?')) return;

        var elementId = $scope.books[index].id;
        $http.delete('/api/v1/books/' + elementId).success(function(data) {
            $scope.books.splice(index, 1);
        });
    };

    $scope.loadAuthors = function() {
        $http.get('/index.php/api/v1/authors').success(function(data) {
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

    $scope.addAuthor = function() {
        var returnUrl = $scope.mode == 'edit' ? '/books/edit/' + $scope.newBook.id : '/books/add';

        console.log(returnUrl);

        $rootScope.newBook = angular.copy($scope.newBook);
        $rootScope.returnUrl = returnUrl;

        $location.path('/authors/add');
    };


    $scope.init();
});