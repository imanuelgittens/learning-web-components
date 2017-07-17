/*********************************
 ***Methods For Retrieving and Listing all Movies**
 * ********************************/

mv.v.retrieveAndListAllMovies = {
  setupUserInterface: function(){
    var tableBodyEl = document.querySelector('#allMovies > tbody');
    var keys;
    var key = '';
    var row = {};
    var i;
    //load all movie objects
    mv.m.Movie.retrieveAll();
    keys = Object.keys(mv.m.Movie.instances);
    //for each movie, create a table row with a cell for each attribute
    for(i = 0; i < keys.length; i++){
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = mv.m.Movie.instances[key].movieNo;
      row.insertCell(-1).textContent = mv.m.Movie.instances[key].title;
      row.insertCell(-1).textContent = mv.m.Movie.instances[key].movieLength;
      row.insertCell(-1).textContent = mv.m.Movie.instances[key].dateReleased;
    }
  }
}