/**
 * Created by Antonio on 04/11/2015.
 */
var app = angular.module('myBookManagerApp', ['ngRoute', 'checklist-model'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/books', {templateUrl: 'js/partials/books.html', controller: 'BooksController'}).
            when('/books/add', {templateUrl: 'js/partials/add_book.html', controller: 'BooksController'}).
            when('/books/edit/:id', {templateUrl: 'js/partials/add_book.html', controller: 'BooksController'}).
            when('/authors', {templateUrl: 'js/partials/authors.html', controller: 'AuthorsController'}).
            when('/authors/add/', {templateUrl: 'js/partials/add_author.html', controller: 'AuthorsController'}).
            when('/authors/edit/:id', {templateUrl: 'js/partials/add_author.html', controller: 'AuthorsController'}).
            when('/s404', {templateUrl: 'js/partials/s404.html'}).
            otherwise({redirectTo: '/books'});
    }]);

app.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});