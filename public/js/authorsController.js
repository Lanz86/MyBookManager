app.controller('AuthorsController',  function($http, $rootScope, $scope, $location, $routeParams) {
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;


    $scope.pageTitle = '';
    $scope.mode = 'show';

    $scope.authors = [];
    $scope.newAuthor = null;

    $scope.init = function() {
        switch($location.$$url.replace(/\d+/,'')) {
            case '/authors':
                $scope.loadAuthors();
                break;
            case '/authors/add/':
                $scope.mode = 'add';
                $scope.pageTitle = 'AGGIUNGI NUOVO AUTORE';
                break;
            case '/authors/edit/':
                $scope.mode = 'edit';
                $scope.pageTitle = 'MODIFICA AUTORE';
                $scope.loadAuthor($routeParams.id);
        }
    };

    $scope.loadAuthors = function() {
        $http.get('/index.php/api/v1/authors').success(function(data) {
           $scope.authors = data;
        });
    };

    $scope.loadAuthor = function(id) {
        $http.get('/index.php/api/v1/authors/' + id).success(function(data) {
            $scope.newAuthor = data;
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
        $http.post('/index.php/api/v1/authors/', $scope.newAuthor).success(function(data) {
            if($rootScope.returnUrl) {
                if($rootScope.newBook) {
                    $rootScope.newBook.authors.push(data.data);
                }
                $location.path($rootScope.returnUrl);
            } else {
                $location.path('/authors');
            }
        });
    };

    $scope.edit = function() {
        $http.put('/index.php/api/v1/authors/' + $scope.newAuthor.id, $scope.newAuthor).success(function(data) {
            $location.path('/authors');
        });
    };

    $scope.delete = function(index) {
        if(!confirm('Sei sicuro di voler eliminare l\'autore ' + $scope.authors[index].name + ' ' + $scope.authors[index].surname + '?')) return;

        var elementId = $scope.authors[index].id;
        $http.delete('/api/v1/authors/' + elementId).success(function(data) {
            $scope.authors.splice(index, 1);
        });
    };


    $scope.init();

});
