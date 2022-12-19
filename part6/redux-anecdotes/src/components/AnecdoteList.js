import { useSelector, useDispatch } from "react-redux";
import { updateVotes } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={() => handleVote()}>vote</button>
      </div>
      <hr />
    </>
  );
};

const AnecdoteList = () => {
  let myFilter;
  const dispatch = useDispatch();
  let anecdotes = useSelector(({ anecdotes, filter }) => {
    myFilter = filter;
    return anecdotes.concat();
  }).sort((a, b) => {
    if (a.votes === b.votes) return 0;
    return a.votes > b.votes ? -1 : 1;
  });

  if (myFilter) {
    anecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(myFilter)
    );
  }

  const handleVote = (anecdote) => {
    dispatch(updateVotes(anecdote.id));
    dispatch(setNotification({ message: `you voted '${anecdote.content}'` }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <div>
        {anecdotes.map((anecdote) => {
          return (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleVote={() => handleVote(anecdote)}
            />
          );
        })}
      </div>
    </>
  );
};

export default AnecdoteList;
