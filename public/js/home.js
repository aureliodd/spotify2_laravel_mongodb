function hideOverlay(){
    document.removeEventListener("keypress",clickRename);
    document.removeEventListener("keypress",clickAdd);
    document.removeEventListener("keypress",clickDelete);
    renameText.value = "";
    newText.value = "";
    errRename.classList.replace("show_block","hidden");
    errAdd.classList.replace("show_block","hidden");
    add.classList.replace("show_block","hidden");
    document.querySelector("#remove").classList.replace("show_block","hidden");
    rename.classList.replace("show_block","hidden");
    infoSong.classList.replace("show_block","hidden");
    document.body.classList.remove("no-scroll");
    event.currentTarget.classList.replace("show_flex", "hidden");
    event.currentTarget.querySelector(".overlay_div").classList.replace("show_flex","hidden");
    event.stopPropagation();
}

function playlistRename(){
    if(renameText.value !== ""){
        let form = new FormData();
        form.append("playlist",event.target.value);
        form.append("new_name",rename.querySelector("#rename_text").value);

        fetch("/rename_playlist",{method:'post', headers:header, body:form})
        .then(function(){
            document.location.reload(true);
        });
    } else {
        errRename.classList.replace("hidden", "show_block");
        event.preventDefault();
    }
}

function addPlaylist(){
    if(newText.value !== ""){
        let form = new FormData();
        form.append("playlist",newText.value);
        fetch("/add_playlist",{method: 'post', headers:header, body:form})
        .then(function(){
            document.location.reload(true);
        });
    } else {
        errAdd.classList.replace("hidden","show_block");
        event.preventDefault();
    }
}

function deletePlaylist(){
    let form = new FormData();
    form.append("playlist", yesBtn.value);
    fetch("/delete_playlist", {method: 'post', headers:header, body:form})
    .then(function(){
        document.location.reload(true);
    });
}

function deleteSong(event){
    console.log(event.target.dataset);
    let form = new FormData();
    form.append("playlist",event.target.dataset.playlist);
    form.append("song", event.target.dataset.song);
    fetch("/delete_song", {method: 'post', headers:header, body:form})
    .then(function(){
        document.location.reload(true);
    });
}

function clickAdd(e){
    if(e.keyCode === 13)
        buttonAdd.click();
}

function clickRename(e){
    if(e.keyCode === 13)
        buttonRename.click();
}


function clickDelete(e){
    if(e.keyCode === 13)
        buttonRename.click();
}

function overlay_song(){
    overlay.addEventListener('click', hideOverlay);
    overlay.classList.replace("hidden","show_flex");
    infoSong.classList.replace("hidden","show_block");
    infoSong.addEventListener("click", event => event.stopPropagation());
    infoSong.querySelector(".song-info-name").innerHTML = event.currentTarget.dataset.title;
    infoSong.querySelector(".song-info-img").src = event.currentTarget.dataset.img;
    infoSong.querySelector(".song-info-album").innerHTML = event.currentTarget.dataset.album;
    infoSong.querySelector(".song-info-length").innerHTML = event.currentTarget.dataset.length;
    infoSong.querySelector(".song-info-artists").innerHTML = event.currentTarget.dataset.artists;
    infoSong.querySelector(".info-song-delete").dataset.playlist = event.currentTarget.dataset.playlist;
    infoSong.querySelector(".info-song-delete").dataset.song = event.currentTarget.dataset.song;
    infoSong.querySelector(".info-song-delete").addEventListener("click", deleteSong);
}

function overlay_delete(event){
    document.body.classList.add("no-scroll");

    overlay.addEventListener('click', hideOverlay);
    rename.addEventListener('click', event => event.stopPropagation());
    
    const remove = document.querySelector("#remove");
    remove.addEventListener('click', event => event.stopPropagation());
    overlay.classList.replace('hidden', 'show_flex');
    remove.classList.replace('hidden', 'show_block');
    event.stopPropagation();

    yesBtn.value = event.target.dataset.playlist;
    yesBtn.addEventListener('click', deletePlaylist);
    
    noBtn.addEventListener('click', function hide(){
        document.body.classList.remove("no-scroll");
        remove.classList.replace("show_block","hidden");
        overlay.classList.replace("show_flex","hidden");
    });
    document.addEventListener("keypress", clickDelete);
}

function overlay_rename(){
    overlay.classList.replace("hidden","show_flex");
    rename.classList.replace("hidden","show_block");
    
    document.body.classList.add("no-scroll");
    buttonRename.value = event.target.dataset.playlist;
    buttonRename.addEventListener("click", playlistRename);

    rename.addEventListener("click", event => event.stopPropagation());
    overlay.addEventListener('click', hideOverlay);

    document.addEventListener("keypress", clickRename);

    event.stopPropagation();
}

function overlay_add(){
    document.body.classList.add("no-scroll");
    add.addEventListener('click', event => event.stopPropagation());
    overlay.addEventListener('click', hideOverlay);

    overlay.classList.replace('hidden', 'show_flex');
    add.classList.replace('hidden', 'show_block');

    buttonAdd.addEventListener('click', addPlaylist);
    document.addEventListener("keypress", clickAdd);
}

function hideSongs(event){
    let divPlaylistSongs = document.querySelector(".playlist-songs[data-playlist='"+ event.target.dataset.playlist +"']");
    let songName = document.querySelector(".album-name[data-playlist='"+ event.target.dataset.playlist +"']");
    let songImage = document.querySelector(".preview_pic[data-playlist='"+ event.target.dataset.playlist +"']");
    
    divPlaylistSongs.classList.replace('show_flex','hidden');

    songName.removeEventListener('click', hideSongs);
    songImage.removeEventListener('click', hideSongs);
    songName.addEventListener('click', showSongs);
    songImage.addEventListener('click', showSongs);
}

function showSongs(){
    let divPlaylistSongs = document.querySelector(".playlist-songs[data-playlist='"+ event.target.dataset.playlist +"']");
    let songName = document.querySelector(".album-name[data-playlist='"+ event.target.dataset.playlist +"']");
    let songImage = document.querySelector(".preview_pic[data-playlist='"+ event.target.dataset.playlist +"']");

    divPlaylistSongs.classList.replace('hidden','show_flex');
    
    songName.removeEventListener('click', showSongs);
    songImage.removeEventListener('click', showSongs);
    songName.addEventListener('click', hideSongs);
    songImage.addEventListener('click', hideSongs);
}

let csrf = document.querySelector('meta[name="csrf-token"]').content;
const header = new Headers();
header.append("X-CSRF-Token", csrf);

const overlay = document.querySelector("#overlay");

const add_playlist = document.querySelector("#add_playlist"); //bottone "agiungi playlist"
const add = document.querySelector("#add"); //div form add
const buttonAdd = document.querySelector("#do_add"); //bottone per confermare l'aggiunta
add_playlist.addEventListener('click', overlay_add);

const rename = document.querySelector("#rename");
const buttonRename = document.querySelector("#rename_but");
const errRename = document.querySelector("#errRename");
const renameText = document.querySelector("#rename_text");

const newText = document.querySelector("#new_playlist_name");

const btnRename = document.querySelectorAll(".ren-pl");
for(let b of btnRename)
    b.addEventListener("click", overlay_rename);

const playlist_del = document.querySelectorAll(".del-pl");
for(const p of playlist_del)
    p.addEventListener("click",overlay_delete);

const yesBtn = document.querySelector("#si");
const noBtn = document.querySelector("#no");

const previewPics = document.querySelectorAll(".preview_pic");
for(previewPic of previewPics)
    previewPic.addEventListener("click", showSongs);

    
const albumNames = document.querySelectorAll(".album-name");
for(albumName of albumNames)
    albumName.addEventListener("click", showSongs);



const infoSong = document.querySelector("#song-info")
const songs = document.querySelectorAll(".song_card");
for(song of songs)
    song.addEventListener("click", overlay_song);