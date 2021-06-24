// Dev Dependencies
// Node packages
const fs = require('fs')
// Personal Files
const getGeocode = require('./utils/getGeocode')
const getWeather = require('./utils/getWeather')
// Program


const location = process.argv[2]
if (!location) {
    return console.log("Location not provided as command line argument")
}
getGeocode(location, (error, {latitude, longitude} = {}) => {
    if (error) {
        return console.log(error)
    }
    const address = {
        latitude,
        longitude
    }
    getWeather(address, (error, {temperature, feelsLike, precipitation, currentTime} = {}) => {
        if (error) {
            return console.log(error)
        }
        console.log('response: ', temperature, feelsLike, precipitation, currentTime)
    })
})

