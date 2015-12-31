Template.editCourse.events({
  'click #edit-course':function(event, template){
    // Get reference to Router
    var router = Router.current();

    // Get Course ID from router
    var courseId = router.params._id;

    // set editing course session variable to this course id
    Session.set('editingCourseId', courseId);
  }
});

Template.editCourse.helpers({
	'allowedToEditCourse': function() {

	    // Get reference to Router
	    var router = Router.current();

	    // Get Course ID from router
	    var courseId = router.params._id;

	    var course  = Courses.find(courseId).fetch()[0];

	    if (Meteor.user())
	    {
	        if(_.contains(course.canEditCourse, Meteor.user().username))
	            return true;
	        else
	            return false;
	    }
	    else
	        return false;
	}
});

