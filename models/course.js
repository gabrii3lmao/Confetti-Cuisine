const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String },
  cost: { type: Number },
});

module.exports = mongoose.model("Courses", courseSchema);
