/**
 * Created by Antonio on 04/11/2015.
 */
var app = angular.module('myBookManagerApp', ['ngRoute', 'satellizer'])
    .config(function($routeProvider, $authProvider, $provide) {

        $authProvider.loginUrl = '/api/v1/authenticate';

        $routeProvider.
            when('/login', { templateUrl: '/js/partials/login.html', controller: 'AuthController' }).
            when('/register', { templateUrl: '/js/partials/register.html', controller: 'AuthController' }).
            when('/books', {templateUrl: 'js/partials/books.html', controller: 'BooksController'}).
            when('/books/add', {templateUrl: 'js/partials/add_book.html', controller: 'BooksController'}).
            when('/books/edit/:id', {templateUrl: 'js/partials/add_book.html', controller: 'BooksController'}).
            when('/authors', {templateUrl: 'js/partials/authors.html', controller: 'AuthorsController'}).
            when('/authors/add/', {templateUrl: 'js/partials/add_author.html', controller: 'AuthorsController'}).
            when('/authors/edit/:id', {templateUrl: 'js/partials/add_author.html', controller: 'AuthorsController'}).
            when('/s404', {templateUrl: 'js/partials/s404.html'}).
            otherwise({redirectTo: '/books'});

        function redirectWhenLoggedOut($q, $injector) {
            console.log('ciao');
            return {
                responseError: function (rejection) {
                    var $state = $injector.get('$routeProvider');
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                    angular.forEach(rejectionReasons, function (value, key) {
                        if (rejection.data.error === value) {
                            localStorage.removeItem('user');
                            $routeProvider.path('/login');
                        }
                    });

                    return $q.reject(rejection);
                }
            }
        }

        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    });
