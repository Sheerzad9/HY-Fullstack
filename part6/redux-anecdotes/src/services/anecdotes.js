import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateAnecdoteVote = async (anecdoteData) => {
  // anecdoteData should have fields "content", "votes"
  const response = await axios.put(
    `${baseUrl}/${anecdoteData.id}`,
    anecdoteData
  );
  return response.data;
};

export default { getAll, addAnecdote, updateAnecdoteVote };
