const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();

    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
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
