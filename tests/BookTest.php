<?php

/**
 * Created by PhpStorm.
 * User: antonio
 * Date: 03/11/2015
 * Time: 12:13
 */
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;


class BookTest extends TestCase
{
//    use DatabaseMigrations;
    use WithoutMiddleware;

    public function testBookCreate()
    {
        $data = $this->getData();
        $this->post('/api/v1/books', $data);
            //->seeJsonEquals(['created' => true]);
    }


    public function getData($custom = array())
    {
        $data = [
            'title' => 'Il Piccolo Principe'
        ];

        //$data = array_merge($data, $custom);
        return $data;
    }

}
