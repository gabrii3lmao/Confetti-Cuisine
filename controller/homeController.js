exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

exports.showCourseForm = (req, res) => {
  res.render("course/createCourse");
};