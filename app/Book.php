<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{

    /**
     * Get Authors
     */
    public function authors() {
        return $this->belongsToMany('App\Author');
    }
}
