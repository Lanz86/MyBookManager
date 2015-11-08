<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;
use Validator;
use JWTAuth;

class BooksController extends Controller
{
    private $rules = [
    'title' => 'required',
    'isbn' => 'required',
    'description' => 'required',
    ];

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $books = Book::all()->load('authors')->where('user_id', $user->id);
        return $books;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();



        $book =  $request->all();

        $book['user_id'] = $user->id;

        $validator = Validator::make($book, $this->rules);

        if($validator->fails()) {
            return [
                'success' => false,
                'message'  => $validator->errors()->all()
            ];
        }

        $book = Book::create($book);

        $authorsId = [];

        foreach($request->all()['authors'] as $author) {
            $authorsId[] = $author['id'];
        }

        $book->authors()->sync($authorsId);

        return  ['success' => true, 'message' => $book];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        return Book::where('user_id', '=', $user->id)->findOrFail($id)->load('authors');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $validator = Validator::make($request->all(), $this->rules);

        if($validator->fails()) {
            return [
                'success' => false,
                'message'  => $validator->errors()->all()
            ];
        }

        $book = Book::where('user_id', '=', $user->id)->findOrFail($id);

        $book->update($request->all());

        $authorsId = [];

        foreach($request->all()['authors'] as $author) {
            $authorsId[] = $author['id'];
        }

        $book->authors()->sync($authorsId);

        return  ['success' => true, 'message' => $book];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $book = Book::where('user_id', '=', $user->id)->findOrFail($id);

        Book::destroy($book->id);
        return ['success' => true];
    }
}
