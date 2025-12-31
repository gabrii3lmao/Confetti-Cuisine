const mongoose = require("mongoose");
const Course = require("../models/course");

module.exports = {
  async getAllCourses(req, res, next) {
    try {
      const courses = await Course.find({});
      req.data = courses;
      next();
    } catch (error) {
      console.log(`There was an error trying to get all courses: ${error}`);
      next(error);
    }
  },

  async createCourse(req, res, next) {
    try {
      const { name, cost } = req.body;
      await Course.create({ name: name, cost: cost });
      next();
    } catch (error) {
      console.log("An error has occuried creating a new course: ", error);
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
      next();
    } catch (error) {
      console.log(`There was an error trying to delete this course: ${error}`);
      next(error);
    }
  },
};
