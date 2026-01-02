const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  zipCode: { type: Number, min: [10000, "zip code too short"], max: 99999 },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
});

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} | Email: ${this.email} | Zip Code: ${this.zipCode}`;
};

subscriberSchema.statics.findLocalSubscribers = function (zipCode) {
  return this.find({ zipCode });
};

module.exports = mongoose.model("Subscriber", subscriberSchema, "subscribes");
