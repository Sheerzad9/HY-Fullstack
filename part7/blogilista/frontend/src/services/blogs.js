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

const getSingleBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createBlog = async (blogData) => {
  const res = await axios.post(baseUrl, blogData, {
    headers: { Authorization: token },
  });
  return res.data;
};

const updateBlogLikes = async ({ newLikes, blogId }) => {
  const res = await axios.put(
    `${baseUrl}/${blogId}`,
    { newLikes },
    {
      headers: { Authorization: token },
    }
  );

  return res.data;
};

const deleteBlog = async (blogId) => {
  const res = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: token },
  });

  return res.data;
};

export default {
  getAll,
  getSingleBlog,
  setToken,
  createBlog,
  updateBlogLikes,
  deleteBlog,
};
