/**
 * @fileoverview - contains functions for managing learning units
 * @author- Imanuel Gittens
 * */

vt.v.LearningUnits.manage = {
  /**
   * exit the Manage Books UI page
   */
  exit: function () {
    vt.m.LearningUnit.saveAll();
  }
}

vt.v.LearningUnits.retrieveAndListAll = {
  setupUserInterface: function(){
    var tableBodyEl = document.querySelector('#allLearningUnits > tbody');
    var i, row=null, lu=null,
      keys = Object.keys( vt.m.LearningUnit.instances);
    tableBodyEl.innerHTML = "";  // drop old contents
    for (i=0; i < keys.length; i++) {
      lu = vt.m.LearningUnit.instances[keys[i]];
      row = tableBodyEl.insertRow(-1);
      row.insertCell(-1).textContent = lu.learnUnitId;
      row.insertCell(-1).textContent = lu.learnUnitTitle;
      row.insertCell(-1).textContent = lu.learnUnitDescription;
    }
  }
}

vt.v.LearningUnits.createLearningUnit = {
  setupUserInterface: function(){
    var formEl = document.getElementById('addLearnUnit');
    var saveButton = formEl.commit;
    // add event listeners for responsive validation
    formEl.learnUnitID.addEventListener("input", function () {
      formEl.learnUnitID.setCustomValidity(
        vt.m.LearningUnit.checkLearnUnitAsId( formEl.learnUnitID.value).message);
      if(!formEl.checkValidity()){
        formEl.learnUnitID.classList.add('is-danger');
      }else{
        formEl.learnUnitID.classList.remove('is-danger');
      }
    });
    formEl.learnUnitTitle.addEventListener("input", function () {
      formEl.learnUnitTitle.setCustomValidity(
        vt.m.LearningUnit.checkLearnUnitTitle( formEl.learnUnitTitle.value).message);
      if(!formEl.checkValidity()){
        formEl.learnUnitTitle.classList.add('is-danger');
      }else{
        formEl.learnUnitTitle.classList.remove('is-danger');
      }
    });
    formEl.learnUnitDesc.addEventListener("input", function () {
      formEl.learnUnitDesc.setCustomValidity(
        vt.m.LearningUnit.checkLearnUnitDescription( formEl.learnUnitDesc.value).message);
      if(!formEl.checkValidity()){
        formEl.learnUnitDesc.classList.add('is-danger');
      }else{
        formEl.learnUnitDesc.classList.remove('is-danger');
      }
    });

    // define event handler for saveButton click events
    saveButton.addEventListener("click", this.handleSaveButtonClickEvent);

    // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
  },
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('addLearnUnit');
    var slots = {
      learnUnitId: formEl.learnUnitID.value,
      learnUnitTitle: formEl.learnUnitTitle.value,
      learnUnitDescription: formEl.learnUnitDesc.value
    };
    // validate all form controls and show error messages
      formEl.learnUnitID.setCustomValidity(
        vt.m.LearningUnit.checkLearnUnitAsId( formEl.learnUnitID.value).message);
    formEl.learnUnitTitle.setCustomValidity(
      vt.m.LearningUnit.checkLearnUnitTitle( formEl.learnUnitTitle.value).message);
    formEl.learnUnitDesc.setCustomValidity(
      vt.m.LearningUnit.checkLearnUnitDescription( formEl.learnUnitDesc.value).message);
    // save the input data only if all form fields are valid
    if (formEl.checkValidity()) {
      vt.m.LearningUnit.add( slots);
    }

  }


}

vt.v.LearningUnits.updateLearningUnit = {
  setupUserInterface: function(){

    var formEl = document.getElementById('updateLearnUnitForm');
    var selectLearningUnitEl = formEl.selectLearnUnit;
    var saveButton = formEl.commit;

    //set up the LearningUnit selection list
    util.fillSelectWithOptions( selectLearningUnitEl, vt.m.LearningUnit.instances, "learnUnitId", {displayProp:"learnUnitTitle", noSelOption: true});
    selectLearningUnitEl.addEventListener("change", this.handleLearnUnitSelectChangeEvent);
    formEl.updateUnitTitle.addEventListener("input", function () {
      formEl.updateUnitTitle.setCustomValidity(
        vt.m.LearningUnit.checkLearnUnitTitle( formEl.updateUnitTitle.value).message);
      if(!formEl.checkValidity()){
        formEl.updateUnitTitle.classList.add('is-danger');
      }else{
        formEl.updateUnitTitle.classList.remove('is-danger');
      }
    });
    formEl.updateUnitDesc.addEventListener("input", function () {
      formEl.updateUnitDesc.setCustomValidity(
        vt.m.LearningUnit.checkLearnUnitDescription( formEl.updateUnitDesc.value).message);
      if(!formEl.checkValidity()){
        formEl.updateUnitDesc.classList.add('is-danger');
      }else{
        formEl.updateUnitDesc.classList.remove('is-danger');
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
  handleLearnUnitSelectChangeEvent: function () {
    var formEl = document.getElementById('updateLearnUnitForm');
    var selectLearningUnitEl = formEl.selectLearnUnit;
    var saveButton = formEl.commit;
    var key = selectLearningUnitEl.value;
    var lu=null;
    if (key !== "") {
      lu = vt.m.LearningUnit.instances[key];
      formEl.updateUnitID.value = lu.learnUnitId;
      formEl.updateUnitTitle.value = lu.learnUnitTitle;
      formEl.updateUnitDesc.value = lu.learnUnitDescription;
      saveButton.disabled = false;
    } else {
      formEl.reset();
      saveButton.disabled = true;
    }
  },
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('updateLearnUnitForm');
    var slots = {
      learnUnitId: formEl.updateUnitID.value,
      learnUnitTitle: formEl.updateUnitTitle.value,
      learnUnitDescription: formEl.updateUnitDesc.value
    };
    // validate all form controls and show error messages
    formEl.updateUnitTitle.setCustomValidity(
      vt.m.LearningUnit.checkLearnUnitTitle( formEl.updateUnitTitle.value).message);
    formEl.updateUnitDesc.setCustomValidity(
      vt.m.LearningUnit.checkLearnUnitDescription( formEl.updateUnitDesc.value).message);
    // save the input data only if all form fields are valid
    if (formEl.checkValidity()) {
      vt.m.LearningUnit.update( slots);
    }

  }
}

/**********************************************
 * Use case Delete LearningUnit
 **********************************************/
vt.v.LearningUnits.destroy = {
  /**
   * initialize the learningUnits.destroy form
   */
  setupUserInterface: function () {
    var formEl = document.getElementById('deleteLearnUnitForm');
    var selectLearningUnitEl = formEl.selectLearnUnitToDelete;
    var deleteButton = formEl.commit;

    //set up the LearningUnit selection list
    util.fillSelectWithOptions( selectLearningUnitEl, vt.m.LearningUnit.instances, "learnUnitId", {displayProp:"learnUnitTitle", noSelOption: true});
    deleteButton.addEventListener("click", function () {
      vt.m.LearningUnit.destroy( selectLearningUnitEl.value);
      // remove deleted learning unit from select options
      selectLearningUnitEl.remove( selectLearningUnitEl.selectedIndex);
    });
    // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
  }
};