/**
 * @fileoverview - contains functions for managing translation problems
 * @author- Imanuel Gittens
 * */

vt.v.RenderingForms.manage = {
  /**
   * exit the Manage Books UI page
   */
  exit: function () {
    vt.m.RenderingForm.saveAll();
  }
}

vt.v.RenderingForms.retrieveAndListAll = {
  setupUserInterface: function(){
    var tableBodyEl = document.querySelector('#allRenderingForms > tbody');
    var i, row=null, rf=null,
      keys = Object.keys( vt.m.RenderingForm.instances);
    //var problemsString="";
    tableBodyEl.innerHTML = "";  // drop old contents
    for (i=0; i < keys.length; i++) {
      rf = vt.m.RenderingForm.instances[keys[i]];
      row = tableBodyEl.insertRow(-1);
      row.insertCell(-1).textContent = rf.name;
      row.insertCell(-1).textContent = rf.description;
      row.insertCell(-1).textContent = vt.m.RenderingModelEL.enumIndexesToNames( [rf.mode]);
      //row.insertCell(-1).textContent = tp.courseDescription;
    }
  }
}

vt.v.RenderingForms.createRenderingForm = {
  setupUserInterface: function(){
    var formEl = document.getElementById('addRenderingForm');
    var saveButton = formEl.commit;
    var modeSelEl = formEl.selectMode;
    // add event listeners for responsive validation
    formEl.formName.addEventListener("input", function () {
      formEl.formName.setCustomValidity(
        vt.m.RenderingForm.checkNameAsId( formEl.formName.value).message);
      if(!formEl.checkValidity()){
        formEl.formName.classList.add('is-danger');
      }else{
        formEl.formName.classList.remove('is-danger');
      }
    });
    // formEl.targets.addEventListener("input", function () {
    //   formEl.targets.setCustomValidity(
    //     vt.m.TranslationProblem.checkCourseTitle( formEl.courseTitle.value).message);
    //   if(!formEl.checkValidity()){
    //     formEl.courseTitle.classList.add('is-danger');
    //   }else{
    //     formEl.courseTitle.classList.remove('is-danger');
    //   }
    // });
    // formEl.courseDesc.addEventListener("input", function () {
    //   formEl.courseDesc.setCustomValidity(
    //     vt.m.Course.checkTranslationProblemDescription( formEl.courseDesc.value).message);
    //   if(!formEl.checkValidity()){
    //     formEl.courseDesc.classList.add('is-danger');
    //   }else{
    //     formEl.courseDesc.classList.remove('is-danger');
    //   }
    // });

    //add source and target language enumerations
    util.fillSelectWithOptionsFromEnumLabels(
      modeSelEl, vt.m.RenderingModelEL.labels);

    // define event handler for saveButton click events
    saveButton.addEventListener("click", this.handleSaveButtonClickEvent);

    // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
  },
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('addRenderingForm');
    var slots = {
      name: formEl.formName.value,
      description: formEl.description.value,
      mode: formEl.selectMode.value
    };
    // validate all form controls and show error messages
    formEl.formName.setCustomValidity(
      vt.m.RenderingForm.checkNameAsId( formEl.formName.value).message);
    // formEl.courseTitle.setCustomValidity(
    //   vt.m.Course.checkCourseTitle( formEl.courseTitle.value).message);
    // formEl.courseDesc.setCustomValidity(
    //   vt.m.Course.checkCourseDescription( formEl.courseDesc.value).message);
    // save the input data only if all form fields are valid
    if (formEl.checkValidity()) {
      vt.m.RenderingForm.add( slots);
    }

  }


}

vt.v.RenderingForms.updateRenderingForm = {
  setupUserInterface: function(){

    var formEl = document.getElementById('updateRenderingFormForm');
    var selectRenderingFormEl = formEl.selectRenderingForm;
    var saveButton = formEl.commit;

    //set up the RenderingForm selection list
    util.fillSelectWithOptions( selectRenderingFormEl, vt.m.RenderingForm.instances, "name");
    selectRenderingFormEl.addEventListener("change", this.handleRenderingFormSelectChangeEvent);
    // add event listeners for responsive validation
    // formEl.learnUnitID.addEventListener("input", function () {
    //   formEl.learnUnitID.setCustomValidity(
    //     vt.m.RenderingForm.checkRenderingFormAsId( formEl.learnUnitID.value).message);
    //   if(!formEl.checkValidity()){
    //     formEl.learnUnitID.classList.add('is-danger');
    //   }else{
    //     formEl.learnUnitID.classList.remove('is-danger');
    //   }
    // });
    // formEl.description.addEventListener("input", function () {
    //   formEl.updateSource.setCustomValidity(
    //     vt.m.TranslationProblem.checkSource( formEl.updateSource.value).message);
    //   if(!formEl.checkValidity()){
    //     formEl.updateSource.classList.add('is-danger');
    //   }else{
    //     formEl.updateSource.classList.remove('is-danger');
    //   }
    // });
    // formEl.updateCourseDesc.addEventListener("input", function () {
    //   formEl.updateCourseDesc.setCustomValidity(
    //     vt.m.Course.checkCourseDescription( formEl.updateCourseDesc.value).message);
    //   if(!formEl.checkValidity()){
    //     formEl.updateCourseDesc.classList.add('is-danger');
    //   }else{
    //     formEl.updateCourseDesc.classList.remove('is-danger');
    //   }
    // });

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
  handleRenderingFormSelectChangeEvent: function () {
    var formEl = document.getElementById('updateRenderingFormForm');
    var selectRenderingFormEl = formEl.selectRenderingForm;
    var modeSelect = formEl.updateMode;
    var saveButton = formEl.commit;
    var key = selectRenderingFormEl.value;
    var cu=null;
    if (key !== "") {
      cu = vt.m.RenderingForm.instances[key];
      formEl.updateName.value = cu.name;
      formEl.updateDescription.value = cu.description;
      // populate the selection list for the mode enum attribute
      util.fillSelectWithOptionsFromEnumLabels(
        modeSelect, vt.m.RenderingModelEL.labels);
      modeSelect.value = cu.mode;
      //formEl.updateCourseDesc.value = cu.courseDescription;
      // set up the single-choice widget for selecting an author
      // util.fillSelectWithOptions( formEl.selectAuthor,
      //   vt.m.Person.instances, "personId", {displayProp:"name"});
      // formEl.selectAuthor.value = lu.author.personId;
      // // set up the mutiple-choice widget for translation problems
      // util.createMultipleChoiceWidget( problemsSelWidget, lu.problems,
      //   vt.m.TranslationProblem.instances, "source");
      saveButton.disabled = false;
    } else {
      formEl.reset();
      // formEl.selectAuthor.innerHTML = "";
      // problemsSelWidget.innerHTML = "";
      saveButton.disabled = true;
    }
  },
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('updateRenderingFormForm');
    var slots = {
      name: formEl.updateName.value,
      description: formEl.updateDescription.value,
      mode: formEl.updateMode.value
      // courseDescription: formEl.updateCourseDesc.value
    };
    // validate all form controls and show error messages
    // formEl.learnUnitID.setCustomValidity(
    //   vt.m.Course.checkCourseAsId( formEl.learnUnitID.value).message);
    // formEl.updateCourseTitle.setCustomValidity(
    //   vt.m.Course.checkCourseTitle( formEl.updateCourseTitle.value).message);
    // formEl.updateCourseDesc.setCustomValidity(
    //   vt.m.Course.checkCourseDescription( formEl.updateCourseDesc.value).message);
    // save the input data only if all form fields are valid
    if (formEl.checkValidity()) {
      vt.m.RenderingForm.update( slots);
    }

  }
}

/**********************************************
 * Use case Delete RenderingForm
 **********************************************/
vt.v.RenderingForms.destroy = {
  /**
   * initialize the Translation Problem.destroy form
   */
  setupUserInterface: function () {
    var formEl = document.getElementById('deleteRenderingFormForm');
    var selectRenderingFormEl = formEl.selectRenderingFormToDelete;
    var deleteButton = formEl.commit;

    //set up the RenderingForm selection list
    util.fillSelectWithOptions( selectRenderingFormEl, vt.m.RenderingForm.instances, "name");
    deleteButton.addEventListener("click", function () {
      var source = selectRenderingFormEl.value;
      if (confirm("Do you really want to delete this rendering form?")) {
        vt.m.RenderingForm.destroy( source);
        selectRenderingFormEl.remove( selectRenderingFormEl.selectedIndex);
      }
      // // var formEl = document.querySelector("section#Course-D > form");
      // vt.m.Course.destroy( selectCourseEl.value);
      // // remove deleted learning unit from select options
      // selectCourseEl.remove( selectCourseEl.selectedIndex);
    });
    // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
    // document.getElementById("Course-M").style.display = "none";
    // document.getElementById("Course-D").style.display = "block";
    //formEl.reset();
  }
};