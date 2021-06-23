const requests = require('postman-request')
const CONSTANTS = require('../Data/CONSTANTS')
const geoCodeConstants = CONSTANTS.geoCodeConstants

const geocode = (address, callback) => {
    const url = geoCodeConstants.baseurl + encodeURIComponent(address) + '.json?' + geoCodeConstants.api + '&limit1'
    console.log(url)
    requests({url: url, json: true}, (error, response) => {
        try {
            const location = {
                coordinates: response.body.features[0].center,
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            }
            callback(undefined, location)
        } catch (e) {
            let e2 = e.toString()
            if (error) {
                e2 = 'OS Error: ' + error
                callback(e2, undefined)
            } else if (response.body.message) {
                callback(response.body.message, undefined)
            } else if (response.body.features) {
                e2 = "Invalid Query Error"
                callback(e2, undefined)
            }
        }
    })
}


module.exports = geocode