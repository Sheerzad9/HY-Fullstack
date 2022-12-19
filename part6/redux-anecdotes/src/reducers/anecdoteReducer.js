import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateVotes(state, action) {
      const anecdoteData = action.payload;
      const indexToUpdate = state
        .map((anecdote) => anecdote.id)
        .indexOf(anecdoteData.id);
      // We can change state right here because reduxjs/toolkit uses immer.js behind the scenes
      state[indexToUpdate] = anecdoteData;
    },
    addNewAnecdote(state, action) {
      // Same here! we can update state because immer.js
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateVotes, addNewAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async function (dispatch) {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdote = (content) => {
  return async function (dispatch) {
    const newAnecdote = await anecdoteService.addAnecdote(content);
    dispatch(addNewAnecdote(newAnecdote));
  };
};

export const updateAnecdoteVote = (anecdoteData) => {
  return async function (dispatch) {
    console.log("inside reducer anecdoteData: ", anecdoteData);
    const updatedAnecdote = await anecdoteService.updateAnecdoteVote(
      anecdoteData
    );
    dispatch(updateVotes(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
