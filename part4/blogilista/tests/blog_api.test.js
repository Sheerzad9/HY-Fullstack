const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const promiseList = helper.initialBlogList.map((blog) =>
    new Blog(blog).save()
  );
  await Promise.all(promiseList);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogList.length);
});

test("Returned blogs should have field named 'id'", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  expect(blogs[0].id).toBeDefined();
});

test("Blog sent without fields 'title' & 'url', should be denied", async () => {
  const badBlogData = {
    author: "Joel Embiid",
    url: "www.test.fi",
    likes: 2,
  };

  await api.post("/api/blogs").send(badBlogData).expect(400).expect({
    error: "Blog validation failed: title: Path `title` is required.",
  });

  const blogs = await Blog.find({});
  expect(blogs.length).toBe(helper.initialBlogList.length);
});

test("A valid note can be added ", async () => {
  const blogToAdd = {
    title: "Test blog ",
    author: "Test Mania",
    url: "www.pingispallo.fi",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(blogToAdd)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await Blog.find({});
  expect(blogs.length).toBe(helper.initialBlogList.length + 1);

  const blogAuthors = blogs.map((blog) => blog.author);
  expect(blogAuthors).toContain("Test Mania");
});

test("Likes are set to 0 by default (if likes are not given)", async () => {
  const blogWithoutLike = {
    title: "This is blog without likes defined :-)",
    author: "Joel Embiid",
    url: "www.test.fi",
  };

  await api
    .post("/api/blogs")
    .send(blogWithoutLike)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await Blog.find({});
  const blogSentWithoutLike = blogs[blogs.length - 1];

  expect(blogSentWithoutLike.likes).toBeDefined();
  expect(blogSentWithoutLike.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
