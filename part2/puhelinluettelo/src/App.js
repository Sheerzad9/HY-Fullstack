import { useState } from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p
          key={person.name}
        >{`Name: ${person.name}, Number: ${person.number}`}</p>
      ))}
    </div>
  );
};

const Filter = ({ setFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input onChange={(e) => setFilter(e.target.value)}></input>
    </div>
  );
};

const PersonForm = ({ setNewName, setNewNumber, onAddNewPerson }) => {
  return (
    <form id="myForm">
      <div>
        name:{" "}
        <input
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
      </div>
      <div>
        number: <input onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={onAddNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const onAddNewPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    document.getElementById("myForm").reset();
  };

  const filteredPersons =
    filter.trim().length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(filter.toLowerCase())
        );

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter setFilter={setFilter} />
        <h3>Add a new</h3>
        <PersonForm
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          onAddNewPerson={onAddNewPerson}
        />
        <h2>Numbers</h2>
        <Persons persons={filteredPersons} />
      </div>
      <div>
        <div>
          debug name: {newName}
          <br />
          debug number: {newNumber}
          <br />
          filter: {filter}
        </div>
      </div>
    </div>
  );
};

export default App;
