'use strict'

const moment = require('moment')
const { GraphQLScalarType } = require('graphql')

const validateDate = value => {
  if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
    throw new Error(
      'You must send a date string based in the next format: YYYY-MM-DD'
    )
  }
}

const validateDateRange = value => {
  const values = value.split('-')
  if (
    values.length === 2 &&
    !moment(values[0], 'HH:mm', true).isValid() &&
    !moment(values[1], 'HH:mm', true).isValid()
  ) {
    throw new Error(
      'You must send a range date string based in the next format: HH:mm-HH:mm'
    )
  }
}

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date string based in the next format: YYYY-MM-DD.',
    serialize(value) {
      return value // value sent to the client
    },
    parseValue(value) {
      validateDate(value)

      return value // value from the client(from variables)
    },
    parseLiteral(ast) {
      validateDate(ast.value)

      return ast.value // value from the client(in line)
    }
  }),
  DateRange: new GraphQLScalarType({
    name: 'DateRange',
    description: 'Range date string based in the next format: HH:mm-HH:mm.',
    serialize(value) {
      return value // value sent to the client
    },
    parseValue(value) {
      validateDateRange(value)

      return value // value from the client(from variables)
    },
    parseLiteral(ast) {
      validateDateRange(ast.value)

      return ast.value // value from the client(in line)
    }
  })
}
