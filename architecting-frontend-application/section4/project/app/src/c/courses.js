/**
 * @fileOverview  Contains various controller functions for managing books
 * @author Gerd Wagner
 */
vt.c.Courses.manage = {
  initialize: function () {
    vt.m.Course.retrieveAll();
    vt.v.Courses.retrieveAndListAll.setupUserInterface();
    vt.v.Courses.createCourse.setupUserInterface();
    vt.v.Courses.updateCourse.setupUserInterface();
    vt.v.Courses.destroy.setupUserInterface();
  }
};

