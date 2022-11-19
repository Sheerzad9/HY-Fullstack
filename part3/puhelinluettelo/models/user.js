require("dotenv").config();
const mongoose = require("mongoose");

if (!process.env.MongoDbPassu) {
  console.log("give password as argument");
  process.exit(1);
}

const url = process.env.MONGODB_URI_WITH_PWD;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
