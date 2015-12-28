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

Template.modalAddCollaborators.helpers({
	'addedCollaborators': function () {
		return Courses.find().fetch();
		//return Courses.find({_id: this._id}, {$in: "canEditCourse"});
		//return Courses.distinct("canEditCourse");
	}
});