/**
 * @fileoverview - App level controller code
 * @author - Imanuel Gittens
 * */

//main namespace and sub namespace definitions

var vt = {
  m: {},
  v: {LearningUnits: {}},
  c: {LearningUnits: {}}
}

vt.c.app = {
  generateTestData: function(){
    try{
      vt.m.LearningUnit.instances['1'] = new vt.m.LearningUnit({learnUnitId: 1, learnUnitTitle: 'At Home', learnUnitDescription: 'Translations for things around the house'});
      vt.m.LearningUnit.instances['2'] = new vt.m.LearningUnit({learnUnitId: 2, learnUnitTitle: 'Months, Days, Times', learnUnitDescription: 'Translations dealing with dates and times'});
      vt.m.LearningUnit.instances['3'] = new vt.m.LearningUnit({learnUnitId: 3, learnUnitTitle: 'At Work', learnUnitDescription: 'Translations for things at work'});
      vt.m.LearningUnit.saveAll();
    }catch(e){
      console.log(e.constructor.name + ': ' + e.message);
    }
  },
  clearData: function() {
    try {
      vt.m.LearningUnit.instances = {};
      localStorage["learning_units"] = "{}";
      console.log("All data cleared.");
    } catch (e) {
      console.log( e.constructor.name + ": " + e.message);
    }
  }
}

