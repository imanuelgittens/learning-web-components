/*********************************
 ***Methods For updating a Movie**
 * ********************************/

mv.v.updateMovie = {
  setupUserInterface: function(){
    var formEl = document.getElementById('updateMovie');
    var selectEl = formEl.movieSelect;
    var saveButton = formEl.commit;

    var key = '';
    var keys = [];
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
      //console.log('trige')
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
    saveButton.addEventListener('click', mv.v.updateMovie.handleSaveButtonClickEvent);
    //setup event handler for when the browser/window is closed
    window.addEventListener('beforeunload', mv.m.Movie.saveAll);
  },
  //save data
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('updateMovie');
    var slots = {
      movieNo: parseInt(formEl.movieNumber.value),
      title: formEl.movieTitle.value,
      movieLength: formEl.movieLength.value,
      dateReleased: formEl.movieDateReleased.value
    }
    mv.m.Movie.update(slots);
    formEl.reset();
  }
}