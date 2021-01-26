<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');
Route::post('/add_playlist', 'PlaylistController@store')->middleware('auth');
Route::post('/rename_playlist', 'PlaylistController@update')->middleware('auth');
Route::post('/delete_playlist', 'PlaylistController@destroy')->middleware('auth');
Route::post('/delete_song', 'PlaylistController@removeSong')->middleware('auth');

Route::get('/search', function () {return view('search');})->middleware('auth');
Route::post('/do_search', 'SearchController@index')->middleware('auth');
Route::get('/show_playlists', 'PlaylistController@show')->middleware('auth');
Route::post('/add_song', 'SongController@store')->middleware('auth');