Template.modalAddCollaborators.events({
	'click #js-addCollaborator' : function (event) {
		var collaboratorName = $('#collaboratorName').val(); // 
		Courses.update(
		   { _id: this._id },
		   { $addToSet: {canEditCourse: collaboratorName } }
		)
		$('#collaboratorName').val("");
	}
});