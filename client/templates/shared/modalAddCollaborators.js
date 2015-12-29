Template.modalAddCollaborators.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get course object from template instance, naming for semantics
  instance.course = instance.data;
};

Template.modalAddCollaborators.rendered = function() {
    // initializes all typeahead instances
    Meteor.typeahead.inject();
};

Template.modalAddCollaborators.helpers({
	'collaborators': function () {
    // Get course object
		var course = Courses.findOne();

    //Get collaborators array
    var collaborators = course.canEditCourse;

    return collaborators;
	}
});

Template.modalAddCollaborators.events({
	'click #add-collaborator' : function (event) {
		var collaboratorName = $('#collaborator-name').val();
		Courses.update(
		   {_id: this._id},
		   {$addToSet: {canEditCourse: collaboratorName}}
		);
		$('#collaboratorName').val("");
	},
	'click #remove-collaborator': function (event) {
    // prevent button from triggering page reload
    event.preventDefault();

    // Get reference to template instance
    var instance = Template.instance();

    // Get Course ID from template instance
    var courseId = instance.course._id;

    // Get username, coercing it to a string (it is an array for some reason)
		var username = this.toString();

		Courses.update(
			courseId,
			{$pull: {canEditCourse: username}}
		);
	}
});
