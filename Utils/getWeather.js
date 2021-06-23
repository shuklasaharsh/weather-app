const CONSTANTS = require('../Data/CONSTANTS')
const requests = require('postman-request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const weatherConstants = CONSTANTS.weatherConstants

const getWeatherData = (address, callback) => {
    const url = weatherConstants.baseurl + weatherConstants.api + '&query=' + encodeURIComponent(address) + '&units=m'
    console.log(url)
    requests({url: url, json: true}, (error, response)=> {
        try {
            const data = {
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
                precipitation: response.body.current.precip,
                currentTime: response.body.current.observation_time
            }
            callback(undefined, data)
        } catch (e) {
            let e2 = e.toString()
            if (error) {
                callback(error, undefined)
            } else if (response.error) {
                e2 = response.error
                callback(e2, undefined)
            }
        }
    })
}

module.exports = getWeatherData