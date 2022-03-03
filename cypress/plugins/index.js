/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// cypress/plugins/index.js
module.exports = (on, config) => {
  // modify env value
  config.env = process.env;
  config.env.baseUrl = process.env.REACT_APP_BASE_URL;
  config.env.recommendationsUrl = process.env.REACT_APP_API_RECOMMENDATIONS_URL;
  config.env.recommendationUrl = process.env.REACT_APP_API_RECOMMENDATION_URL;
  config.env.eventUrl = process.env.REACT_APP_API_EVENT_URL;
  config.env.loginUrl = process.env.REACT_APP_API_LOGIN_URL;
  config.env.fallbackRecommendationUrl =
    process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL;

  // return config
  return config;
};
