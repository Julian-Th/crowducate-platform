Template.modalAddCollaborators.rendered = function() {
    // initializes all typeahead instances
    Meteor.typeahead.inject();
};

Template.modalAddCollaborators.courses = function(){
	return Courses.find().fetch().map(function(it){ return it.author; });
 //return users.find().fetch().map(function(it){ return it.username; });
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