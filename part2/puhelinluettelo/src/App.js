import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import mainService from "./services/mainsvc";

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <p key={i}>
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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState();

  useEffect(() => {
    mainService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const setNotificationWithTimeout = (
    notificationObj,
    timeoutinMillis = 5000
  ) => {
    setNotification(notificationObj);
    setTimeout(() => {
      setNotification(null);
    }, timeoutinMillis);
  };

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
          .then((updatedPerson) => {
            const copyArr = persons;
            const indexOfUpdatedUser = persons.findIndex(
              (person) => person.id === updatedPerson.id
            );
            copyArr[indexOfUpdatedUser] = updatedPerson;
            setPersons(copyArr);
            setNotificationWithTimeout({
              type: "success",
              message: `${updatedPerson.name} updated succesfully`,
            });
          })
          .catch((err) => {
            setNotificationWithTimeout({
              type: "error",
              message: `${newName} was removed from db, can't update deleted person!`,
            });
          });
      }
      return;
    }

    mainService
      .createNewContact({
        name: newName,
        number: newNumber,
      })
      .then((updatedPersonsList) => {
        setPersons(updatedPersonsList);
        setNotificationWithTimeout({
          type: "success",
          message: `${newName} added succesfully`,
        });
      });

    document.getElementById("myForm").reset();
  };

  const onDeletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      mainService
        .deleteContact(personToDelete.id)
        .then((deletedPerson) => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
          setNotificationWithTimeout({
            type: "success",
            message: `${personToDelete.name} deleted successfully!`,
          });
        })
        .catch((err) => {
          setNotification({
            type: "error",
            message: `${personToDelete.name} was already deleted from db`,
          });
        });
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
        <Notification notification={notification} />
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
