const dates = require("../utils/dates");
const strings = require("../utils/strings");
const projectConfig = require("../../../config.json");

function fillField($field, $value) {
  let parameters;
  const book = Cypress.config("bookId");
  const $name = null;
  let $timezone = null;

  const url = `${projectConfig.url}/1/books/${book}`;
  const path = "/";

  if ($field === "name" && $value === "random") {
    $name = strings.randomString(3);
  }
  else {
	 $name = $value;
  }
  
  Cypress.config("name", $name)

    parameters =  {
        name: Cypress.config("name")
  }

  cy.request("PUT", url.concat(path), parameters).then(resp => {
    if (resp.status === 202) return true;
  });
}

function checkResponse($resp, $field, $value) {
  cy.expect($resp.body.validations[num].status).to.eql($value);
}


module.exports = {
  fillField,
  checkResponse
};
