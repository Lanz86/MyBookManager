<?php

namespace App\Http\Controllers;

use App\Author;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;
use Validator;
use JWTAuth;

class AuthorsController extends Controller
{
    private $rules = [
        'name' => 'required',
        'surname' => 'required',
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
        $authors = Author::all();
        return Response::json($authors, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules);

        if($validator->fails()) {
            return [
                'success' => false,
                'message'  => $validator->errors()->all()
            ];
        }

        $author = Author::create($request->all());
        return  [
                    'success' => true,
                    'data' => $author
                ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Author::findOrFail($id);
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
        $author = Author::findOrFail($id);

        $validator = Validator::make($request->all(), $this->rules);

        if($validator->fails()) {
            return [
                'success' => false,
                'message'  => $validator->errors()->all()
            ];
        }

        $author->update($request->all());

        return  ['success' => true, 'message' => $author];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Author::destroy($id);

        return  ['success' => true];

    }
}
