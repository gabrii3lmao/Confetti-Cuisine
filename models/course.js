const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  itens: [],
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999,
  },
});

module.exports = mongoose.model("Courses", courseSchema);
