import axios from "axios";

const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (blogData) => {
  const res = await axios.post(baseUrl, blogData, {
    headers: { Authorization: token },
  });
  return res.data;
};
export default { getAll, setToken, createBlog };
