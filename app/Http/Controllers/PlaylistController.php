<?php

namespace Spotify2\Http\Controllers;

use Illuminate\Http\Request;
use Spotify2\Song;
use Spotify2\User;
use Spotify2\Playlist;


use Illuminate\Support\Facades\Auth;

class PlaylistController extends Controller
{
    public function show(){
        $user = Auth::user()->id;
        $user = User::find($user);
        return json_encode($user);
    }

    public function store(Request $request)
    {
        $user = Auth::user()->id;
        $user = User::find($user);

        $playlist = new Playlist;
        $playlist->name = $request->playlist;
        $playlist->preview_pic = "img/blank_playlist.png";
        $playlist->id_playlist = md5(uniqid($user->username,true));
        $user->playlists()->save($playlist);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        foreach($user->playlists as $playlist)
            if($request->playlist === $playlist->id_playlist){
                $playlist->name = $request->new_name;
                $playlist->save();
                return;
            }
    }

    
    public function destroy(Request $request)
    {
        $nPlaylist = 0;
        $user = Auth::user();
        foreach($user->playlists as $playlist){
            $nPlaylist++;
        if($request->playlist === $playlist->id_playlist){
            $playlist->delete();
            $user->playlists()->destroy($playlist);
        }
    }

        if(($nPlaylist-1) === 0){
            $playlist = new Playlist;
            $playlist->name = "Nuova playlist";
            $playlist->preview_pic = "img/blank_playlist.png";
            $playlist->id_playlist = md5(uniqid($user->username,true));
            $user->playlists()->save($playlist);
        }
    }

    public function removeSong(Request $request)
    {
        $user = Auth::user();

        foreach($user->playlists as $playlist)
        if($request->playlist === $playlist->id_playlist)
            foreach($playlist->songs as $song)
                if($song->id_song === $request->song){
                    $song->delete();
                    $playlist->songs()->destroy($song);
                }

        foreach($user->playlists as $playlist)
            if($request->playlist === $playlist->id_playlist){
                foreach($playlist->songs as $song){
                    $playlist->preview_pic = $song->img;
                    $playlist->save();
                    return;
                } 
                
                $playlist->preview_pic = "img/blank_playlist.png";
                $playlist->save();
            }
    }
}