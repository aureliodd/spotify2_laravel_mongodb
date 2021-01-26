<?php

namespace Spotify2\Http\Controllers;

use Spotify2\User;
use Spotify2\Song;
use Spotify2\Playlist;
use Illuminate\Http\Request;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = User::find($request->user);
        foreach($user->playlists as $playlist)
            if($playlist->id_playlist === $request->playlist){
                $playlist->preview_pic = $request->img;
                $song = new Song();
                $song->id_song = $request->id;
                $song->album = $request->album;
                $song->img = $request->img;
                $song->title = $request->titolo;
                $song->artists = $request->artisti;
                $song->length = $request->durata;
                foreach($playlist->songs as $s)
                    if($request->id === $s->id_song)
                        return; 
                
               $playlist->songs()->associate($song);
               $playlist->save();
            }
    }

    /**
     * Display the specified resource.
     *
     * @param  \Spotify2\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function show(Song $song)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Spotify2\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function edit(Song $song)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Spotify2\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Song $song)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Spotify2\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function destroy(Song $song)
    {
        //
    }
}
