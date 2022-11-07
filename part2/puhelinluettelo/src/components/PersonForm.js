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

export default PersonForm;
