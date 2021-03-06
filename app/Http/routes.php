<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::post('api/v1/register', 'TokenAuthController@register');
Route::post('api/v1/authenticate', 'TokenAuthController@authenticate');
Route::get('api/v1/authenticate/user', 'TokenAuthController@getAuthenticatedUser');


Route::post('api/v1/authors/{id}/delete', 'AuthorsController@destroy');
Route::post('api/v1/books/{id}/delete', 'BooksController@destroy');

Route::group(array('prefix' => 'api/v1'), function() {
        Route::resource('books', 'BooksController');
    }
);

Route::group(array('prefix' => 'api/v1', ), function() {
        Route::resource('authors', 'AuthorsController');
    }
);

Route::get('/', function () {
    return redirect('/index.html#/books');
});
