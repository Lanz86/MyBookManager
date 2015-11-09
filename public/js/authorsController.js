app.controller('AuthorsController',  function($http, $rootScope, $scope, $location, $routeParams, $auth) {

    $scope.pageTitle = '';
    $scope.mode = 'show';

    $scope.errorMessage = '';
    $scope.showMessage = false;

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
        }).error(function(data, status) {
            if(status == 400) {
                $location.path('/login');
            }
        });
    };

    $scope.loadAuthor = function(id) {
        $http.get('/index.php/api/v1/authors/' + id).success(function(data) {
            $scope.newAuthor = data;
        }).error(function(data, status) {
            if(status == 404) {
                $location.path( "/s404" );
            } else if(status != 500) {
                $location.path( "/login" );
            } else {
                $scope.errorMessage = data;
                $scope.showMessage = true;
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
            if(data.success) {
                if($rootScope.returnUrl) {
                    if($rootScope.newBook) {
                        $rootScope.newBook.authors.push(data.data);
                    }
                    $location.path($rootScope.returnUrl);
                } else {
                    $location.path('/authors');
                }
            } else {
                $scope.errorMessage = data.message;
                $scope.showMessage = true;
            }
        }).error(function(data, status) {
            if (status == 404) {
                $location.path("/s404");
            } else if (status != 500) {
                $location.path("/login");
            } else {
                $scope.errorMessage = data;
                $scope.showMessage = true;
            }
        });
    };

    $scope.edit = function() {
        $http.put('/index.php/api/v1/authors/' + $scope.newAuthor.id, $scope.newAuthor).success(function(data) {
            if(data.success) {
                $location.path('/authors');
            } else {
                $scope.errorMessage = data.message;
                $scope.showMessage = true;
            }
        }).error(function(data, status) {
            if (status == 404) {
                $location.path("/s404");
            } else if (status != 500) {
                $location.path("/login");
            } else {
                $scope.errorMessage = data;
                $scope.showMessage = true;
            }
        });
    };

    $scope.delete = function(index) {
        if(!confirm('Sei sicuro di voler eliminare l\'autore ' + $scope.authors[index].name + ' ' + $scope.authors[index].surname + '?')) return;

        var elementId = $scope.authors[index].id;
        $http.post('/index.php/api/v1/authors/' + elementId + '/delete/').success(function(data) {
            $scope.authors.splice(index, 1);
        }).error(function(data, status) {
            if (status == 404) {
                $location.path("/s404");
            } else if (status != 500) {
                $location.path("/login");
            } else {
                $scope.errorMessage = data;
                $scope.showMessage = true;
            }
        });
    };


    $scope.init();

});
