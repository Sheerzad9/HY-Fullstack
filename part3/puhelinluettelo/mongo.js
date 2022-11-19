require("dotenv").config();
const mongoose = require("mongoose");

if (!process.env.MongoDbPassu) {
  console.log("give password as argument in .env file");
  process.exit(1);
}

if (process.argv.length === 3) {
  console.log("give username & number as argument");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const User = mongoose.model("User", userSchema);

if (process.argv.length === 2) {
  User.find({}).then((users) => {
    console.log("phonebook: ");
    users.forEach((user) => console.log(`${user.name}  ${user.number}`));
    mongoose.connection.close();
    process.exit(1);
  });
}

const password = process.env.MongoDbPassu;
const username = process.argv[2];
const number = process.argv[3];

const url = `mongodb+srv://Sheerzad:${password}@cluster0.yomvn.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

mongoose.connect(url);

const user = new User({
  name: username,
  number: number,
});

user.save().then((result) => {
  console.log(`added ${username} number ${number} to phonebook`);
  mongoose.connection.close();
});
