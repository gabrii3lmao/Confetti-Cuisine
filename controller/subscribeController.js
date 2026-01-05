const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");

module.exports = {
  async index(req, res, next) {
    try {
      const subscribers = await Subscriber.find({});
      res.locals.subscribers = subscribers;
      next();
    } catch (error) {
      console.log("An error has occuried searching all subscriber: ", error);
      next(error);
    }
  },

  async indexView(req, res) {
    res.render("subscribers/index");
  },

  async createSubscriber(req, res, next) {
    try {
      const { name, email, zipCode } = req.body;
      await Subscriber.create({ name: name, email: email, zipCode: zipCode });
      next();
    } catch (error) {
      console.log("An error has occuried creating a new subscriber: ", error);
      next(error);
    }
  },
};
