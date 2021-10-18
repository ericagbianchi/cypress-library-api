import { When } from "cypress-cucumber-preprocessor/steps";

const projectConfig = require("../../../config.json");

let url;
let bookConfig;

When(
  "user requests book by {string} {string}",
  async (type, value) => {
    let body;
    
    url = `${projectConfig.url}/1/book/${Cypress.config("id")}/update`;
    cy.request("POST", url).then(resp => {
      Cypress.config("response", resp);
    });

    if (value === "random") {
      if (field === "name") {
        bookConfig = `"name": "${Cypress.config("name")}"`;
      } else if (field === "id") {
        bookConfig = `"id": ${Cypress.config("id")}`;
      } else if (field === "language") {
        bookConfig = `"language": "${Cypress.config("language")}"`;
      } 
    } else {
      if (field === "name") {
        bookConfig = `"name": "${name}"`;
      } else if (field === "id") {
        bookConfig = `"id": "${Cypress.config("id")}"`;
      } 
    }
    

    body = {
      parameters: {
        book: {
          id: Cypress.config("id")
        },
      }
    };
  
    body = JSON.parse(body);
  

    url = `${projectConfig.url}/1/book`;
    cy.request("GET", url, body).then(resp => {
      Cypress.config("response", resp);
    });
  }
);
