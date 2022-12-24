import axios from "axios";

const baseUrl = "/api/users";

const getAllUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getOneUser = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default { getAllUsers, getOneUser };
