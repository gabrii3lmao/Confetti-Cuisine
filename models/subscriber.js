const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  zipCode: { type: String },
});


module.exports = mongoose.model("Subscribes", subscriberSchema);