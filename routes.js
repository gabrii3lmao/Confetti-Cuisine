const express = require("express");
const router = express.Router();
const homeController = require("./controller/homeController");
const subscribersControllers = require("./controller/subscribeController");
const courseController = require("./controller/courserController");
const usersController = require("./controller/usersController");

router.get("/", (req, res) => {
  res.render("index");
});

// courses routes
router.get("/courses/new", homeController.showCourseForm);
router.post("/courses/new", courseController.createCourse, (req, res) => {
  res.redirect("/courses");
});

router.get("/courses", courseController.index, courseController.indexView);
router.delete("/courses/:id", courseController.deleteCourse, (req, res) => {
  res.redirect("/courses");
});

router.get("/contact", homeController.showSignUp);

// subscribers routes
router.get(
  "/subscribers",
  subscribersControllers.index,
  subscribersControllers.indexView
);

router.post(
  "/subscribe",
  subscribersControllers.createSubscriber,
  (req, res) => {
    res.render("thanks");
  }
);

//users routes
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.get("/users/:id", usersController.show, usersController.showView);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.delete("/users/:id/delete", usersController.deleteUser, (req, res) => {
  res.redirect("/users");
});
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update);

module.exports = router;
