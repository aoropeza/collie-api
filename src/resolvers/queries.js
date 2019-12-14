'use strict'

const util = require('util')

const { UsesCases } = require('collie-uses-cases')

const config = {
  uriConnection: {
    protocol: `mongodb+srv`,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST
  }
}

module.exports = {
  activeMovies: async (_, { date, timeOfDay, timeZone }) => {
    console.log('date: ', date)
    console.log('timeOfDay: ', timeOfDay)
    console.log('timeZone: ', timeZone)

    const usesCases = await UsesCases.buildStatic(config)
    const results = await usesCases.filterActiveMovies(
      date,
      timeOfDay,
      timeZone
    )

    console.log(util.inspect(results, false, null, true /* enable colors */))

    return results
  },
  infoSchedulesByMovie: async (
    _,
    { movieName, date, timeOfDay, timeZone, latitude, longitude }
  ) => {
    console.log('movie: ', movieName)
    console.log('date: ', date)
    console.log('timeOfDay: ', timeOfDay)
    console.log('timeZone: ', timeZone)
    console.log('latitude: ', latitude)
    console.log('longitude: ', longitude)

    const usesCases = await UsesCases.buildStatic(config)
    const results = await usesCases.filterLocationsByMovie(
      movieName,
      date,
      timeOfDay,
      timeZone,
      latitude,
      longitude
    )

    const resultRenamed = results.map(item => {
      return {
        ...item,
        schedules: item.schedules.map(itemLo => {
          return {
            ...itemLo,
            movie: itemLo.movieInfo
          }
        })
      }
    })

    return resultRenamed
  }
}
