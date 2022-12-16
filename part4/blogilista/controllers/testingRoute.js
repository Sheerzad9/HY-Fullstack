const router = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  res.status(200).json({ message: "Reset success!" });
});

router.post("/createTestBlog", async (req, res) => {
  const blog = new Blog({
    title: "Test Blog",
    author: "John Doe",
    url: "www.testUrl.com",
  });
  const b = await blog.save();
  console.log(b);
  res.status(200).end();
});

module.exports = router;
