/**
 * @fileOverview  Contains various controller functions for translation problems
 * @author Imanuel Gittens
 */
vt.c.TranslationProblems.manage = {
  initialize: function () {
    vt.m.TranslationProblem.retrieveAll();
    vt.v.TranslationProblems.retrieveAndListAll.setupUserInterface();
    vt.v.TranslationProblems.createTranslationProblem.setupUserInterface();
    vt.v.TranslationProblems.updateTranslationProblem.setupUserInterface();
    vt.v.TranslationProblems.destroy.setupUserInterface();
  }
};

