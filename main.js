const express = require("express");
const app = express();
const errorController = require("./controller/errorController");
const router = require("./routes");
const methodOverride = require("method-override");
const layouts = require("express-ejs-layouts");

// mongoDb config
const mongoose = require("mongoose");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);
app.use(methodOverride("_method"));
//configs
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(router);
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
    console.error("Erro ao conectar no MongoDB:", error);
  }
}

startApplication();
