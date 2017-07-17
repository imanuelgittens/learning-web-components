/*********************************
 ***Methods For deleting a Movie**
 * ********************************/

mv.v.deleteMovie = {
  setupUserInterface: function(){
    var formEl = document.getElementById('deleteMovie');
    var selectEl = formEl.movieSelect;
    var deleteButton = formEl.commit;

    var key = '';
    var keys;
    var movie = null;
    var optionEl = null;
    var i;
    //load all movies
    mv.m.Movie.retrieveAll();
    //populate the selection list
    keys = Object.keys(mv.m.Movie.instances);
    for(i = 0; i < keys.length; i++){
      key = keys[i];
      movie = mv.m.Movie.instances[key];
      optionEl = document.createElement('option');
      optionEl.text = movie.title;
      optionEl.value = movie.movieNo;
      selectEl.add(optionEl, null);
    }

    //when a movies is selected, populate the fields with that movie's data
    selectEl.addEventListener('change', function(){
      var movie = null;
      var key = selectEl.value;
      if(key){
        movie = mv.m.Movie.instances[key];
        formEl.movieNumber.value = movie.movieNo;
        formEl.movieTitle.value = movie.title;
        formEl.movieLength.value = movie.movieLength;
        formEl.movieDateReleased.value = movie.dateReleased;
      }else{
        formEl.reset();
      }
    });
    //set a click event handler for the save button
    deleteButton.addEventListener('click', mv.v.deleteMovie.handleDeleteButtonClickEvent);
    //setup event handler for when the browser/window is closed
    window.addEventListener('beforeunload', mv.m.Movie.saveAll);
  },
  //save data
  handleDeleteButtonClickEvent: function(){
    var formEl = document.getElementById('deleteMovie');
    var selectEl = document.getElementById('movieSelect');
    var movie = selectEl.value;
    if(movie){
      mv.m.Movie.destroy(movie);
      //remove the deleted movie from selected options
      selectEl.remove(selectEl.selectedIndex);
    }else{
      console.log('No Movie selected.');
    }
    formEl.reset();
  }
}