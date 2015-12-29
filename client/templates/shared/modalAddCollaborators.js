Template.modalAddCollaborators.rendered = function() {
    Meteor.typeahead.inject();
};

Template.modalAddCollaborators.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get course object from template instance, naming for semantics
  instance.course = instance.data;

  // Subscribe to all users, to get usernames for typeahead autocomplete
  instance.subscribe("allUsernamesExceptCurrent");
};

Template.modalAddCollaborators.helpers({
	'collaborators': function () {
    // Get named reference to template instance
    var instance = Template.instance();

    // Get course ID
		var courseId = instance.course._id

    // Fetch course from DB, for reactivity
    var course = Courses.findOne(courseId);

    //Get collaborators array
    var collaborators = course.canEditCourse;

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
      // Otherwise return an empty array
      return [];
    }
  }
});

Template.modalAddCollaborators.events({
	'submit #add-collaborator-form' : function (event) {
    // Prevent form submission from refreshing the page
    event.preventDefault();

    // Get collaborator username from form element
		var collaboratorUsername = $('#collaborator-username').val();

    // Update the course, adding collaborator to list
		Courses.update(
		   {_id: this._id},
		   {$addToSet: {canEditCourse: collaboratorUsername}}
		);

    // Clear the form field
		$('#collaborator-username').val("");
	},
	'click #remove-collaborator': function (event) {
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
