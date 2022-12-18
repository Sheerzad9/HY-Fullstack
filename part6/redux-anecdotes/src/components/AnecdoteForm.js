import { useDispatch } from "react-redux";
import { actionFuncs } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onAddNewAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(actionFuncs.createNewAnecdote(content));
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
