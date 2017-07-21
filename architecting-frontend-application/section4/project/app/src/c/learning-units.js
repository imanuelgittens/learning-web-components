/**
* @fileOverview  Contains various controller functions for managing learning units
* @author Imanuel Gittens
*/
vt.c.LearningUnits.manage = {
  initialize: function () {
    vt.m.LearningUnit.retrieveAll();
    vt.v.LearningUnits.retrieveAndListAll.setupUserInterface();
    vt.v.LearningUnits.createLearningUnit.setupUserInterface();
    vt.v.LearningUnits.updateLearningUnit.setupUserInterface();
    vt.v.LearningUnits.destroy.setupUserInterface();
  }
};