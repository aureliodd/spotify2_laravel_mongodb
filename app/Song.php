<?php

namespace Spotify2;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Song extends Eloquent
{
    protected $connection = 'mongodb';

    protected $fillable = [
        'title', 'img', 'album', 'artists', 'length', "id_song"
    ];
}