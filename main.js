const express = require("express");
const app = express();
const homeController = require("./controller/homeController");
const errorController = require("./controller/errorController");
const subscribersControllers = require("./controller/subscribeController");

const layouts = require("express-ejs-layouts");

// mongoDb config
const mongoose = require("mongoose");
const courserController = require("./controller/courserController");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);

//configs
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

// rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/createCourse", homeController.showCourseForm);
app.post("/createCourse", courserController.createCourse, (req, res) => {
  res.render("thanks");
});

app.get("/courses", courserController.getAllCourses, (req, res) => {
  res.render("courses", { offeredCourses: req.data });
});

app.get("/contact", homeController.showSignUp);
app.post("/contact", subscribersControllers.createSubscriber, (req, res) => {
  res.render("thanks");
});

app.get(
  "/subscribers",
  subscribersControllers.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

async function startApplication() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/recipe_db");
    console.log("BD conectado");

    app.listen(app.get("port"), () => {
      console.log(
        `Server is running on port: http://localhost:${app.get("port")}`
      );
    });
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", err);
  }
}

startApplication();
