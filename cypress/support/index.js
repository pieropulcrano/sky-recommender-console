// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './utils'
import './commands'

//https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/blogs__dayjs
const dayjs = require('dayjs')
// https://day.js.org/docs/en/plugin/utc
const utc = require('dayjs/plugin/utc')
// https://day.js.org/docs/en/plugin/custom-parse-format
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(utc)
dayjs.extend(customParseFormat)

Cypress.dayjs = dayjs

// Alternatively you can use CommonJS syntax:
// require('./commands')
