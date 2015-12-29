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

    // bubble up to retrieve (user)name of the to be removed collaborator 
    var listedCollaborator = $(event.currentTarget).parent().text();

		Courses.update(
			{_id: Template.parentData(0)._id },
			{$pull: {canEditCourse: listedCollaborator}}
		);
	}
});
