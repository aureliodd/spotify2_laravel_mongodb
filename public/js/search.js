function songDuration(duration){
    let seconds = parseInt((duration/1000)%60);
    let minutes = parseInt((duration/(1000*60))%60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return  minutes + ":" + seconds
}

function hidePlaylists(event){
    event.target.addEventListener('click',showPlaylists);
    event.target.removeEventListener('click',hidePlaylists);
    event.target.parentNode.querySelector(".dropped_div").classList.replace("show_block","hidden");
}

function addToPlaylist(){
    event.target.parentNode.classList.replace("show_block","hidden");
    event.currentTarget.parentNode.parentNode.querySelector(".drop_button").removeEventListener("click",hidePlaylists);
    event.currentTarget.parentNode.parentNode.querySelector(".drop_button").addEventListener("click",showPlaylists);
    let i = event.target.dataset.song;
    let form = new FormData();
    form.append("user",event.target.dataset.user);
    form.append("playlist",event.target.dataset.playlist);
    form.append("id", results[i].id);
    form.append("img", results[i].songImg);
    form.append("titolo", results[i].songName);
    form.append("album", results[i].album);
    form.append("artisti", results[i].artists);
    form.append("durata", results[i].duration);


    fetch("/add_song", {method: 'post', headers:header, body:form})
    .then(function onResponseTxt(response){
        return response.text();
    });
}

function showPlaylists(event){
    event.target.removeEventListener('click',showPlaylists);
    event.target.addEventListener('click',hidePlaylists);
    
    fetch("/show_playlists",{method: "get", headers:header})
    .then(onResponseJson)
    .then(function onJsonPlaylists(json){
        let droppedDiv = document.createElement("div");
        droppedDiv.classList.add("dropped_div","show_block");
        let divAdd = event.target.parentNode;
        let toRemove = divAdd.querySelectorAll(".dropped_div");
        divAdd.appendChild(droppedDiv);
    
        for(let remove of toRemove){
            divAdd.removeChild(remove);
        }
        
        for(let element of json.playlists){
            let droppedButton = document.createElement("button");
            droppedButton.classList.add("btn", "btn-secondary","dropped_button");
    
            droppedButton.innerHTML = element.name;
            droppedButton.dataset.user = json._id;
            droppedButton.dataset.playlist = element.id_playlist;
            droppedButton.dataset.song = event.target.dataset.song;
            droppedButton.addEventListener('click',addToPlaylist);
            droppedDiv.appendChild(droppedButton);
            console.log(droppedButton.dataset);
        }
     });
}

function onJsonResult(json){

    while(resultSection.firstChild)
        resultSection.removeChild(resultSection.firstChild);

        if(json.tracks.items.length !== 0){
            for(result of json.tracks.items){
            
                let divResult = document.createElement("div");
                divResult.classList.add("div_result", "card");
                divResult.dataset.song = json.tracks.items.indexOf(result);
    
                let aux;
    
                for(let artist of result.artists){
                    if(result.artists.indexOf(artist) === 0)
                        aux = artist.name;
                    else
                        aux += ", " + artist.name; 
                }
                
                let infoCanzoni = {
                    songImg : result.album.images[1].url, //[0] grande; [1] media; [2]piccola
                    songName : result.name,
                    album : result.album.name,
                    artists : aux,
                    duration : songDuration(result.duration_ms),
                    id : result.id,
                }
                
                results[json.tracks.items.indexOf(result)] = infoCanzoni;                
                
                let img = document.createElement("img");
                let divSongName = document.createElement("div");
    
                let divArtists = document.createElement("div");
                divArtists.classList.add("infosong");
                divArtists.innerHTML = "<b>Artisti:</b>";
                let artists = document.createElement("span");
    
                let divAlbum = document.createElement("div");
                divAlbum.classList.add("infosong");
                divAlbum.innerHTML = "<b>album: </b>";
                let album = document.createElement("span");

                let divId = document.createElement("div");
                divId.classList.add("infosong");
                divId.innerHTML = "<b>Id: </b>"
                let id = document.createElement("span");
    
                let divDurata = document.createElement("div");
                divDurata.classList.add("infosong");
                divDurata.innerHTML = "<b>Durata: </b>"
                let durata = document.createElement("span");
    
                img.classList.add("songImg", "img-thumbnail");
                divSongName.classList.add("songName");
                artists.classList.add("artists");
                id.classList.add("songId");
                durata.classList.add("duration");
                album.classList.add("album");    
                
                img.src =  infoCanzoni.songImg;
    
                divSongName.innerHTML = "<b>" + infoCanzoni.songName + "</b>";
    
                artists.innerHTML = aux;
                divArtists.appendChild(artists);

                id.innerHTML = infoCanzoni.id;
                divId.appendChild(id);

                durata.innerHTML = infoCanzoni.duration;
                divDurata.appendChild(durata);
    
                album.innerHTML = infoCanzoni.album;
                divAlbum.appendChild(album);
    
                let divAdd = document.createElement("div");
                divAdd.classList.add("dropdown");

                let dropDownButton = document.createElement("button");
                dropDownButton.dataset.song = json.tracks.items.indexOf(result);

                let dropdown_div = document.createElement("div");
                dropdown_div.classList.add("dropdown-menu");

                dropDownButton.classList.add("btn", "btn-secondary", "dropdown-toggle","btn-block", "drop_button");
                dropDownButton.value = "Aggiungi";
                dropDownButton.innerHTML = "Aggiungi ad una playlist";

                let divInfo =document.createElement("div");
                divInfo.classList.add("info-song")
                
                divResult.appendChild(img);
                divInfo.appendChild(divSongName);
                divInfo.appendChild(divArtists);
                divInfo.appendChild(divAlbum);
                divInfo.appendChild(divId);
                divInfo.appendChild(divDurata);
                divResult.appendChild(divInfo);
                divResult.appendChild(divAdd);
                resultSection.appendChild(divResult);
                
                divAdd.appendChild(dropDownButton);
                divAdd.appendChild(dropdown_div);

                dropDownButton.addEventListener("click",showPlaylists);
        } 
        } else {
            results = [];
            resultSection.innerHTML = "<span>Nessuna canzone trovata.</span>"
        }
        
        resultSection.classList.replace("hidden","show_flex");
}

function onResponseJson(json){
    return json.json();
}

function searchSong(){
    if(textToSearch.value !== ""){
        let form = new FormData();
        form.append("search",textToSearch.value);
        fetch("/do_search", {
            method: 'post',
            headers : header,
            body : form}).then(onResponseJson).then(onJsonResult);
    } else {
        results = [];
        resultSection.classList.replace("hidden","show_flex");
        resultSection.innerHTML = "<span>Inserire un testo da cercare.</span>"
    }
}

let csrf = document.querySelector('meta[name="csrf-token"]').content;
const header = new Headers();
header.append("X-CSRF-Token", csrf); //necessario token csrf per richiesta a laravel

let results = [];
const resultSection = document.querySelector("#resultsection");


const search = document.querySelector("#searchbtn");
search.addEventListener('click', searchSong);

const textToSearch = document.querySelector("#searchbar");
textToSearch.addEventListener('keyup',function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        search.click();
    }
});