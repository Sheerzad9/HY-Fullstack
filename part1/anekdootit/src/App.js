import { useEffect, useState } from "react";

const Anecdote = ({ quote, votes }) => {
  return (
    <div>
      <p>{`${quote} ${votes} votes`}</p>
    </div>
  );
};

function App() {
  const initialAnecdotes = [
    { quote: "If it hurts, do it more often.", votes: 0 },
    {
      quote: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      quote:
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      quote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    { quote: "Premature optimization is the root of all evil.", votes: 0 },
    {
      quote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      quote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
      votes: 0,
    },
  ];
  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [anecdoteWithMostVote, setAnecdoteWithMostVotes] = useState();
  const [selected, setSelected] = useState(getRandomInt(7));

  useEffect(() => {
    console.log(anecdotes);
    let max = 0;
    let i = 0;
    anecdotes.forEach((anecdote, index) => {
      if (anecdote.votes > max) {
        max = anecdote.votes;
        i = index;
      }
    });
    if (max !== 0) {
      setAnecdoteWithMostVotes(anecdotes[i]);
    }
  });

  const onVote = () => {
    console.log(anecdotes);
    const copyAnecs = [...anecdotes];
    copyAnecs[selected].votes++;
    setAnecdotes(copyAnecs);
  };

  if (!anecdoteWithMostVote) {
    return (
      <div>
        <h2>Anecdotes of the day</h2>
        <Anecdote
          quote={anecdotes[selected].quote}
          votes={anecdotes[selected].votes}
        />
        <button onClick={onVote}>Vote</button>
        <button onClick={() => setSelected(getRandomInt(7))}>
          Next Anecdote
        </button>
        <h2>No Anecdotes with most votes yet, vote please</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Anecdotes of the day</h2>
      <Anecdote
        quote={anecdotes[selected].quote}
        votes={anecdotes[selected].votes}
      />
      <button onClick={onVote}>Vote</button>
      <button onClick={() => setSelected(getRandomInt(7))}>
        Next Anecdote
      </button>
      <h2>Anecdote with most vote</h2>
      <Anecdote
        quote={anecdoteWithMostVote.quote}
        votes={anecdoteWithMostVote.votes}
      />
    </div>
  );
}

export default App;
