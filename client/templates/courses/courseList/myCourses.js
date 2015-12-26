// create a completely new course
Template.myCourses.events({
	'click .js-create-course': function (event) {
		event.preventDefault();
		Router.go("/teach");
	}
});

Template.myCourses.helpers({
    'courses': function(){
        return Courses.find();
    }
});

Template.myCourses.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all published courses
  instance.subscribe("editableCourses");
};