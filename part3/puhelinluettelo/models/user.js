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
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (numberToValidate) {
        console.log("numberToValidate: ", numberToValidate);
        return /^[0-9]{2,3}-[0-9]+$/g.test(numberToValidate);
      },
      message: (props) =>
        `Number ${props.value} is not valid, should contain 2-3 number then '-' char and the rest of the numbers`,
    },
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
