// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// const tagify = require('cypress-tags');
const cucumber = require("cypress-cucumber-preprocessor").default;
const mysql = require("mysql");
const testConfig = require("../../config.json");
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */

function queryDb(sql) {
  const connection = mysql.createConnection(testConfig.env.db);
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);

      connection.end();
      return resolve(results);
    });
  });
}

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("file:preprocessor", cucumber());
  // on('file:preprocessor', tagify(config));
  on("task", {
    queryDb: query => queryDb(query, config)
  });
};
