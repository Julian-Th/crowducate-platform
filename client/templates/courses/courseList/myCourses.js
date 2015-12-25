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