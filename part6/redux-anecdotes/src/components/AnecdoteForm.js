import { connect } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const onAddNewAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    //const newAnecdote = await noteService.addAnecdote(content);
    props.newAnecdote(content);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onAddNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default connect(null, { newAnecdote })(AnecdoteForm);

//export default AnecdoteForm;
