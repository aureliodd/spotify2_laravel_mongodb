@extends('layouts.app')
@extends('layouts.sidebar')
<link rel="stylesheet" href="{{ asset('css/home.css') }}">
<script src="{{ asset('js/home.js') }}" defer></script>
@section('content')
<div class="container main">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Le tue playlist</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @foreach ($user->playlists as $p)
                    <div class= "row">
                        <div class="col-4">
                            <img src="{{ $p->preview_pic }}" class="img-thumbnail preview_pic" data-playlist="{{ $p->id_playlist }}">
                        </div>
                        <div class= "col-8 ">
                            <span class="album-name" data-playlist="{{ $p->id_playlist }}">{{ $p->name }}</span>
                            <img src="{{ asset('/img/modify.png') }}" class="little_img ren-pl" data-playlist="{{ $p->id_playlist }}">
                            <img src="{{ asset('/img/bin.png') }}" class="little_img del-pl" data-playlist="{{ $p->id_playlist }}">
                            
                            
                        </div>
                        <div class="hidden px-3 py-2 playlist-songs" data-playlist="{{ $p->id_playlist }}">
                            @if(count($p->songs)>0)
                            @foreach($p->songs as $song)
                            <div class="song_card card" data-playlist="{{ $p->id_playlist }}" data-song="{{ $song->id_song }}" data-img="{{ $song->img }}" data-title="{{ $song->title }}" data-album="{{ $song->album }}" data-artists="{{ $song->artists }}" data-length="{{ $song->length }}">
                                    <img src="{{ $song->img }}" class ="img-thumbnail">
                                    <div class="song-name pt-1">{{ $song->title }}</div>
                            </div>
                            @endforeach
                            @else
                            <div class="px-2 py-2">Nessuna canzone nella playlist...</div>
                            @endif
                        </div>
                    </div>
                    <div class="separator"></div>
                    @endforeach
                    <div>
                    <button id="add_playlist" class="btn btn-secondary btn-lg btn-block">Nuova playlist</button>
                    </div>
                </div>
            </div>
                    
                    

            <div id = "overlay" class = "hidden">
                <div id ="add" class = "overlay_div hidden">
                    <div class="card-header">Aggiunta playlist</div>
                    <div class="px-3 py-2">
                        <label><input placeholder="Nome playlist" class="form-control" type="text" id = "new_playlist_name" tabindex = "-1"></label>
                        <label><button id = "do_add" class="btn btn-secondary">Crea Playlist</button></label>
                        <p id = "errAdd" class = "hidden px-3">Inserire il nome della playlist</p>
                    </div>
                </div>

                <div id = "remove" class = "overlay_div hidden">
                    <div class="card-header">Vuoi davvero cancellare la playlist?</div>
                    <div class="px-3 py-2">
                        <button id = "si" value = "sì" class="btn btn-danger btn-lg mx-1">Sì</button>
                        <button id = "no" value = "No" class="btn btn-secondary btn-lg mx-1">No</button>
                    </div>
                </div>

                <div id = "rename" class = "overlay_div hidden">
                    <div class="card-header">Rinomina playlist</div>
                    <div class="px-3 py-2">
                        <label><input placeholder="Nuovo nome" type="text" id = "rename_text" class="form-control"></label>
                        <label><button id = "rename_but" class="btn btn-secondary">Rinomina</button></label>
                    </div>
                    <p id = "errRename" class = "hidden px-3">Inserire il nuovo nome della playlist</p>
                </div>

                <div id="song-info" class = "overlay_div hidden">
                    <div class="card-header song-info-name"></div>
                    <div class="px-3 py-2">
                        <img class = "song-info-img">
                        <div><b>Album: </b><span class="song-info-album"> </span></div>
                        <div><b>Artisti: </b> <span class="song-info-artists"></span></div>
                        <div><b>Durata: </b> <span class="song-info-length"></span></div>
                        <button class="btn btn-secondary info-song-delete btn-block">Elimina dalla playlist</button>
                    </div>
                </div>
            </div>
            </div>


        </div>
    </div>
</div>
@endsection
