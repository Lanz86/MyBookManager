/**
 * Created by Antonio on 04/11/2015.
 */
var app = angular.module('myBookManagerApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/books', {templateUrl: 'js/partials/books.html', controller: 'BooksController'}).
            otherwise({redirectTo: '/books'});
    }]);