// Dev Dependencies
// Node packages
const fs = require('fs')
// Personal Files
const geocode = require('./Utils/getGeocode')
const getWeather = require('./Utils/getWeather')
// Program



geocode('Boston', (error, response)=>{
    const lat = response.latitude
    const long = response.longitude
    const address = lat+','+long
    getWeather(address, (error, response)=> {
        console.log('error: ', error)
        console.log('response: ', response)
    })
})