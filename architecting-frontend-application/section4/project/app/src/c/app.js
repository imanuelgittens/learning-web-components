/**
 * @fileoverview - App level controller code
 * @author - Imanuel Gittens
 * */

//main namespace and sub namespace definitions

var vt = {
  m: {},
  v: {Courses: {}, LearningUnits: {}},
  c: {Courses: {}, LearningUnits: {}}
}

vt.c.app = {
  generateTestData: function(){
    try{
      vt.m.LearningUnit.instances['1'] = new vt.m.LearningUnit({learnUnitId: 1, learnUnitTitle: 'At Home', learnUnitDescription: 'Translations for things around the house'});
      vt.m.LearningUnit.instances['2'] = new vt.m.LearningUnit({learnUnitId: 2, learnUnitTitle: 'Months, Days, Times', learnUnitDescription: 'Translations dealing with dates and times'});
      vt.m.LearningUnit.instances['3'] = new vt.m.LearningUnit({learnUnitId: 3, learnUnitTitle: 'At Work', learnUnitDescription: 'Translations for things at work'});
      vt.m.LearningUnit.saveAll();
      vt.m.Course.instances['1'] = new vt.m.Course({courseId: 1, courseTitle: 'Course 1', courseDescription: 'The first course'});
      vt.m.Course.instances['2'] = new vt.m.Course({courseId: 2, courseTitle: 'Course 2', courseDescription: 'The second course'});
      vt.m.Course.instances['3'] = new vt.m.Course({courseId: 3, courseTitle: 'Course 3',courseDescription: 'The third course'});
      vt.m.Course.saveAll();
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
    } catch (e) {
      console.log( e.constructor.name + ": " + e.message);
    }
  }
}

