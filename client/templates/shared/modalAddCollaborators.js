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
		var collaboratorName = $('#collaboratorName').val();
		Courses.update(
		   {_id: this._id},
		   {$addToSet: {canEditCourse: collaboratorName}}
		);
		$('#collaboratorName').val("");
	},
	'click #remove-collaborator': function (event) {
		console.log(event.target);
		console.log($(event.target).parent());
		var listedCollaborator = $(event.target).parent().text();
		//console.log(listedCollaborator);
		// Courses.update(
		// 	{_id: this._id },
		// 	{$pull: {canEditCourse: listedCollaborator}}
		// );
	}
});

// Template.nestedTemplate.events({
//   'click #remove-collaborator': function (event) {
//     Courses.update({_id: Template.parentData()._id },{$pull: {canEditCourse: this}});
//   }
// });
