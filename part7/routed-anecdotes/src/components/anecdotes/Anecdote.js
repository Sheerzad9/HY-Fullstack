const Anecdote = ({ anecdote }) => {
  console.log("Anecdote: ", anecdote);
  return (
    <div>
      <h2>{anecdote.content}</h2>
    </div>
  );
};

export default Anecdote;
