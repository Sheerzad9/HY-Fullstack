import { useSelector, useDispatch, connect } from "react-redux";
import { updateAnecdoteVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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

const AnecdoteList = (props) => {
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
    console.log("props inside dunc: ", props);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(updateAnecdoteVote(updatedAnecdote));
    if (props.activeNotification) clearTimeout(props.activeNotification);
    dispatch(
      setNotification({ message: `you voted '${anecdote.content}'` }, 5)
    );
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

const mapStateToProps = (state) => {
  return {
    activeNotification: state.notification.activeNotification,
  };
};

export default connect(mapStateToProps)(AnecdoteList);
