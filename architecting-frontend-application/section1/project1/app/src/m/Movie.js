/**
* @file overwiew: Contains definition of model class Movie
* @author: Imanuel Gittens
* */

mv.m.GenreEl = new eNUMERATION('GenreEl', ['Action', 'Animation', 'Comedy', 'Documentary', 'Drama', 'Family', 'Film-Noir', 'Horror', 'Musical', 'Romance']);
mv.m.MovieRatingEL = new eNUMERATION('MovieRatingEL', {'G': 'General Audiences', 'PG': 'Parental Guidance', 'PG13': 'Not Under 13', 'R': 'Restricted', 'PG17': 'Not Under 17'});



/**
* @Class
* */

mv.m.Movie = class{
  constructor(slots){
    //assign default values to mandatory properties
    this._movieNo = 0;
    this._title = '';
    this._movieLength = '';
    this._dateReleased = '';
    this._rating = '';
    this._genres = '';
    // is constructor invoked with a non-empty slots argument?
    if ( typeof slots === "object" && Object.keys( slots).length > 0) {
      this.movieNo = slots._movieNo;
      this.title = slots._title;
      this.movieLength = slots._movieLength;
      this.dateReleased = slots._dateReleased;
      this.rating = slots._rating;
      this.genres = slots._genres;
    }
  }

  get movieNo(){
    return this._movieNo;
  }

  static checkMovieNo(movieNum){
    if(movieNum === undefined){
      return new MandatoryValueConstraintViolation('A movie number must be provided.');
    }else if(!util.isIntegerOrIntegerString(movieNum) || parseInt(movieNum) < 1){
      return new RangeConstraintViolation('Movie number must be a number.');
    }/*else if(movieNum < 0){
     return new IntervalConstraintViolation('Movie number cannot be less than 0.')
     }*/else{
      return new NoConstraintViolation();
    }
  }

  static checkMovieNoAsId(movieNum){
    var validationResult = mv.m.Movie.checkMovieNo(movieNum);
    if((validationResult instanceof NoConstraintViolation)){
      if(movieNum === undefined){
        return new MandatoryValueConstraintViolation('A movie number must be provided.');
      }else if(mv.m.Movie.instances[String(movieNum)]){
        validationResult = new UniquenessConstraintViolation('That movie already exists.');
      }else{
        validationResult = new NoConstraintViolation();
      }
    }
    return validationResult;
  }

  set movieNo(movieNo){
    var validationResult = mv.m.Movie.checkMovieNoAsId(movieNo);
    if(validationResult instanceof NoConstraintViolation){
      this._movieNo = parseInt(movieNo);
    }else{
      throw validationResult;
    }
  }

  get title(){
    return this._title;
  }

  static checkTitle(title){
     if(title === undefined){
       return new MandatoryValueConstraintViolation('Title must be provided.')
     }else if(typeof title !== 'string'){
       return new RangeConstraintViolation('Title must be a string.');
     }else if(title.trim().length < 1 || title.trim().length > 250){
       return new IntervalConstraintViolation('Title cannot be less than 1 or longer than 250 characters.');
     }else{
       return new NoConstraintViolation();
     }
  }

  set title(title){
    var validationResult = mv.m.Movie.checkTitle(title);
    if(validationResult instanceof NoConstraintViolation){
      this._title = title;
    }else{
      throw validationResult;
    }
  }

  get movieLength(){
    return this._movieLength;
  }

  static checkMovieLength(length){
    if(length === undefined){
      return new MandatoryValueConstraintViolation('Length must be provided.')
    }else if(typeof length !== 'string'){
      return new RangeConstraintViolation('Length must be a string.');
    }else if(!/^\dh\s\d{2}min/i.test(length)){
      return new IntervalConstraintViolation('Length must be of the form {X}h {X}min where X is a number.');
    }else{
      return new NoConstraintViolation();
    }
  }

  set movieLength(movieLength){
    var validationResult = mv.m.Movie.checkMovieLength(movieLength);
    if(validationResult instanceof NoConstraintViolation){
      this._movieLength = movieLength;
    }else{
      throw validationResult;
    }
  }

  get dateReleased(){
    return this._dateReleased;
  }

  static checkDateReleased(dateReleased){
    if(dateReleased === undefined){
      return new MandatoryValueConstraintViolation('Release Date must be provided.')
    }/*else if(Object.prototype.toString.call(dateReleased) !== '[object Date]'){
     return new RangeConstraintViolation('Must be a valid date.');
     }*/else if(dateReleased.trim().length <= 0){
      return new IntervalConstraintViolation('Date cannot be empty.');
    }else{
      return new NoConstraintViolation();
    }
  }

  set dateReleased(releaseDate){
    var validationResult = mv.m.Movie.checkDateReleased(releaseDate);
    if(validationResult instanceof NoConstraintViolation){
      this._dateReleased = releaseDate;
    }else{
      throw validationResult;
    }
  }

  get rating(){
    return this._rating;
  }

  static checkRating(rating) {
    var max = mv.m.MovieRatingEL.MAX;
    if (!rating) {
      return new MandatoryValueConstraintViolation(
        "No rating  chosen/provided!");
    } else if (!util.isIntegerOrIntegerString(rating) ||
      parseInt(rating) < 1 || parseInt(rating) > max) {
      return new RangeConstraintViolation("Rating " +
        "must be one of "+ mv.m.MovieRatingEL.labels +" !");
    } else {
      return new NoConstraintViolation();
    }
  }

  set rating(rating) {
    var validationResult = mv.m.Movie.checkRating(rating);
    if (validationResult instanceof NoConstraintViolation) {
      this._rating = parseInt(rating);
    } else {
      throw validationResult;
    }
  }

  get genres(){
    return this._genres;
  }

  static checkGenre(genre) {
    var max = mv.m.GenreEl.MAX;
    //console.log(parseInt(genre))
    if (!util.isIntegerOrIntegerString(genre) || parseInt(genre) < 1 ||
      parseInt(genre > max)) {
      return new RangeConstraintViolation("Any item of the "+
        "genre list must be a positive " +
        "integer not greater than" + max + " !");
    } else return new NoConstraintViolation();
  }
  static checkGenres(genres) {
    var i=0, constraintViolation=null;
    if (genres === undefined ||
      (Array.isArray( genres) && genres.length === 0)) {
      return new MandatoryValueConstraintViolation("At least one "+
        "genre must be chosen/provided!");
    } else if (!Array.isArray( genres)) {
      return new RangeConstraintViolation(
        "The value the genres must be a list/array!");
    } else {
      for (i=0; i < genres.length; i++) {
        constraintViolation =
          mv.m.Movie.checkGenre( genres[i]);
        console.log(genres)
        //console.log(constraintViolation);
        if (!(constraintViolation instanceof NoConstraintViolation)) {
          return constraintViolation;
        }
      }
      return new NoConstraintViolation();
    }
  }

  set genres (genres) {
    var validationResult = mv.m.Movie.checkGenres(genres);
    if (validationResult instanceof NoConstraintViolation) {
      this._genres = genres;
    } else {
      throw validationResult;
    }
  }



}





/******************************************
 ******Class level (static) Properties*****
 * ***************************************/

//initially an empty collection in the form of a map

mv.m.Movie.instances = {};


/******************************************
 **********Checks and Setters**************
 * ***************************************/

// mv.m.Movie.checkMovieNo = function(movieNum){
//   if(movieNum === undefined){
//     return new MandatoryValueConstraintViolation('A movie number must be provided.');
//   }else if(!util.isIntegerOrIntegerString(movieNum) || parseInt(movieNum) < 1){
//     return new RangeConstraintViolation('Movie number must be a number.');
//   }/*else if(movieNum < 0){
//     return new IntervalConstraintViolation('Movie number cannot be less than 0.')
//   }*/else{
//     return new NoConstraintViolation();
//   }
// }

// mv.m.Movie.checkMovieNoAsId = function(movieNum){
//   var validationResult = mv.m.Movie.checkMovieNo(movieNum);
//   if((validationResult instanceof NoConstraintViolation)){
//     if(movieNum === undefined){
//       return new MandatoryValueConstraintViolation('A movie number must be provided.');
//     }else if(mv.m.Movie.instances[String(movieNum)]){
//       validationResult = new UniquenessConstraintViolation('That movie already exists.');
//     }else{
//       validationResult = new NoConstraintViolation();
//     }
//   }
//   return validationResult;
// }
//
// mv.m.Movie.checkTitle = function(title){
//   if(title === undefined){
//     return new MandatoryValueConstraintViolation('Title must be provided.')
//   }else if(typeof title !== 'string'){
//     return new RangeConstraintViolation('Title must be a string.');
//   }else if(title.trim().length < 1 || title.trim().length > 250){
//     return new IntervalConstraintViolation('Title cannot be less than 1 or longer than 250 characters.');
//   }else{
//     return new NoConstraintViolation();
//   }
// }

// mv.m.Movie.checkMovieLength = function(length){
//   if(length === undefined){
//     return new MandatoryValueConstraintViolation('Length must be provided.')
//   }else if(typeof length !== 'string'){
//     return new RangeConstraintViolation('Length must be a string.');
//   }else if(!/^\dh\s\d{2}min/i.test(length)){
//     return new IntervalConstraintViolation('Length must be of the form {X}h {X}min where X is a number.');
//   }else{
//     return new NoConstraintViolation();
//   }
// }

// mv.m.Movie.checkDateReleased = function(dateReleased){
//   if(dateReleased === undefined){
//     return new MandatoryValueConstraintViolation('Release Date must be provided.')
//   }/*else if(Object.prototype.toString.call(dateReleased) !== '[object Date]'){
//     return new RangeConstraintViolation('Must be a valid date.');
//   }*/else if(dateReleased.trim().length <= 0){
//     return new IntervalConstraintViolation('Date cannot be empty.');
//   }else{
//     return new NoConstraintViolation();
//   }
// }

// mv.m.Movie.prototype.setMovieNo = function(movieNo){
//   var validationResult = mv.m.Movie.checkMovieNoAsId(movieNo);
//   if(validationResult instanceof NoConstraintViolation){
//     this.movieNo = movieNo;
//   }else{
//     throw validationResult;
//   }
// }

// mv.m.Movie.prototype.setTitle = function(title){
//   var validationResult = mv.m.Movie.checkTitle(title);
//   if(validationResult instanceof NoConstraintViolation){
//     this.title = title;
//   }else{
//     throw validationResult;
//   }
// }

// mv.m.Movie.prototype.setMovieLength = function(movieLength){
//   var validationResult = mv.m.Movie.checkMovieLength(movieLength);
//   if(validationResult instanceof NoConstraintViolation){
//     this.movieLength = movieLength;
//   }else{
//     throw validationResult;
//   }
// }

// mv.m.Movie.prototype.setDateReleased = function(releaseDate){
//   var validationResult = mv.m.Movie.checkDateReleased(releaseDate);
//   if(validationResult instanceof NoConstraintViolation){
//     this.dateReleased = releaseDate;
//   }else{
//     throw validationResult;
//   }
// }

/******************************************
 ******Other Instance Level Methods*****
 * ***************************************/

/**
 * serialize movie object
 * @method
 * */

mv.m.Movie.prototype.toString = function(){
  return 'Movie{ Movie number: ' + this.movieNo + ', Title: ' + this.title + ', Length: '+ this.movieLength + ', Date Released: ' + this.dateReleased + ', Rating: '+this.rating+', Genre(s): '+this.genres+'}';
}

/******************************************
 *******Class level (static) Methods*******
 ******************************************/

/**convert movie records to movie objects.
 * @method
 * */

mv.m.Movie.convertRecToObj = function(movieRec){
  //return new mv.m.Movie(movieRec);
  //console.log(movieRec)
  var movie={};
  try {
    movie = new mv.m.Movie(movieRec);
  } catch (e) {
    console.log( e.constructor.name + " while deserializing a record: " +
      e.message);
  }
  return movie;
}

/*Retrieve all movie records from local storage
*@method
 */
mv.m.Movie.retrieveAll = function(){

  var key="", keys=[], movieString="", movies={}, i=0;
  try {
    if (localStorage["movies"]) {
      movieString = localStorage["movies"];
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  //console.log(movieString)
  if (movieString) {
    movies = JSON.parse( movieString);

    keys = Object.keys( movies);
    //console.log(keys)
    console.log( keys.length +" movies loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      //console.log(key)
      mv.m.Movie.instances[key] =
        mv.m.Movie.convertRecToObj( movies[key]);
      //console.log(mv.m.Movie.instances[key]);
    }

  }
}

/*Save all movie records to local storage
* @method
* */

mv.m.Movie.saveAll = function(){
  var moviesString = '';
  var error = false;
  var numMovies = Object.keys(mv.m.Movie.instances).length;
  try{
    moviesString = JSON.stringify(mv.m.Movie.instances);
    localStorage.setItem('movies', moviesString);
  }catch(e){
    console.log('Error when writing to local storage: ' + e);
    error = true;
  }
  if(error === false){
    console.log(numMovies + ' movies saved!');
  }
}

/*create a new movie and add it to the movie instances collection
* @method
* */

mv.m.Movie.add = function(slots){
  var movie = null;
  try{
    movie = new mv.m.Movie(slots);
  }catch(e){
    console.log(e.constructor.name + ': ' + e.message);
    movie = null;
  }
  if(movie){
    mv.m.Movie.instances[String(slots.movieNo)] = new mv.m.Movie(slots);
    console.log('Movie number ' + slots.movieNo + ' was created!');
  }
}

/*Update an existing movie record
 * @method
 * */

mv.m.Movie.update = function(slots){
  var movie = mv.m.Movie.instances[String(slots.movieNo)];
  var noConstraintViolated = true;
  var updatedProperties = [];
  var objectBeforeUpdate = util.cloneObject(movie);

  try {
    if (movie.movieNo !== slots.movieNo) {
      movie.setMovieNo( slots.movieNo);
      updatedProperties.push('movieNo');
    }
    if (movie.title !== slots.title) {
      movie.setTitle( slots.title);
      updatedProperties.push('title');
    }
    if (movie.movieLength !== slots.movieLength) {
      movie.setMovieLength( slots.movieLength);
      updatedProperties.push('movieLength');
    }
    if (movie.dateReleased !== slots.dateReleased) {
      movie.setDateReleased( slots.dateReleased);
      updatedProperties.push('dateReleased');
    }

  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    noConstraintViolated = false;
    // restore object to its state before updating
    mv.m.Movie.instances[slots.movieNo] = objectBeforeUpdate;
  }
  if(noConstraintViolated){
    if (updatedProperties.length > 0) {
      console.log("Properties " + updatedProperties.toString() +
        " modified for movie: " + slots.movieNo);
    } else {
      console.log("No property value changed for the movie number: " + slots.movieNo + "!");
    }
  }

  //retrieve movies from main memory database
  //var movie = mv.m.Movie.instances[String(slots.movieNo)];

}

/*delete an existing movie record
 * @method
 * */

mv.m.Movie.destroy = function(movieNo){
  if(mv.m.Movie.instances[movieNo]){
    delete mv.m.Movie.instances[movieNo];
  }else{
    console.log('There is no movie with number ' + movieNo + ' in the database!');
  }
}

/**********************************
 *****Auxiliary Methods For Testing
 **********************************/

/*create test data and add to local storage
 * @method
 * */

mv.m.Movie.createTestData = function(){
  try{
    mv.m.Movie.instances["1"] = new mv.m.Movie({
      movieNo: 1,
      title:'Sinbad',
      movieLength:'1h 15min',
      dateReleased: 'Jul 7th 1999',
      rating: mv.m.MovieRatingEL.PG,
      genres: [mv.m.GenreEl.ANIMATION, mv.m.GenreEl.FAMILY]
    });

    mv.m.Movie.instances["2"] = new mv.m.Movie({
      movieNo: 2,
      title:'Bambi',
      movieLength:'1h 30min',
      dateReleased: 'Jul 19th 1995',
      rating: mv.m.MovieRatingEL.PG,
      genres: [mv.m.GenreEl.ANIMATION, mv.m.GenreEl.FAMILY]
    });

    mv.m.Movie.saveAll();
  }catch(e){
    console.log( e.constructor.name + ": " + e.message);
  }

}

/*clear all movie records from local storage
 * @method
 * */

mv.m.Movie.clearData = function(){
  if (confirm('Do you really want to delete all movie data?')) {
    mv.m.Movie.instances = {};
    localStorage.setItem('movies', '{}');
  }
}