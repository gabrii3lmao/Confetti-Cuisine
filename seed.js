const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

async function restoreDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/recipe_db");
    console.log("Connected to the database");
    mongoose.connection;

    const contacts = [
      { name: "Jon Wexler", email: "jon@jonwexler.com", zipCode: 10016 },
      {
        name: "Chef Eggplant",
        email: "eggplant@recipeapp.com",
        zipCode: 20331,
      },
      {
        name: "Professor Souffle",
        email: "souffle@recipeapp.com",
        zipCode: 19103,
      },
    ];

    await Subscriber.deleteMany();
    console.log("Users deleted");

    for (const c of contacts) {
      await Subscriber.create({
        name: c.name,
        email: c.email,
        zipCode: c.zipCode,
      });
    }
    console.log("Users created");
  } catch (error) {
    console.log(
      `An error has ocorried trying to restore the database: ${error}`
    );
  } finally {
    await mongoose.connection.close();
    console.log(`Connection closed with the database!`);
  }
}

restoreDb();
