Meteor.publish('courses', function () {
    return Courses.find();
});

Meteor.publish('publishedCourses', function () {
    return Courses.find({"published": "true"});
});

Meteor.publish('editableCourses', function () {
    return Courses.find({"createdById": this.userId});
});

Meteor.publish('taggedCourses', function (tag) {
    return Courses.find({"keywords": tag});
});

Meteor.publish('singleCourse', function (courseId) {
    return Courses.find({"_id": courseId});
});
