describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.addUser({
      name: "Test User",
      username: "TestKong",
      password: "mySecretPassu",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("h2").contains("Please log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#login_username").type("TestKong");
      cy.get("#login_password").type("mySecretPassu");
      cy.get("#login_btn").click();

      cy.get(".loggedInUser")
        .should("contain", "Test User is logged in")
        .and("have.css", "color", "rgb(86, 248, 86)");
    });

    it("fails with wrong credentials", function () {
      cy.get("#login_username").type("TestKong");
      cy.get("#login_password").type("WrongPwd");
      cy.get("#login_btn").click();

      cy.get(".error")
        .should("contain", "Wrong username or password!")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border", "3px solid rgb(255, 0, 0)");
    });
    describe("When logged in", function () {
      beforeEach(function () {
        cy.login("TestKong", "mySecretPassu");
      });

      it("A blog can be created", function () {
        cy.addBlogWithUI({
          title: "Cypress is fun",
          author: "Passiivinen Pena",
          url: "www.passiivinen@suomi.fi",
        });

        cy.get(".success").should("contain", "Blog created successfully!");
        cy.contains("Cypress is fun");
      });

      describe("When logged in & blog exist's", function () {
        beforeEach(function () {
          cy.addBlogWithUI({
            title: "Cypress is fun",
            author: "Passiivinen Pena",
            url: "www.passiivinen@suomi.fi",
          });
        });

        it("A blog can be liked", function () {
          cy.contains("Show more").click();
          cy.contains("Likes: 0");
          cy.get("#like_blog_btn").as("likeBtn");
          cy.get("@likeBtn").click();
          cy.contains("Like's updated successfully!");
          cy.contains("Likes: 1");
        });

        it("Own blog's can be deleted successfully", function () {
          cy.contains("Show more").click();
          cy.contains("Delete").click();
          cy.reload();
        });

        it("Deleting another user's blog fails", function () {
          cy.addBlogWithDifferentUser();
          //cy.get(".blogs > .blog").eq(1).as("foreignBlog");
          cy.get(".blogs").children().should("have.length", 2);
          cy.get(".blogs").children().eq(1).as("foreignBlog");
          cy.get("@foreignBlog").contains("Show more").click();
          cy.get("@foreignBlog").contains("Delete").click();
          cy.get(".error").should(
            "contain",
            "You don't have authority to delete this blog, you can delete only your own blogs!"
          );
          cy.get(".blogs").children().should("have.length", 2);
        });

        it.only("Blog's are arranged with like amount", function () {
          cy.addBlogWithUI({
            title: "Blog with least likes",
            author: "Passiivinen Pena",
            url: "www.passiivinen@suomi.fi",
          });
          cy.addBlogWithUI({
            title: "Blog with most likes",
            author: "Passiivinen Pena",
            url: "www.passiivinen@suomi.fi",
          });

          cy.get(".blogs").children().eq(0).should("contain", "Cypress is fun");
          cy.get(".blogs")
            .children()
            .eq(1)
            .should("contain", "Blog with least likes");
          cy.get(".blogs")
            .children()
            .eq(2)
            .should("contain", "Blog with most likes");

          // Last one
          cy.get(".blogs").children().eq(2).as("blogWithMostLikes");
          cy.get("@blogWithMostLikes").contains("Show more").click();
          cy.get("@blogWithMostLikes").contains("Like").click();
          cy.wait(1000);
          // Now it has the most likes so it's first one under "blogs" class
          cy.get(".blogs").children().eq(0).as("blogWithMostLikes");
          cy.get("@blogWithMostLikes").contains("Like").click();
          cy.get("@blogWithMostLikes").contains("Show Less").click();

          cy.get(".blogs").children().eq(1).as("blogWithSecondMostLikes");
          cy.get("@blogWithSecondMostLikes").contains("Show more").click();
          cy.get("@blogWithSecondMostLikes").contains("Like").click();
          cy.get("@blogWithSecondMostLikes").contains("Show Less").click();

          cy.get(".blogs")
            .children()
            .eq(0)
            .should("contain", "Blog with most likes");
          cy.get(".blogs").children().eq(1).should("contain", "Cypress is fun");
          cy.get(".blogs")
            .children()
            .eq(2)
            .should("contain", "Blog with least likes");
        });
      });
    });
  });
});
