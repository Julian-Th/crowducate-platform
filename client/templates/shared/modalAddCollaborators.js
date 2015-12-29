Template.modalAddCollaborators.rendered = function() {
    Meteor.typeahead.inject();
};

Template.modalAddCollaborators.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get course object from template instance, naming for semantics
  instance.course = instance.data;

  instance.subscribe("allUsernamesExceptCurrent");
};

Template.modalAddCollaborators.helpers({
	'collaborators': function () {
    // Get course object
		var course = Courses.findOne();
    //console.log(course);
    //Get collaborators array
    var collaborators = course.canEditCourse;
    //console.log(collaborators);
    return collaborators;
	},
  "allUsernamesExceptCurrentUser": function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get current user id
    var currentUserId = Meteor.userId();

    if (instance.subscriptionsReady()) {
      // Get all users except current,
      // only get username field
      var users = Meteor.users.find(
        {_id: {$ne: currentUserId}},
        {fields: {username: 1}}
      ).fetch();

      // Make an array of usernames
      var usernames = _.map(users, function (user) {
        // Get username from this user
        var username = user.username;

        return username;
      });

      // Return usernames array
      return usernames;
    } else {
      return [];
    }
  }
});

Template.modalAddCollaborators.events({
	'click #add-collaborator' : function (event) {
		var collaboratorName = $('#collaborator-name').val();
		Courses.update(
		   {_id: this._id},
		   {$addToSet: {canEditCourse: collaboratorName}}
		);
		$('#collaborator-name').val("");
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
