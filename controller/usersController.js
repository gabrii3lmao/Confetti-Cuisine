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
      req.flash("success", `${user.fullName}'s account created successfully!`);
      res.locals.redirect = "/users";
      res.locals.user = user;
      next();
    } catch (error) {
      console.log("An error has occuried creating a new User: ", error);
      req.flash("error", `Failed to create user account.`);
      next(error);
    }
  },

  redirectView(req, res, next) {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  async show(req, res, next) {
    const { id } = req.params;
    try {
      res.locals.user = await User.findById(id);
      next();
    } catch (error) {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    }
  },

  showView(req, res) {
    res.render("users/show");
  },

  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      req.flash("success", `${result.fullName}'s account was deleted!`);
      next();
    } catch (error) {
      console.log(`There was an error trying to delete this user: ${error}`);
      req.flash("error", `Couldn't delete the account`);
      next(error);
    }
  },

  async edit(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render("users/edit", { user: user });
    } catch (error) {
      console.log(`Error fetching user by ID: ${error}`);
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).send("User not found");
      }

      user.set({
        name: {
          first: req.body.first,
          last: req.body.last,
        },
        email: req.body.email,
        zipCode: req.body.zipCode,
      });

      if (req.body.password) {
        user.password = req.body.password;
      }

      await user.save();

      res.redirect(`/users/${user._id}`);
    } catch (error) {
      next(error);
    }
  },

  login(req, res) {
    res.render("users/login");
  },

  async authenticate(req, res, next) {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user && user.password === req.body.password) {
        res.locals.redirect = `/users/${user._id}`;
        req.flash("success", `${user.fullName}'s logged in successfully!`);
        res.locals.user = user;
        next();
      } else {
        req.flash(
          "error",
          `Your account or password is incorrect.
Please try again or contact your system administrator!`
        );
        res.locals.redirect = "/users/login";
        next();
      }
    } catch (error) {
      console.log(`Error logging in user: ${error}`);
      next(error);
    }
  },
};
