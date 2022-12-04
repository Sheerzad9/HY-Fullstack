const blogsRouter = require("express").Router();
const { json } = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: true,
    name: true,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  try {
    //const token = getTokenFrom(request);
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    //const user = await User.findById(decodedToken.id);
    const user = request.user;
    if (!user) {
      return response.status(400).json({ error: "Given user not found in db" });
    }

    const blog = new Blog({ title, author, url, likes, user: user._id });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET);
    const user = req.user;
    if (!user) {
      return res.status(400).json({ error: "Token is invalid, or missing" });
    }

    const blog = await Blog.findById(id);
    if (!blog.user || !(blog.user?.toString() === decodedToken.id)) {
      return res.status(401).json({
        error:
          "You don't have authority to delete this blog, you can delete only your own blogs!",
      });
    }
    await blog.delete();
    user.blogs = user.blogs.filter(
      (currBlogId) => currBlogId.toString() !== blog.id
    );
    await user.save();
    return res
      .status(200)
      .json({ message: "Blog deleted successfully." })
      .end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);
    blog ? res.status(200).json(blog) : res.status(404).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      likes: req.body.newLikes,
    },
    { new: true }
  );
  if (!updatedBlog) {
    res.status(404).end();
    return;
  }
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
