const mongoose = require("mongoose");
const Course = require("../models/course");

module.exports = {
  async index(req, res, next) {
    try {
      const courses = await Course.find({});
      res.locals.offeredCourses = courses;
      next();
    } catch (error) {
      console.log(`There was an error trying to get all courses: ${error}`);
      next(error);
    }
  },

  async indexView(req, res) {
    res.render("course/courses");
  },

  async createCourse(req, res, next) {
    try {
      const { tittle, description } = req.body;
      let course = await Course.create({
        tittle: tittle,
        description: description,
      });
      req.flash("success", `Course ${course.tittle} was created sucessfuly`);
      next();
    } catch (error) {
      console.log("An error has occuried creating a new course: ", error);
      req.flash("error", `Failed to create the course`);
      next(error);
    }
  },

  async deleteCourse(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Course.findByIdAndDelete(id);
      if (!result) {
        const error = new Error("Course not found");
        error.status = 404;
        throw error;
      }
      req.flash("success", `Course ${result.tittle} was deleted sucessfuly`);
      next();
    } catch (error) {
      console.log(`There was an error trying to delete this course: ${error}`);
      next(error);
    }
  },
};
