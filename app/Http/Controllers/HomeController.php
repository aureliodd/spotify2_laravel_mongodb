<?php

namespace Spotify2\Http\Controllers;

use Spotify2\User;
use Spotify2\Playlist;
use Spotify2\Song;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = Auth::user()->id;
        $user = User::find($user);
        return view("home", ["user"=> $user]);
    }
}
