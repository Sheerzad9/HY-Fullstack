import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import noteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onAddNewAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    //const newAnecdote = await noteService.addAnecdote(content);
    dispatch(newAnecdote(content));
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

export default AnecdoteForm;
