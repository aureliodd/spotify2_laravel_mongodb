@extends('layouts.app')
@extends('layouts.sidebar')
<link rel="stylesheet" href="{{ asset('css/search.css') }}">
<script src="{{asset ('js/search.js')}}" defer></script>
@section('content')
<div class="container main">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Ricerca</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                            <div id="searchdiv" class="form-inline">
                                <input id="searchbar" placeholder="inserisci testo da cercare" type="text" class="form-control form-group mx-sm-3 mb-2 searchbar">
                                <button id="searchbtn" class="btn btn-secondary mb-2">Cerca</button>
                            </div>

                    <div id="resultsection" class="mt-2 hidden"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
