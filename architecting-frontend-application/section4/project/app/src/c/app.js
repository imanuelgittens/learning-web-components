/**
 * @fileoverview - App level controller code
 * @author - Imanuel Gittens
 * */

//main namespace and sub namespace definitions

var vt = {
  m: {},
  v: {Courses: {}, LearningUnits: {}, RenderingForms: {}, TranslationProblems:{}},
  c: {Courses: {}, LearningUnits: {}, RenderingForms: {}, TranslationProblems: {}}
}

vt.c.app = {
  generateTestData: function(){
    try{

      vt.m.Course.instances['1'] = new vt.m.Course({courseId: 1, courseTitle: 'Course 1', courseDescription: 'The first course', availableSourceLang: [vt.m.SourceLangEL.DE], availableTargetLang: [vt.m.SourceLangEL.EN]});
      vt.m.Course.instances['2'] = new vt.m.Course({courseId: 2, courseTitle: 'Course 2', courseDescription: 'The second course',availableSourceLang: [vt.m.SourceLangEL.ES], availableTargetLang: [vt.m.SourceLangEL.DE]});
      vt.m.Course.instances['3'] = new vt.m.Course({courseId: 3, courseTitle: 'Course 3',courseDescription: 'The third course', availableSourceLang: [vt.m.SourceLangEL.FR], availableTargetLang: [vt.m.SourceLangEL.DE]});
      vt.m.Course.saveAll();
      vt.m.RenderingForm.instances['multiple choice'] = new vt.m.RenderingForm({name: 'multiple choice', description: 'Choose one of several options.', mode: vt.m.RenderingModelEL.SINGLE_PROBLEM});
      vt.m.RenderingForm.saveAll();
      vt.m.TranslationProblem.instances["kitchen"] = new vt.m.TranslationProblem(
        {source:"kitchen", targets:"cocina"});
      vt.m.TranslationProblem.instances["bedroom"] = new vt.m.TranslationProblem(
        {source:"bedroom", targets:"el cuarto; el dormitorio; la recámara"});
      vt.m.TranslationProblem.instances["bathroom"] = new vt.m.TranslationProblem(
        {source:"bathroom", targets:"el cuarto de baño"});
      vt.m.TranslationProblem.instances["January"] = new vt.m.TranslationProblem(
        {source:"January", targets:"enero"});
      vt.m.TranslationProblem.instances["February"] = new vt.m.TranslationProblem(
        {source:"February", targets:"febrero"});
      vt.m.TranslationProblem.instances["March"] = new vt.m.TranslationProblem(
        {source:"March", targets:"marzo"});
      vt.m.TranslationProblem.instances["Monday"] = new vt.m.TranslationProblem(
        {source:"Monday", targets:"lunes"});
      vt.m.TranslationProblem.instances["morning"] = new vt.m.TranslationProblem(
        {source:"morning", targets:"mañana; matutino"});
      vt.m.TranslationProblem.saveAll();
      vt.m.LearningUnit.instances['1'] = new vt.m.LearningUnit({learnUnitId: 1, learnUnitTitle: 'At Home', learnUnitDescription: 'Translations for things around the house', courses: [1,2]});
      vt.m.LearningUnit.instances['2'] = new vt.m.LearningUnit({learnUnitId: 2, learnUnitTitle: 'Months, Days, Times', learnUnitDescription: 'Translations dealing with dates and times', courses: [3,1]});
      vt.m.LearningUnit.instances['3'] = new vt.m.LearningUnit({learnUnitId: 3, learnUnitTitle: 'At Work', learnUnitDescription: 'Translations for things at work', courses: [2,3]});
      vt.m.LearningUnit.saveAll();
    }catch(e){
      console.log(e.constructor.name + ': ' + e.message);
    }
  },
  clearData: function() {
    try {
      vt.m.LearningUnit.instances = {};
      localStorage["learning_units"] = "{}";
      vt.m.Course.instances = {};
      localStorage["courses"] = "{}";
      console.log("All data cleared.");
      vt.m.TranslationProblem.instances = {};
      localStorage["translation_problems"] = "{}";
    } catch (e) {
      console.log( e.constructor.name + ": " + e.message);
    }
  }
}

