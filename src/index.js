"use strict";

const { readFileSync } = require("fs");
const { join } = require("path");
const { ApolloServer, gql } = require("apollo-server-lambda");

const resolvers = require("./resolvers");

const schema = readFileSync(
  join(__dirname, "schema", "schema.graphql"),
  "utf-8"
).toString();

const typeDefs = gql`
  ${schema}
`;

const server = new ApolloServer({ typeDefs, resolvers });
exports.handler = server.createHandler({
  cors: {
    origin: "*"
  }
});
