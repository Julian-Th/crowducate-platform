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
      return [];
    }
  },
   'canBeAdded': function () {
      
      var input = Session.get('collaboratorSearchField');
      
      if(Meteor.users.findOne({ 'username' : input })) {
        return true; }
      else {
        return false; }
    }
});

Template.modalAddCollaborators.events({
	'click #add-collaborator' : function (event) {

		var collaboratorName = $('#collaborator-name').val().trim();

    if(Meteor.users.findOne({ 'username' : collaboratorName }))
    {
        Courses.update(
        {_id: this._id},
        {$addToSet: {canEditCourse: collaboratorName}}
        );

        $('#collaborator-name').val("");
    }
    else
      alert("User doesn't exist!");

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

Template.modalAddCollaborators.events({
  'change #add-collaborator , keyup #add-collaborator, mouseup #add-collaborator': function(event, template) {

      var inputName = $('#collaborator-name').val().trim();

      Session.set('collaboratorSearchField', inputName);
  }
});

// Template.mytemplate.events({
//   'input #element': function (event, template) {
//     Session.set("whatever", event.currentTarget.value);
//   }
// });

// $(event.currentTarget).val()

// Template.myTemplate.events({
//     'change #myelement, keyup #myelement, mouseup #myelement': function(template, event) {
//         Session.set('myVal', $(event.currentTarget).val());
//     }
// });


