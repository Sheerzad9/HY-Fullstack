const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogList = [
  {
    title: "How to not score goals",
    author: "Romelu Lukaku",
    url: "www.diudiu.com",
    likes: 2,
  },
  {
    title: "How to write good test",
    author: "John Doe",
    url: "www.pimpelipompeli.fi",
    likes: 5,
  },
];

const nonExistingId = async () => {
  const tempBlog = {
    title: "Temp",
    author: "Temp",
    url: "Temp",
  };

  const blog = new Blog(tempBlog);
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialBlogList, nonExistingId, blogsInDb, usersInDb };
