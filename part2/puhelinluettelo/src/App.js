import { useState, useEffect } from "react";
import mainService from "./services/mainsvc";

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {`Name: ${person.name}, Number: ${person.number}`}{" "}
          <button onClick={() => onDelete(person)}>Delete</button>{" "}
        </p>
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    mainService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const onAddNewPerson = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      // Confirmation to proceed to update existing contact
      if (
        window.confirm(
          `${existingPerson.name} is already in the phonebook, replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        mainService
          .updateContact(updatedPerson.id, updatedPerson)
          .then(
            mainService.getAll().then((personsList) => setPersons(personsList))
          );
      }

      return;
    }

    mainService
      .createNewContact({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
      .then((newContact) => {
        console.log(newContact);
        setPersons(persons.concat(newContact));
      });

    document.getElementById("myForm").reset();
  };

  const onDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      mainService
        .deleteContact(person.id)
        .then(mainService.getAll().then((persons) => setPersons(persons)));
    }
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
        <Persons persons={filteredPersons} onDelete={onDeletePerson} />
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
