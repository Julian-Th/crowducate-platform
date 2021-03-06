var triggerValidation = function(event, template){

      var inputName = $('#collaborator-username').val().trim();

      var isRegisteredUser = false;

      // Get reference to template instance
      var instance = Template.instance();

      // Get course ID
      var courseId = instance.course._id

      // Fetch course from DB, for reactivity
      var course = Courses.findOne(courseId);

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

      //Remove course creator from array
      usernames = _.reject(usernames, function(u) { return u == course.author; } );

      //if(Meteor.users.findOne({ 'username' : inputName })){
      if (_.contains(usernames, inputName)) {
          isRegisteredUser = true;
      }
        
      else {
        isRegisteredUser = false;
      }  

      Session.set('canBeAdded', isRegisteredUser);
    }
}

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
    var collaborators_all = course.canEditCourse;

    //Remove course creator from array
    var collaborators = _.reject(collaborators_all, function(collab) { return collab == course.author; } );

    return collaborators;
  },

  "allUsernamesExceptCurrentUser": function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get course ID
    var courseId = instance.course._id

    // Fetch course from DB, for reactivity
    var course = Courses.findOne(courseId);

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

    //Remove course creator from array
    usernames = _.reject(usernames, function(u) { return u == course.author; } );

      // Return usernames array
      return usernames;
    } 

    else {
      // Otherwise return an empty array
      return [];
    }
  }
});

if (Meteor.isClient) {

  Template.registerHelper('canBeAdded', function(input) {
    return Session.get("canBeAdded");
  });

}

Template.modalAddCollaborators.helpers({

  select: function(event, template) {
    triggerValidation(event, template);
  },

  autocomplete: function(event, template){
    triggerValidation(event, template);
  }
});

Template.modalAddCollaborators.events({

  'input, change, keypress, mouseup #collaborator-username': function(event, template) {
    triggerValidation(event, template);
  },

  'click #add-collaborator' : function (event, template) {
    // Prevent form submission from refreshing the page
    event.preventDefault();

    // Get collaborator username from form element
    var collaboratorUsername = $('#collaborator-username').val();

    if(Meteor.users.findOne({ 'username' : collaboratorUsername }))
    {
      // Update the course, adding collaborator to list
      Courses.update(
         {_id: this._id},
         {$addToSet: {canEditCourse: collaboratorUsername}}
      );
    }

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