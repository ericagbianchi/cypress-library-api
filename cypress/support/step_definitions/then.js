import { Then } from "cypress-cucumber-preprocessor/steps";

const bookInfo = require("../pages/book-info");

Then("response status for {string} is {string}", (field, value) => {
  const resp = Cypress.config("response");
  bookInfo.checkResponse(resp, field, status);
});

Then("the following {string} are returned", (field, table) => {
  const resp = Cypress.config("response");
    const arrName = [];
    const arrLanguage = [];
    const arrEndTimeLT = []
    for (const {
      name,
      language
    } of table.hashes()) {
      arrName.push(name);
      arrLanguage.push(language);
    }
    bookInfo.checkValues(
      resp,
      arrName,
      arrLanguage
    );
  }
);
