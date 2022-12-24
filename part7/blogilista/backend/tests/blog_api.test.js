const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

describe("When there is initially some blogs set", () => {
  let token = "";
  beforeEach(async () => {
    // Let's initialize one user to db, so we can login and get the token.
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("notSoSecretPass", 10);
    // Saving first testUser
    let initialUser = new User({
      username: "TestMania",
      name: "Test123",
      passwordHash,
    });
    intitialUser = await initialUser.save();
    // Let's get the token
    res = await api
      .post("/api/login")
      .send({ username: initialUser.username, password: "notSoSecretPass" }); // password is same we used @ line-16

    token = res.body.token;

    await Blog.deleteMany({});
    const promiseList = helper.initialBlogList.map((blog, index) => {
      // Keeping first blog without user id for test purposes
      if (index !== 0) blog.user = initialUser._id.toString();
      return new Blog(blog).save();
    });
    await Promise.all(promiseList);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogList.length);
  });

  test("Returned blogs should have field named 'id'", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;

    expect(blogs[0].id).toBeDefined();
  });

  describe("Adding blog", () => {
    test("Blog saved without fields 'title' & 'url', should be denied", async () => {
      const badBlogData = {
        author: "Joel Embiid",
        url: "www.test.fi",
        likes: 2,
      };
      await api
        .post("/api/blogs")
        .set({ Authorization: `bearer ${token}` })
        .send(badBlogData)
        .expect(400)
        .expect({
          error: "Blog validation failed: title: Path `title` is required.",
        });

      const blogs = await Blog.find({});
      expect(blogs.length).toBe(helper.initialBlogList.length);
    });

    test("Likes are set to 0 by default (if likes are not given)", async () => {
      const blogWithoutLike = {
        title: "This is blog without likes defined :-)",
        author: "Joel Embiid",
        url: "www.test.fi",
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: `bearer ${token}` })
        .send(blogWithoutLike)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await Blog.find({});
      const blogSentWithoutLike = blogs[blogs.length - 1];

      expect(blogSentWithoutLike.likes).toBeDefined();
      expect(blogSentWithoutLike.likes).toBe(0);
    });

    test("A valid blog can be added ", async () => {
      const blogToAdd = {
        title: "Test blog ",
        author: "Test Mania",
        url: "www.pingispallo.fi",
        likes: 0,
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: `bearer ${token}` })
        .send(blogToAdd)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await Blog.find({});
      expect(blogs.length).toBe(helper.initialBlogList.length + 1);

      const blogAuthors = blogs.map((blog) => blog.author);
      expect(blogAuthors).toContain("Test Mania");
    });
  });

  describe("Viewing specific blog", () => {
    test("Succeed's with valid id", async () => {
      const blogs = await Blog.find({});

      const blog = blogs[0];

      const res = await api
        .get(`/api/blogs/${blog.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const processedBlogToView = JSON.parse(JSON.stringify(blog));

      expect(res.body).toEqual(processedBlogToView);
    });

    test("Fails with status 404, no blogs is found with given id", async () => {
      const idWithNoBlogs = await helper.nonExistingId();

      api.get(`/api/blogs/${idWithNoBlogs}`).expect(404);
    });
    test("Fails with statuscode 400 id is invalid", async () => {
      const invalidId = "thisIsInvalid";

      api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
        .expect({ error: "malformatted id" });
    });
  });

  describe("deletion of a blog", () => {
    test("Deleting return 401 if user is not the blogs writer", async () => {
      const blogs = await Blog.find({});
      const blogWithDifferentIDThanUsers = blogs[0];

      await api
        .delete(`/api/blogs/${blogWithDifferentIDThanUsers.id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(401)
        .expect({
          error:
            "You don't have authority to delete this blog, you can delete only your own blogs!",
        });
    });

    test("succeeds with status code 200 if id & user token is valid (same user as blogs creator)", async () => {
      const blogsAtStart = await Blog.find({});
      const blogToDelete = blogsAtStart[1];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(200)
        .expect({ message: "Blog deleted successfully." });

      const blogsAtEnd = await Blog.find({});

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const authors = blogsAtEnd.map((blog) => blog.author);

      expect(authors).not.toContain(blogToDelete.author);
    });
  });

  describe("Updating an existing blog", () => {
    test("Updating blog with valid id", async () => {
      const blogs = await Blog.find({});
      // Chosen blog likes are initially set to 2;
      const blogToUpdate = blogs[0];

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ newLikes: 15 })
        .expect(200);

      expect(updatedBlog.body.likes).toBe(15);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
