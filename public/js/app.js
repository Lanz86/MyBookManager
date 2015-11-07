/**
 * Created by Antonio on 04/11/2015.
 */
var app = angular.module('myBookManagerApp', ['ngRoute', 'checklist-model'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/books', {templateUrl: 'js/partials/books.html', controller: 'BooksController'}).
            when('/books/add', {templateUrl: 'js/partials/add_book.html', controller: 'BooksController'}).
            when('/books/edit/:id', {templateUrl: 'js/partials/add_book.html', controller: 'BooksController'}).
            when('/author/add', {templateUrl: 'js/partials/add_author.html', controller: 'AuthorsController'}).
            otherwise({redirectTo: '/books'});
    }]);