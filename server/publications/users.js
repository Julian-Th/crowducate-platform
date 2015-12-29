Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'realname': 1, 'username': 1, 'gender': 1, 'language': 1, 'biography': 1 }})
    }
});

Meteor.publish("allUsernamesExceptCurrent", function () {
  // Get current user
  var currentUserId = this.userId;

  // Get all users except current,
  // only get username field
  var users = Meteor.users.find(
    {_id: {$ne: currentUserId}},
    {fields: {username: 1}}
  );

  return users;
});
