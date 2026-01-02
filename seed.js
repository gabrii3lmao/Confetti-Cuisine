const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

async function seedDatabase() {
  await mongoose.connect("mongodb://127.0.0.1:27017/recipe_db");

  console.log("Conectado ao banco");

  // limpa dados antigos (opcional)
  await Subscriber.deleteMany({});
  await Course.deleteMany({});

  // cria courses
  const course1 = await Course.create({
    tittle: "Node.js Backend",
    description: "API com Node e Express",
    zipCode: 10016,
  });

  const course2 = await Course.create({
    tittle: "NestJS Fundamentals",
    description: "Arquitetura backend com NestJS",
    zipCode: 10016,
  });

  console.log("Courses criados");

  
  const subscriber = await Subscriber.create({
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016,
    courses: [course1._id, course2._id],
  });

  console.log("Subscriber criado");

  
  const populatedSubscriber = await Subscriber
    .findById(subscriber._id)
    .populate("courses");

  console.log(JSON.stringify(populatedSubscriber, null, 2));

  await mongoose.connection.close();
  console.log("Conexão encerrada");
}

seedDatabase().catch(console.error);
