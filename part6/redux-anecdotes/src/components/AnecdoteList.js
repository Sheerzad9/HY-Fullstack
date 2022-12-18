import { useSelector, useDispatch } from "react-redux";
import { actionFuncs } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={handleVote}>vote</button>
      </div>
      <hr />
    </>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state).sort((a, b) => {
    if (a.votes === b.votes) return 0;
    return a.votes > b.votes ? -1 : 1;
  });

  return (
    <>
      <h2>Anecdotes</h2>
      <div>
        {anecdotes.map((anecdote) => {
          return (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleVote={() => dispatch(actionFuncs.updateVotes(anecdote.id))}
            />
          );
        })}
      </div>
    </>
  );
};

export default AnecdoteList;
