const request = require('postman-request')

const forecast = (longitude, latitude, location, callback) => {
    const url = 
    'http://api.weatherstack.com/current?access_key=296a116640ff9ebc700fae90a1e25a35&query='
     + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Can not find location', undefined)
        } else {
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions,
                icon: body.current.weather_icons,
                location,
                temperature: body.current.temperature,
                feels_like: body.current.feelslike,
                humidity: body.current.humidity,
            })
        }
    })
}

module.exports = forecast