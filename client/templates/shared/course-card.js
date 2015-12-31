// Template.courseCard.onRendered(function (){

//   // Get reference to template instance
//   var instance = Template.instance();

//   // Get course ID
//   var ImageId = instance.course.coverImageId;

//   alert("coverImageId: " +ImageId);
//   // Fetch course from DB, for reactivity
//   //var course = Courses.findOne(courseId);

//   // Get current user id
//   //var currentUserId = Meteor.userId();     

//   //Meteor.subscribe("publishedCourses");
// });

Template.courseCard.helpers({
    'truncateKeywords': function (truncate, keywords) {
        /*
        Truncate keywords to a set limit
        Return an object with three attributes
            truncated keywords - array of keywords up to truncate limit
            remaining keywords - array of keywords excluded by truncate
            count of remaining keywords - numeric count of keywords excluded by truncate
        */
        var truncatedKeywordsObject = {
            'truncatedKeywords': keywords.slice(0, truncate),
            'remainingKeywords': keywords.slice(truncate),
            'remainingKeywordCount': keywords.length - truncate
        };

        return truncatedKeywordsObject;
    },

    'allowedToEditCourse': function() {
        if (Meteor.user())
        {
            if(_.contains(this.canEditCourse, Meteor.user().username))
                return true;
            else
                return false;
        }
        else
            return false;
    }
});

Template.courseCard.events({
  'click #edit-course':function(event, template){
    // Get reference to Router
    var router = Router.current();

    // Get Course ID from router
    var courseId = router.params._id;

    // set editing course session variable to this course id
    Session.set('editingCourseId', courseId);
  },
  "click #manage-collaborators": function () {
    // Get named reference to course
    var course = this;

    // Show the add collaborators modal,
    // passing in course as data context
    Modal.show("modalAddCollaborators", course);
  }
});
