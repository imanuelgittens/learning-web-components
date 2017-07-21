/**
 * @fileoverview - contains functions for managing courses
 * @author- Imanuel Gittens
 * */

vt.v.Courses.manage = {
  /**
   * exit the Manage Books UI page
   */
  exit: function () {
    vt.m.Course.saveAll();
  }
}

vt.v.Courses.retrieveAndListAll = {
  setupUserInterface: function(){
    var tableBodyEl = document.querySelector('#allCourses > tbody');
    var i, row=null, cu=null,
      keys = Object.keys( vt.m.Course.instances);
    tableBodyEl.innerHTML = "";  // drop old contents
    for (i=0; i < keys.length; i++) {
      cu = vt.m.Course.instances[keys[i]];
      row = tableBodyEl.insertRow(-1);
      row.insertCell(-1).textContent = cu.courseId;
      row.insertCell(-1).textContent = cu.courseTitle;
      row.insertCell(-1).textContent = cu.courseDescription;
      row.insertCell(-1).textContent = vt.m.SourceLangEL.enumIndexesToNames( cu.availableSourceLang);
      row.insertCell(-1).textContent = vt.m.TargetLangEL.enumIndexesToNames( cu.availableTargetLang);
    }
  }
}

vt.v.Courses.createCourse = {
  setupUserInterface: function(){
    var formEl = document.getElementById('addCourse');
    var saveButton = formEl.commit;
    var availSourceLangSelEl = formEl.selectSourceLang;
    var availTargetLangSelEl = formEl.selectTargetLang;
    // add event listeners for responsive validation
    formEl.courseID.addEventListener("input", function () {
      formEl.courseID.setCustomValidity(
        vt.m.Course.checkCourseAsId( formEl.courseID.value).message);
      if(!formEl.checkValidity()){
        formEl.courseID.classList.add('is-danger');
      }else{
        formEl.courseID.classList.remove('is-danger');
      }
    });
    formEl.courseTitle.addEventListener("input", function () {
      formEl.courseTitle.setCustomValidity(
        vt.m.Course.checkCourseTitle( formEl.courseTitle.value).message);
      if(!formEl.checkValidity()){
        formEl.courseTitle.classList.add('is-danger');
      }else{
        formEl.courseTitle.classList.remove('is-danger');
      }
    });
    formEl.courseDesc.addEventListener("input", function () {
      formEl.courseDesc.setCustomValidity(
        vt.m.Course.checkCourseDescription( formEl.courseDesc.value).message);
      if(!formEl.checkValidity()){
        formEl.courseDesc.classList.add('is-danger');
      }else{
        formEl.courseDesc.classList.remove('is-danger');
      }
    });
    //add source and target language enumerations
    util.fillSelectWithOptionsFromEnumLabels(
      availSourceLangSelEl, vt.m.SourceLangEL.labels, {noSelOption: true});

    util.fillSelectWithOptionsFromEnumLabels(
      availTargetLangSelEl, vt.m.TargetLangEL.labels, {noSelOption: true});

    // define event handler for saveButton click events
    saveButton.addEventListener("click", this.handleSaveButtonClickEvent);

    // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
  },
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('addCourse');
    var slots = {
      courseId: formEl.courseID.value,
      courseTitle: formEl.courseTitle.value,
      courseDescription: formEl.courseDesc.value,
      availableSourceLang: [formEl.selectSourceLang.value],
      availableTargetLang: [formEl.selectTargetLang.value]
    };
    // validate all form controls and show error messages
    formEl.courseID.setCustomValidity(
      vt.m.Course.checkCourseAsId( formEl.courseID.value).message);
    formEl.courseTitle.setCustomValidity(
      vt.m.Course.checkCourseTitle( formEl.courseTitle.value).message);
    formEl.courseDesc.setCustomValidity(
      vt.m.Course.checkCourseDescription( formEl.courseDesc.value).message);
    // save the input data only if all form fields are valid
    if (formEl.checkValidity()) {
      vt.m.Course.add( slots);
    }

  }


}

vt.v.Courses.updateCourse = {
  setupUserInterface: function(){

    var formEl = document.getElementById('updateCourseForm');
    var selectCourseEl = formEl.selectCourse;
    var saveButton = formEl.commit;

    //set up the Course selection list
    util.fillSelectWithOptions( selectCourseEl, vt.m.Course.instances, "courseId", {displayProp:"courseTitle", noSelOption: true});
    selectCourseEl.addEventListener("change", this.handleCourseSelectChangeEvent);
    formEl.updateCourseTitle.addEventListener("input", function () {
      formEl.updateCourseTitle.setCustomValidity(
        vt.m.Course.checkCourseTitle( formEl.updateCourseTitle.value).message);
      if(!formEl.checkValidity()){
        formEl.updateCourseTitle.classList.add('is-danger');
      }else{
        formEl.updateCourseTitle.classList.remove('is-danger');
      }
    });
    formEl.updateCourseDesc.addEventListener("input", function () {
      formEl.updateCourseDesc.setCustomValidity(
        vt.m.Course.checkCourseDescription( formEl.updateCourseDesc.value).message);
      if(!formEl.checkValidity()){
        formEl.updateCourseDesc.classList.add('is-danger');
      }else{
        formEl.updateCourseDesc.classList.remove('is-danger');
      }
    });

    // // define event handler for saveButton click events
    saveButton.addEventListener("click", this.handleSaveButtonClickEvent);
    //
    // // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
  },
  /**
   * handle book selection events: when a book is selected,
   * populate the form with the data of the selected book
   */
  handleCourseSelectChangeEvent: function () {
    var formEl = document.getElementById('updateCourseForm');
    var selectCourseEl = formEl.selectCourse;
    var sourceLangSelect = formEl.updateSourceLang;
    var targetLangSelect = formEl.updateTargetLang;
    var saveButton = formEl.commit;
    var key = selectCourseEl.value;
    var cu=null;
    if (key !== "") {
      cu = vt.m.Course.instances[key];
      formEl.updateCourseID.value = cu.courseId;
      formEl.updateCourseTitle.value = cu.courseTitle;
      formEl.updateCourseDesc.value = cu.courseDescription;
    // populate the selection list for the levelOfDifficulty enum attribute
      util.fillSelectWithOptionsFromEnumLabels(
        sourceLangSelect, vt.m.SourceLangEL.labels);
      util.fillSelectWithOptionsFromEnumLabels(
        targetLangSelect, vt.m.TargetLangEL.labels);
      sourceLangSelect.value = cu.availableSourceLang;
      targetLangSelect.value = cu.availableTargetLang;
      saveButton.disabled = false;
    } else {
      formEl.reset();
      saveButton.disabled = true;
    }
  },
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('updateCourseForm');
    var slots = {
      courseId: formEl.updateCourseID.value,
      courseTitle: formEl.updateCourseTitle.value,
      courseDescription: formEl.updateCourseDesc.value,
      availableSourceLang: [formEl.updateSourceLang.value],
      availableTargetLang: [formEl.updateTargetLang.value]
    };
    // validate all form controls and show error messages
    formEl.updateCourseTitle.setCustomValidity(
      vt.m.Course.checkCourseTitle( formEl.updateCourseTitle.value).message);
    formEl.updateCourseDesc.setCustomValidity(
      vt.m.Course.checkCourseDescription( formEl.updateCourseDesc.value).message);
    // save the input data only if all form fields are valid
    if (formEl.checkValidity()) {
      vt.m.Course.update( slots);
    }

  }
}

/**********************************************
 * Use case Delete Course
 **********************************************/
vt.v.Courses.destroy = {
  /**
   * initialize the Courses.destroy form
   */
  setupUserInterface: function () {
    var formEl = document.getElementById('deleteCourseForm');
    var selectCourseEl = formEl.selectCourseToDelete;
    var deleteButton = formEl.commit;

    //set up the Course selection list
    util.fillSelectWithOptions( selectCourseEl, vt.m.Course.instances, "courseId", {displayProp:"courseTitle", noSelOption: true});
    deleteButton.addEventListener("click", function () {
      vt.m.Course.destroy( selectCourseEl.value);
      // remove deleted learning unit from select options
      selectCourseEl.remove( selectCourseEl.selectedIndex);
    });
    // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
  }
};