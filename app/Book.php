<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{

    protected $fillable = ['title', 'isbn', 'description', 'user_id'];

    /**
     * Get Authors
     */
    public function authors() {
        return $this->belongsToMany('App\Author');
    }
}
