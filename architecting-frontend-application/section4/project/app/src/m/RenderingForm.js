/**
 * @fileoverview - definition of model class: Rendering Form
 * @author - Imanuel Gittens
 * */

vt.m.RenderingModelEL = new eNUMERATION("RenderingModelEL", ['SINGLE_PROBLEM','MULTIPLE_PROBLEMS']);

/**
 * @class
 * */

vt.m.RenderingForm = class{
  constructor(slots){
    //initialize required properties
    this._name = '';
    this._description = '';
    this._mode = '';
    //if constructor is invoked with a non empty slots argument
    if(typeof  slots === 'object' && Object.keys.length > 0){
      //assign properties by invoking implicit setters
      this.name = slots.name;
      this.description = slots.description;
      this.mode = slots.mode;
    }
  }

  /*
   * getters, checks and setters
   * */

  get name(){
    return this._name;
  }

  static checkName(id){
    if(!id){
      return new NoConstraintViolation();
    }else if(id.length < 1){
      return new RangeConstraintViolation('Rendering form name cannot be empty!');
    }else{
      return new NoConstraintViolation();
    }
  }

  static checkNameAsId(id){
    var validationResult = vt.m.RenderingForm.checkName(id);
    if(validationResult instanceof  NoConstraintViolation){
      if(!id){
        validationResult = new MandatoryValueConstraintViolation('A rendering form name must be provided!');
      }else if(vt.m.RenderingForm.instances[id]){
        validationResult = new UniquenessConstraintViolation('That rendering form already exists in the database!');
      }else{
        validationResult = new NoConstraintViolation();
      }
    }
    return validationResult;
  }

  set name(id){
    var validationResult = vt.m.RenderingForm.checkNameAsId(id);
    if(validationResult instanceof NoConstraintViolation){
      this._name = id;
    }else{
      throw validationResult;
    }
  }

  get description(){
    return this._description;
  }

  static checkDescription(desc){
    if(!desc){
      return new MandatoryValueConstraintViolation('A description must be provided!');
    }else{
      return new NoConstraintViolation();
    }
  }

  set description(desc){
    var validationResult = vt.m.RenderingForm.checkDescription(desc);
    if(validationResult instanceof NoConstraintViolation){
      this._description = desc;
    }else{
      throw validationResult;
    }
  }

  get mode(){
    return this._mode;
  }

  static checkMode(mode){
    if(!mode){
      return new MandatoryValueConstraintViolation('A course mode must be provided!');
    }else{
      return new NoConstraintViolation();
    }
  }

  set mode(mode){
    var validationResult = vt.m.RenderingForm.checkMode(mode);
    if(validationResult instanceof NoConstraintViolation){
      this._mode = mode;
    }else{
      throw validationResult;
    }
  }
  /**
   *  Convert object to string
   */
  toString() {
    return "Rendering Form{ Name: " + this.name +
      ", Description: " + this.description +
      ", Mode: " + this.mode +
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
vt.m.RenderingForm.instances = {};

/***********************************************
 ***  Class-level ("static") methods  **********
 ***********************************************/
/**
 * Create a new learning unit object and add it to the class population
 * @method
 */
vt.m.RenderingForm.add = function (slots) {
  var renderingForm = null;
  try {
    renderingForm = new vt.m.RenderingForm( slots);
  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    renderingForm = null;
  }
  if (renderingForm) {
    //console.log(renderingForm)
    vt.m.RenderingForm.instances[renderingForm.name] = renderingForm;
    console.log( renderingForm.toString() + " created!");
  }
};

/**
 * Update an existing learning unit record
 * @method
 */
vt.m.RenderingForm.update = function (slots) {
  var rf = vt.m.RenderingForm.instances[slots.name],
    noConstraintViolated = true,
    updatedProperties = [],
    objectBeforeUpdate = util.cloneObject( rf);
  try {
    if (rf.description !== slots.description) {
      rf.description = slots.description;
      updatedProperties.push("description");
    }
    if (rf.mode !== slots.mode) {
      rf.mode = slots.mode;
      updatedProperties.push("mode");
    }
  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    noConstraintViolated = false;
    // restore object to its state before updating
    vt.m.RenderingForm.instances[slots.name] = objectBeforeUpdate;
  }
  if (noConstraintViolated) {
    if (updatedProperties.length > 0) {
      console.log("Properties " + updatedProperties.toString() +
        " modified for rendering form " + slots.name);
    } else {
      console.log("No property value changed for rendering form " +
        slots.name + "!");
    }
  }
};

/**
 * Delete a learning unit record from persistent storage
 * @method
 */
vt.m.RenderingForm.destroy = function (name) {
  if (vt.m.RenderingForm.instances[name]) {
    delete vt.m.RenderingForm.instances[name];
    console.log("Rendering Form " + name + " deleted");
  } else {
    console.log("There is no rendering form with name [" + name +
      "] in the database!");
  }
};

/**
 * Retrieve learning units table from local storage
 * @method
 */
vt.m.RenderingForm.retrieveAll = function () {
  var key="", keys=[], rfString="", rfRows={}, i=0;
  try {
    if (localStorage["rendering-forms"]) {
      rfString = localStorage["rendering-forms"];
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (rfString) {
    rfRows = JSON.parse( rfString);
    keys = Object.keys( rfRows);
    console.log( keys.length +" Rendering Forms loaded.");
    try {
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        vt.m.RenderingForm.instances[key] =
          new vt.m.RenderingForm( rfRows[key]);
      }
    } catch (e) {
      console.log( e.constructor.name + " while deserializing rendering form " + key +": "+ e.message);
    }
  }
};

/**
 * Save all learning unit objects to Local Storage
 * @method
 */
vt.m.RenderingForm.saveAll = function () {
  var key="", rows={}, obj=null, i;
  var keys = Object.keys( vt.m.RenderingForm.instances);
  // convert the map of objects to map of corresponding rows
  for (i=0; i < keys.length; i++) {
    key = keys[i];
    obj = vt.m.RenderingForm.instances[key];
    // serialize RenderingForm object
    rows[key] = obj.toRecord();
  }
  try {
    localStorage["rendering-forms"] = JSON.stringify( rows);
    console.log( keys.length +" rendering forms saved.");
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
  }
};
