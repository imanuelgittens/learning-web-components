(function($, Handlebars) {
  'use strict';
  // Grab the template script
  let theTemplateScript = $('#portfolio-template').html();

  //about partial
  let aboutStr = $('#about-partial').html();
  Handlebars.registerPartial('about', aboutStr);

  //projects partial
  let projectsStr = $('#project-partial').html();
  Handlebars.registerPartial('projects', projectsStr);

  //skills partial
  let skillsStr = $('#skills-partial').html();
  Handlebars.registerPartial('skills', skillsStr);

  //contact partial
  let contactStr = $('#contact-partial').html();
  Handlebars.registerPartial('contact', contactStr);

  // Compile the template
  let theTemplate = Handlebars.compile(theTemplateScript);

  let context = {
    about:
      "I'm a pretty cheerful guy who loves building software applications. I'm particularly interested in E-Commerce applications that can help the Caribbean region. To accomplish my goals I've taken on the challenge of becoming a fullstack developer. My ultimate goal is to be able to build any application (front and backend) fromt he ground up and my it work exactly how I intend. :)",
    projects:
      "Throughout my studies at Modern Developer, I created many projects for practice while honing my development skills. This page will be used to showcase all the projects I've created so far, and will be updated when I create new projects in the future.",
    skills:
      'Details about my areas of expertise can be found below. I try to be good at everything relating to web development so that I can assist with a project from start to finish.',
    contact:
      "If you'd like to get in contact with me, see my details below. I'd love to see how we can work together on a future project!"
  };

  // Pass our data to the template
  let theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('#templated-portfolio').html(theCompiledHtml);

  // let templateSource = $('#templated-portfolio').html();
  // let template = Handlebars.compile(templateSource);
  //
  // let setPortfolio = function(data){
  //   let html = template({data: data});
  //   $('#templated-portfolio').append(html);
  // }
  //
  //
  // $.get('portfolio.json', function (response) {
  //   setPortfolio(response);
  // });
})(Zepto, Handlebars);
