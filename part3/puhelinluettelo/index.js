const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
// Luodaan oma token tyyppi
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Lamar odom",
    number: "112",
  },
  {
    id: 2,
    name: "Peruna Muusi",
    number: "05451216878",
  },
  {
    id: 3,
    name: "Tuomas Mikkola",
    number: "21654213218",
  },
  {
    id: 4,
    name: "Testi Tuutti",
    number: "0541054894",
  },
];

const generateId = () => Math.max(...persons.map((person) => person.id)) + 1;
const checkForDuplicateName = (name) => {
  const duplicatePerson = persons.find((person) => person.name === name);
  return duplicatePerson ? true : false;
};

app.get("/", (req, res) => {
  res.send("<h1>Server is up!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = persons.find((person) => id === person.id);

  console.log(person);
  if (!person) {
    console.log("Moro");
    return res
      .status(404)
      .send(`<h2>There is no person with the id: ${id}, in the db</h2>`);
  }

  res.json(person);
});

app.get("/info", (req, res) => {
  res.send(
    `<h2>phonebook has info for ${persons.length} people</h2><br/>${new Date()}`
  );
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "Request was missing name or number (or maybe both.....)",
    });
  }

  if (checkForDuplicateName(body.name)) {
    return res.status(404).json({
      error: "There is already person with given name, name must be unique",
    });
  }

  const newPerson = { name: body.name, number: +body.number, id: generateId() };
  persons.push(newPerson);
  res.status(204).json(persons);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  persons = persons.filter((person) => id !== person.id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
