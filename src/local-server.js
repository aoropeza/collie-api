'use strict'

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config()

const { readFileSync } = require('fs')
const { join } = require('path')

// eslint-disable-next-line import/no-extraneous-dependencies
const { ApolloServer, gql } = require('apollo-server')

const resolvers = require('./resolvers')

const schema = readFileSync(
  join(__dirname, 'schema', 'schema.graphql'),
  'utf-8'
).toString()

const typeDefs = gql`
  ${schema}
`

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
