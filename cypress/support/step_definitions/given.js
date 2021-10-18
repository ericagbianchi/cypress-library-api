import { Given } from "cypress-cucumber-preprocessor/steps";

const bookInfo = require("../pages/book-info");
const projectConfig = require("../../../config.json");

Given("the book is {string}", async name => {
  if (name === "random") {
    const bookName = [
      "Book 1",
      "Book 2",
      "Book 3",
      "Book 4",
      "Book 5",
      "Book 6",
      "Book 7",
      "Book 8",
      "Book 9"
    ]; // books names
    name = bookName[Math.floor(Math.random() * bookName.length)]; // random book
  }

  cy.request(
    `${projectConfig.url}/1/books/?name=${name}`
  ).then(resp => {
    Cypress.config("id", resp.body.books[0].id);
    Cypress.config("name", resp.body.books[0].name);
	Cypress.config("language", resp.body.books[0].language);
  });
});

Given(
  "on Library System, the book's field {string} has {string} as value",
  async (field, value) => {
    bookInfo.fillField(field, value);
  }
);

Given(
  "on Library System, the book {string} has the following data",
  async (name, table) => {
    cy.request(
      `${projectConfig.url}/1/books/?bookFilter=${name}`
    ).then(resp => {
      Cypress.config("id", resp.body.books[0].id);
      Cypress.config("name", resp.body.books[0].name);
      Cypress.config("language", resp.body.books[0].language);

        const arrName = [];
        const arrLanguage = [];

        for (const {
          name,
          language
        } of table.hashes()) {
          arrName.push(name);
          arrLanguage.push(language);
        }
        bookInfo.fillField(
          arrName,
          arrLanguage,
          Cypress.config("id")
        );
      }); 
  }
);
