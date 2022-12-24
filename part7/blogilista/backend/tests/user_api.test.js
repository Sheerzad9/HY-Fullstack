const app = require("../app");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

describe("When there is initially some users set", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("notSoSecretPass", 10);
    // Saving first testUser
    let initialUser = new User({
      username: "TestMania",
      name: "Test123",
      passwordHash,
    });
    await initialUser.save();
    // Saving second testUser
    initialUser = new User({
      username: "TestingIsFun",
      name: "Test Doe",
      passwordHash,
    });
    await initialUser.save();
  });

  test("Initial user are found in GET request", async () => {
    const users = await helper.usersInDb();

    expect(users).toHaveLength(2);
    expect(users[0].username).toBe("TestMania");
  });

  describe("Adding new users", () => {
    test("User with valid values gets added to db", async () => {
      const usersBeforeAdding = await helper.usersInDb();
      const newUserReq = {
        username: "Testing",
        name: "John Doe",
        password: "VerySecret",
      };

      const addedUser = await api
        .post("/api/users")
        .send(newUserReq)
        .expect(200);

      const usersAfterAdding = await helper.usersInDb();

      expect(usersAfterAdding).toHaveLength(usersBeforeAdding.length + 1);

      const usernames = usersAfterAdding.map(
        (user) => usersAfterAdding.username
      );
      expect(usernames).toContain(addedUser.username);
    });

    test("Duplicate username doesn't get added to db", () => {
      // Username that we use is already saved in db @BeforeEach, where we init the users collection
      const userReqWithDuplicateUsername = {
        username: "TestMania",
        password: "Secretoos",
      };
      api
        .post("/api/users")
        .send(userReqWithDuplicateUsername)
        .expect(400)
        .expect({ error: "Username must be unique" });
    });

    test("Too short password doesn't get added to db", () => {
      // Pasword should be over 3 chars
      const invalidReq = {
        username: "DiibaDaabaBuu",
        name: "Jhn Doe",
        password: "yk",
      };

      api
        .post("/api/users")
        .send(invalidReq)
        .expect(400)
        .expect({ error: "Password must be atleast 3 characters long" });
    });

    test("Too short username doesn't get added to db", () => {
      // Username should be over 3 chars
      const invalidReq = {
        username: "Di",
        name: "Jhn Doe",
        password: "sgijidfjgfg",
      };

      api
        .post("/api/users")
        .send(invalidReq)
        .expect(400)
        .expect({
          error:
            "User validation failed: username: Username is too short! Username should contain atleast 3 characters",
        });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
