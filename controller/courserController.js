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
};
