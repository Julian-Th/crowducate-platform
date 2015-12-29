Template.modalAddCollaborators.created = function () {
  // Get reference to template instance
  var instance = this;

  // Set course as instance variable
  instance.course = Courses.findOne();

  // Set course author as instance variable
  instance.courseAuthor = course.author;
};


Template.modalAddCollaborators.rendered = function() {
    // initializes all typeahead instances
    Meteor.typeahead.inject();
};

Template.modalAddCollaborators.helpers({
	'addedCollaborators': function () {
		return Courses.find().fetch();
	}
});

Template.modalAddCollaborators.events({
	'click #js-addCollaborator' : function (event) {
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
