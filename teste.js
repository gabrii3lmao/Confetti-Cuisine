const mongoose = require("mongoose");
const User = require("./models/User");
const subscriber = require("./models/subscriber");

async function seedDatabase() {
  await mongoose.connect("mongodb://127.0.0.1:27017/recipe_db");

  console.log("Conectado ao banco");

  // limpa dados antigos (opcional)
  await User.deleteMany({});
  // cria courses
  const userOne = await User.create({
    name: {
      first: "gabriel",
      last: "moura",
    },
    email: "gabriel@luz.com",
    password: "pass123",
  });
  console.log("User criado");

  let targetSubscriber = await subscriber.findOne({ email: userOne.email });
  console.log(`target subscriber encontrado!`);
  console.log(targetSubscriber);

  userOne.subscribedAccount = targetSubscriber;
  await userOne.save();
  console.log(`User atualizado!`);
  await mongoose.connection.close();
  console.log("Conexão encerrada");
}

seedDatabase().catch(console.error);
