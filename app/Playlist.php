<?php

namespace Spotify2;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Playlist extends Eloquent
{

    protected $connection = 'mongodb';

    protected $fillable = [
        'name', 'preview_pic', 'id_playlist'
    ];

    public function songs()
    {
        return $this->embedsMany(Song::class);
    }
}
