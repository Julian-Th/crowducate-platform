// create a completely new course
Template.myTeachingCourses.events({
	'click .js-create-course': function (event) {
		event.preventDefault();
		Router.go("/teach");
	}
});

Template.myTeachingCourses.helpers({
    'courses': function(){
	  
    var myUser = Meteor.user().username;

	  return Courses.find({"canEditCourse": { $in: [ myUser ] } });
      //return Courses.find();
    }
});

Template.myTeachingCourses.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all published courses
  instance.subscribe("publishedCourses");
};