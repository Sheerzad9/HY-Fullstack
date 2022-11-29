const Blog = require("../models/blog");

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

module.exports = { initialBlogList, nonExistingId };
