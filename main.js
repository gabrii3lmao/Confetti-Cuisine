require("dotenv/config");

const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");

const errorController = require("./controller/errorController");
const router = require("./routes");

const methodOverride = require("method-override");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const MongoStore = require("connect-mongo").default;
const mongoose = require("mongoose");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);
app.use(methodOverride("_method"));

app.use(
  expressSession({
    secret: process.env.secret_passcode,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/recipe_db",
      collectionName: "sessions",
    }),
  })
);
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//configs
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(router);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

async function startApplication() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/recipe_db");
    console.log("Connected to the database");

    app.listen(app.get("port"), () => {
      console.log(
        `Server is running on port: http://localhost:${app.get("port")}`
      );
    });
  } catch (error) {
    console.error(
      "There was an error trying to connect to the database:",
      error
    );
  }
}

startApplication();
