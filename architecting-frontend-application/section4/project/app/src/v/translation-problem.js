/**
 * @fileoverview - contains functions for managing translation problems
 * @author- Imanuel Gittens
 * */

vt.v.TranslationProblems.manage = {
  /**
   * exit the Manage Books UI page
   */
  exit: function () {
    vt.m.TranslationProblem.saveAll();
  }
}

vt.v.TranslationProblems.retrieveAndListAll = {
  setupUserInterface: function(){
    var tableBodyEl = document.querySelector('#allTranslationProblems > tbody');
    var i, row=null, tp=null,
      keys = Object.keys( vt.m.TranslationProblem.instances);
    //var problemsString="";
    tableBodyEl.innerHTML = "";  // drop old contents
    for (i=0; i < keys.length; i++) {
      tp = vt.m.TranslationProblem.instances[keys[i]];
      row = tableBodyEl.insertRow(-1);
      row.insertCell(-1).textContent = tp.source;
      row.insertCell(-1).textContent = tp.targets;
      //row.insertCell(-1).textContent = tp.courseDescription;
    }
  }
}

vt.v.TranslationProblems.createTranslationProblem = {
  setupUserInterface: function(){
    var formEl = document.getElementById('addTranslationProblem');
    var saveButton = formEl.commit;
    // add event listeners for responsive validation
    formEl.source.addEventListener("input", function () {
      formEl.source.setCustomValidity(
        vt.m.TranslationProblem.checkSourceAsId( formEl.source.value).message);
      if(!formEl.checkValidity()){
        formEl.source.classList.add('is-danger');
      }else{
        formEl.source.classList.remove('is-danger');
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

    // define event handler for saveButton click events
    saveButton.addEventListener("click", this.handleSaveButtonClickEvent);

    // define event handler for neutralizing the submit event
    formEl.addEventListener( 'submit', function (e) {
      e.preventDefault();
      formEl.reset();
    });
  },
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('addTranslationProblem');
    var slots = {
      source: formEl.source.value,
      targets: formEl.targets.value
    };
    // validate all form controls and show error messages
    formEl.source.setCustomValidity(
      vt.m.TranslationProblem.checkSource( formEl.source.value).message);
    // formEl.courseTitle.setCustomValidity(
    //   vt.m.Course.checkCourseTitle( formEl.courseTitle.value).message);
    // formEl.courseDesc.setCustomValidity(
    //   vt.m.Course.checkCourseDescription( formEl.courseDesc.value).message);
    // save the input data only if all form fields are valid
    if (formEl.checkValidity()) {
      vt.m.TranslationProblem.add( slots);
    }

  }


}

vt.v.TranslationProblems.updateTranslationProblem = {
  setupUserInterface: function(){

    var formEl = document.getElementById('updateTranslationProblemForm');
    var selectTranslationProblemEl = formEl.selectTranslationProblem;
    var saveButton = formEl.commit;

    //set up the TranslationProblem selection list
    util.fillSelectWithOptions( selectTranslationProblemEl, vt.m.TranslationProblem.instances, "source");
    selectTranslationProblemEl.addEventListener("change", this.handleTranslationProblemSelectChangeEvent);
    // add event listeners for responsive validation
    // formEl.learnUnitID.addEventListener("input", function () {
    //   formEl.learnUnitID.setCustomValidity(
    //     vt.m.TranslationProblem.checkTranslationProblemAsId( formEl.learnUnitID.value).message);
    //   if(!formEl.checkValidity()){
    //     formEl.learnUnitID.classList.add('is-danger');
    //   }else{
    //     formEl.learnUnitID.classList.remove('is-danger');
    //   }
    // });
    formEl.updateSource.addEventListener("input", function () {
      formEl.updateSource.setCustomValidity(
        vt.m.TranslationProblem.checkSource( formEl.updateSource.value).message);
      if(!formEl.checkValidity()){
        formEl.updateSource.classList.add('is-danger');
      }else{
        formEl.updateSource.classList.remove('is-danger');
      }
    });
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
  handleTranslationProblemSelectChangeEvent: function () {
    var formEl = document.getElementById('updateTranslationProblemForm');
    var selectTranslationProblemEl = formEl.selectTranslationProblem;
    var saveButton = formEl.commit;
    var key = selectTranslationProblemEl.value;
    var cu=null;
    if (key !== "") {
      cu = vt.m.TranslationProblem.instances[key];
      formEl.updateSource.value = cu.source;
      formEl.updateTarget.value = cu.targets;
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
    var formEl = document.getElementById('updateTranslationProblemForm');
    var slots = {
      source: formEl.updateSource.value,
      targets: formEl.updateTarget.value,
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
      vt.m.TranslationProblem.update( slots);
    }

  }
}

/**********************************************
 * Use case Delete TranslationProblem
 **********************************************/
vt.v.TranslationProblems.destroy = {
  /**
   * initialize the Translation Problem.destroy form
   */
  setupUserInterface: function () {
    var formEl = document.getElementById('deleteTranslationProblemForm');
    var selectTranslationProblemEl = formEl.selectTranslationProblemToDelete;
    var deleteButton = formEl.commit;

    //set up the TranslationProblem selection list
    util.fillSelectWithOptions( selectTranslationProblemEl, vt.m.TranslationProblem.instances, "source");
    deleteButton.addEventListener("click", function () {
      var source = selectTranslationProblemEl.value;
      if (confirm("Do you really want to delete this problem?")) {
        vt.m.TranslationProblem.destroy( source);
        selectTranslationProblemEl.remove( selectTranslationProblemEl.selectedIndex);
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