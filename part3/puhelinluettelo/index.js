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

app.get("/api/persons/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        console.log(user);
        res.json(user);
      } else {
        res
          .status(404)
          .json({ msg: `User with id: ${req.params.id} not found in the db` });
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.get("/info", (req, res, err) => {
  User.find({})
    .then((persons) => {
      if (persons) {
        res.send(
          `<h2>phonebook has info for ${
            persons.length
          } people</h2><br/>${new Date()}`
        );
      }
    })
    .catch((err) => next(err));
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
      error: `There is already person with given name: '${body.name}', name must be unique!`,
    });
  }
  const newUser = new User({ name: body.name, number: body.number });
  newUser.save().then((savedPerson) => res.json(savedPerson));
});

app.put("/api/persons/:id", (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    { number: req.body.number },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("Result: ", result);
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error);
  console.error("Message: ", error.message);
  console.log("Error name: ", error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
