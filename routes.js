const express = require("express");
const router = express.Router();

const homeController = require("./controller/homeController");
const subscribersControllers = require("./controller/subscribeController");
const courseController = require("./controller/courserController");
const usersController = require("./controller/usersController");

// ========== HOME ==========
router.get("/", (req, res) => res.render("index"));

// ========== COURSES ==========
router.get("/courses/new", homeController.showCourseForm);
router.post("/courses/new", courseController.createCourse, (req, res) => res.redirect("/courses"));

router.get("/courses", courseController.index, courseController.indexView);
router.delete("/courses/:id", courseController.deleteCourse, (req, res) => res.redirect("/courses"));

// ========== CONTACT ==========
router.get("/contact", homeController.showSignUp);

// ========== SUBSCRIBERS ==========
router.get("/subscribers", subscribersControllers.index, subscribersControllers.indexView);

router.post("/subscribe", subscribersControllers.createSubscriber, (req, res) => {
  res.locals.flashMessages = {
    success: req.flash("success") || [],
    error: req.flash("error") || [],
  };
  res.render("thanks");
});

// ========== USERS ROUTES ==========
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);

// ========== USERS DYNAMIC ROUTES ==========
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update);
router.delete("/users/:id/delete", usersController.deleteUser, usersController.redirectView);

// show deve vir por último
router.get("/users/:id", usersController.show, usersController.showView);

module.exports = router;
