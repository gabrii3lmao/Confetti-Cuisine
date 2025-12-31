const express = require("express");
const router = express.Router();
const homeController = require("./controller/homeController");
const subscribersControllers = require("./controller/subscribeController");
const courseController = require("./controller/courserController");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/createCourse", homeController.showCourseForm);
router.post("/createCourse", courseController.createCourse, (req, res) => {
  res.render("thanks");
});

router.get("/courses", courseController.getAllCourses, (req, res) => {
  res.render("courses", { offeredCourses: req.data });
});
router.delete("/courses/:id", courseController.deleteCourse, (req, res) => {
  res.redirect("/courses");
});

router.get("/contact", homeController.showSignUp);
router.post("/contact", subscribersControllers.createSubscriber, (req, res) => {
  res.render("thanks");
});

router.get(
  "/subscribers",
  subscribersControllers.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

module.exports = router;
