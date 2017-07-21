/**
 * @fileOverview  Contains various controller functions for rendering forms
 * @author Imanuel Gittens
 */
vt.c.RenderingForms.manage = {
  initialize: function () {
    vt.m.RenderingForm.retrieveAll();
    vt.v.RenderingForms.retrieveAndListAll.setupUserInterface();
    vt.v.RenderingForms.createRenderingForm.setupUserInterface();
    vt.v.RenderingForms.updateRenderingForm.setupUserInterface();
    vt.v.RenderingForms.destroy.setupUserInterface();
  }
};