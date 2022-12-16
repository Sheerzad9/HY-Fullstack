// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then((res) => {
    window.localStorage.setItem("loggedInUser", JSON.stringify(res.body));
    cy.reload();
  });
});

// add User to DB
Cypress.Commands.add("addUser", ({ name, username, password }) => {
  cy.request("POST", "http://localhost:3001/api/users", {
    name,
    username,
    password,
  });
});

Cypress.Commands.add("addBlogWithUI", ({ title, author, url }) => {
  cy.contains("Create new blog").click();
  cy.get("#blog_title").type(title);
  cy.get("#blog_author").type(author);
  cy.get("#blog_url").type(url);
  cy.get("#submit_blog_btn").click();
});

Cypress.Commands.add("addBlogWithDifferentUser", () => {
  cy.request("POST", "http://localhost:3001/api/testing/createTestBlog");
  cy.reload();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
