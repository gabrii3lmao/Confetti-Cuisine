const User = require("../models/User");

module.exports = {
  async index(req, res, next) {
    try {
      const users = await User.find({});
      res.locals.users = users;
      next();
    } catch (error) {
      console.log(`There was an error trying to get all users: ${error}`);
      next(error);
    }
  },

  indexView(req, res) {
    res.render("users/index");
  },

  new(req, res) {
    res.render("users/new");
  },

  async create(req, res, next) {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode,
    };
    try {
      let user = await User.create(userParams);
      res.locals.redirect = "/users";
      res.locals.user = user;
      next();
    } catch (error) {
      console.log("An error has occuried creating a new User: ", error);
      next(error);
    }
  },

  redirectView(req, res, next) {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};
