'use strict'

const queries = require('./queries.js')
const types = require('./types')

module.exports = {
  Query: queries,
  ...types
}
