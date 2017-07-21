/**
 * @fileoverview - definition of model class: Learning Unit
 * @author - Imanuel Gittens
 * */

/**
 * @class
 * */

vt.m.LearningUnit = class{
  constructor(slots){
    //initialize required properties
    this._learnUnitId = 0;
    this._learnUnitTitle = '';
    this._learnUnitDescription = '';
    //if constructor is invoked with a non empty slots argument
    if(typeof  slots === 'object' && Object.keys.length > 0){
      //assign properties by invoking implicit setters
      this.learnUnitId = slots.learnUnitId;
      this.learnUnitTitle = slots.learnUnitTitle;
      this.learnUnitDescription = slots.learnUnitDescription;
    }
  }

  /*
  * getters, checks and setters
  * */

  get learnUnitId(){
    return this._learnUnitId;
  }

  static checkLearnUnit(id){
    if(!id){
      return new NoConstraintViolation();
    }else if(!util.isIntegerOrIntegerString(id) || parseInt(id) < 1){
      return new RangeConstraintViolation('A learning unit number must be a positive integer!');
    }else{
      return new NoConstraintViolation();
    }
  }

  static checkLearnUnitAsId(id){
    var validationResult = vt.m.LearningUnit.checkLearnUnit(id);
    if(validationResult instanceof  NoConstraintViolation){
      if(!id){
        validationResult = new MandatoryValueConstraintViolation('A learning unit number must be provided!');
      }else if(vt.m.LearningUnit.instances[String(id)]){
        validationResult = new UniquenessConstraintViolation('That learning unit number already exists in the database!');
      }else{
        validationResult = new NoConstraintViolation();
      }
    }
    return validationResult;
  }

  set learnUnitId(id){
    var validationResult = vt.m.LearningUnit.checkLearnUnitAsId(id);
    if(validationResult instanceof NoConstraintViolation){
      this._learnUnitId = parseInt(id);
    }else{
      throw validationResult;
    }
  }

  get learnUnitTitle(){
    return this._learnUnitTitle;
  }

  static checkLearnUnitTitle(title){
    if(!title){
      return new MandatoryValueConstraintViolation('A title must be provided!');
    }else{
      return new NoConstraintViolation();
    }
  }

  set learnUnitTitle(title){
    var validationResult = vt.m.LearningUnit.checkLearnUnitTitle(title);
    if(validationResult instanceof NoConstraintViolation){
      this._learnUnitTitle = title;
    }else{
      throw validationResult;
    }
  }

  get learnUnitDescription(){
    return this._learnUnitDescription;
  }

  static checkLearnUnitDescription(desc){
    if(!desc){
      return new MandatoryValueConstraintViolation('A learning unit description must be provided!');
    }else{
      return new NoConstraintViolation();
    }
  }

  set learnUnitDescription(desc){
    var validationResult = vt.m.LearningUnit.checkLearnUnitDescription(desc);
    if(validationResult instanceof NoConstraintViolation){
      this._learnUnitDescription = desc;
    }else{
      throw validationResult;
    }
  }
  /**
   *  Convert object to string
   */
  toString() {
    return "LearningUnit{ No: " + this.learnUnitId +
      ", Title: " + this.learnUnitTitle +
      ", Description: " + this.learnUnitDescription +
      "}";
  }


  /**
   *  Convert object to record
   */
  toRecord() {
    var rec = {};
    Object.keys( this).forEach( function (p) {
      // copy only property slots with underscore prefix
      if (p.charAt(0) === "_") {
        switch (p) {
          case "_author":
            // convert object reference to ID reference
            if (this._author) rec.author_id = this._author.personId;
            break;
          case "_problems":
            // convert the list of object references to ID references
            rec.problemIdRefs = [];
            this._problems.forEach( function (problem) {
              rec.problemIdRefs.push( problem.source);
            });
            break;
          default:
            // remove underscore prefix
            rec[p.substr(1)] = this[p];
        }
      }
    }, this);
    return rec;
  }

}

/**
 * Class level static properties
 * */

//initially an empty collection in the form of a map
vt.m.LearningUnit.instances = {};

/***********************************************
 ***  Class-level ("static") methods  **********
 ***********************************************/
/**
 * Create a new learning unit object and add it to the class population
 * @method
 */
vt.m.LearningUnit.add = function (slots) {
  var learnUnit = null;
  try {
    learnUnit = new vt.m.LearningUnit( slots);
  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    learnUnit = null;
  }
  if (learnUnit) {
    console.log(learnUnit)
    vt.m.LearningUnit.instances[String(learnUnit.learnUnitId)] = learnUnit;
    console.log( learnUnit.toString() + " created!");
  }
};

/**
 * Update an existing learning unit record
 * @method
 */
vt.m.LearningUnit.update = function (slots) {
  var lu = vt.m.LearningUnit.instances[slots.learnUnitId],
    noConstraintViolated = true,
    updatedProperties = [],
    objectBeforeUpdate = util.cloneObject( lu);
  try {
    if (lu.learnUnitTitle !== slots.learnUnitTitle) {
      lu.learnUnitTitle = slots.learnUnitTitle;
      updatedProperties.push("title");
    }
    if (lu.learnUnitDescription !== slots.learnUnitDescription) {
      lu.learnUnitDescription = slots.learnUnitDescription;
      updatedProperties.push("title");
    }
  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    noConstraintViolated = false;
    // restore object to its state before updating
    vt.m.LearningUnit.instances[slots.learnUnitId] = objectBeforeUpdate;
  }
  if (noConstraintViolated) {
    if (updatedProperties.length > 0) {
      console.log("Properties " + updatedProperties.toString() +
        " modified for learning unit " + slots.learnUnitId);
    } else {
      console.log("No property value changed for learning unit " +
        slots.learnUnitId + "!");
    }
  }
};

/**
 * Delete a learning unit record from persistent storage
 * @method
 */
vt.m.LearningUnit.destroy = function (learnUnitNo) {
  if (vt.m.LearningUnit.instances[learnUnitNo]) {
    delete vt.m.LearningUnit.instances[learnUnitNo];
    console.log("Learning unit " + learnUnitNo + " deleted");
  } else {
    console.log("There is no learning unit with number " + learnUnitNo +
      " in the database!");
  }
};

/**
 * Retrieve learning units table from local storage
 * @method
 */
vt.m.LearningUnit.retrieveAll = function () {
  var key="", keys=[], learningUnitsString="", learningUnitRows={}, i=0;
  try {
    if (localStorage["learning_units"]) {
      learningUnitsString = localStorage["learning_units"];
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (learningUnitsString) {
    learningUnitRows = JSON.parse( learningUnitsString);
    keys = Object.keys( learningUnitRows);
    console.log( keys.length +" learningUnits loaded.");
    try {
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        vt.m.LearningUnit.instances[key] =
          new vt.m.LearningUnit( learningUnitRows[key]);
      }
    } catch (e) {
      console.log( e.constructor.name + " while deserializing learning " +
        "unit "+ key +": "+ e.message);
    }
  }
};

/**
 * Save all learning unit objects to Local Storage
 * @method
 */
vt.m.LearningUnit.saveAll = function () {
  var key="", rows={}, obj=null, i;
  var keys = Object.keys( vt.m.LearningUnit.instances);
  // convert the map of objects to map of corresponding rows
  for (i=0; i < keys.length; i++) {
    key = keys[i];
    obj = vt.m.LearningUnit.instances[key];
    // serialize LearningUnit object
    rows[key] = obj.toRecord();
  }
  try {
    localStorage["learning_units"] = JSON.stringify( rows);
    console.log( keys.length +" learning units saved.");
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
  }
};
