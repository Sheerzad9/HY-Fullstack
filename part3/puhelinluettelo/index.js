const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const User = require("./models/user");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
// Luodaan oma token tyyppi
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

async function checkForDuplicateName(name) {
  // Returns user with given name, else null
  return await User.findOne({ name: name });
}

app.get("/api/persons", (req, res) => {
  User.find({}).then((users) => res.json(users));
});

app.get("/api/persons/:id", (req, res) => {
  User.findById(req.params.id).then((user) => {
    console.log(user);
    res.json(user);
  });
});

app.get("/info", (req, res) => {
  res.send(
    `<h2>phonebook has info for ${persons.length} people</h2><br/>${new Date()}`
  );
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "Request was missing name or number (or maybe both.....)",
    });
  }

  const userIsDuplicate = await checkForDuplicateName(body.name);
  if (userIsDuplicate) {
    return res.status(404).json({
      error: "There is already person with given name, name must be unique",
    });
  }

  const newUser = new User({ name: body.name, number: body.number });
  newUser.save().then((savedPerson) => res.json(savedPerson));
});

app.put("/api/persons/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { number: req.body.number },
    { new: true }
  ).then((updatedUser) => {
    res.json(updatedUser);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  persons = persons.filter((person) => id !== person.id);

  res.status(200).json(persons);
});

const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
