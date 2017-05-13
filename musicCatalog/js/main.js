'use strict';

//define database variable;

var db;
var getAlbumsButton = document.getElementById('getTracks');
//check if indexDB exists

function isIndexedDBOK(){
    return 'indexedDB' in window;
}
document.addEventListener('DOMContentLoaded', function(){
    if(!isIndexedDBOK()){
        return;
    }

    var openRequest = indexedDB.open('albumDB', 1);

    openRequest.onupgradeneeded = function(event){
        var albumdb = event.target.result;
        console.log('ran onupgradeneeded.');
        if(!albumdb.objectStoreNames.contains('album')){
           /* console.log('created OS');*/
            albumdb.createObjectStore('album', {autoincrement: true});
        }
    };

    openRequest.onsuccess = function(event){
        console.log('running success');
        console.log(event.target.result);
        db = event.target.result;
        //listen for button click to get albums
        getAlbumsButton.addEventListener('click', handleGetAlbums, false);
    };

    openRequest.onerror = function(event){
        console.log('error opening db.');
    };
});

/* get tracks */




function handleGetAlbums(event){
    event.preventDefault();
    var apiUrl = 'https://freemusicarchive.org/featured.json';
    var apikey = 'QDTD0EUO6ZIFDJMW';
    var limit = '5';
    var callingURL = apiUrl + '?' + 'api_key=' + apikey + '&' + 'limit=' + limit;
    var isTracksLocal = db.objectStoreNames.contains('album');
    if(!isTracksLocal){
        console.log(isTracksLocal);
        /*var apiUrl = 'https://freemusicarchive.org/featured.json';
        var apikey = 'QDTD0EUO6ZIFDJMW';
        var limit = '5';
        var callingURL = apiUrl + '?' + 'api_key=' + apikey + '&' + 'limit=' + limit;

        //ajx call to music api
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 200){

                //show area for track listing

                var artistTable = document.querySelector('.artist-table');
                artistTable.classList.remove('hidden');

                //append album data from response
                var artistTableBody = artistTable.querySelector('tbody');
                var responseObject = JSON.parse(xhr.response);
                var tracks = responseObject.aTracks;
                var i;

                for(i = 0; i < tracks.length; i++){
                    var title = tracks[i].album_title;
                    var artistName = tracks[i].artist_name;
                    var artistWebsite = tracks[i].artist_website;
                    if(!title){
                        title = 'No Title';
                    }
                    if(!artistName){
                        artistName = 'Unknown Artist';
                    }
                    if(!artistWebsite){
                        artistWebsite = 'No Website';
                    }
                    var trackInfoString = '<tr>';
                    trackInfoString += '<td>'+title+'</td>';
                    trackInfoString += '<td>'+artistName+'</td>';
                    trackInfoString += '<td>'+artistWebsite+'</td>';
                    trackInfoString += '</tr>';
                    artistTableBody.innerHTML += trackInfoString;
                }
            }
        };
        xhr.open('GET', callingURL);
        xhr.send();*/
    }else{
        console.log('exists!');


        //ajx call to music api
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 200){

                //show area for track listing

                var artistTable = document.querySelector('.artist-table');
                artistTable.classList.remove('hidden');

                //append album data from response
                var artistTableBody = artistTable.querySelector('tbody');
                var responseObject = JSON.parse(xhr.response);
                var tracks = responseObject.aTracks;
                var i;

                for(i = 0; i < tracks.length; i++){
                    var albumInfo = {
                        title : tracks[i].album_title,
                        name : tracks[i].artist_name,
                        website : tracks[i].artist_website
                    };

                    //start a transaction
                    var transaction = db.transaction(['album'], 'readwrite');

                    //ask for object store
                    var store = transaction.objectStore('album');

                    //perform add

                    var request = store.add(albumInfo);

                    //success handler

                    request.onsuccess = function(event){
                        console.log('album added.')
                    };

                    //error handler

                    request.onerror = function(event){
                        console.log('Error ' + event.target.error.name);
                    };

                    /*var title = tracks[i].album_title;
                    var artistName = tracks[i].artist_name;
                    var artistWebsite = tracks[i].artist_website;
                    if(!title){
                        title = 'No Title';
                    }
                    if(!artistName){
                        artistName = 'Unknown Artist';
                    }
                    if(!artistWebsite){
                        artistWebsite = 'No Website';
                    }
                    var trackInfoString = '<tr>';
                    trackInfoString += '<td>'+title+'</td>';
                    trackInfoString += '<td>'+artistName+'</td>';
                    trackInfoString += '<td>'+artistWebsite+'</td>';
                    trackInfoString += '</tr>';
                    artistTableBody.innerHTML += trackInfoString;*/
                }
            }
        };
        xhr.open('GET', callingURL);
        xhr.send();

    }
}

/* end get tracks */