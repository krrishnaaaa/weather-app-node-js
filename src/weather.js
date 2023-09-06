import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

function displayWeatherDetails(address, callback) {
    console.log('Trying to get location details...')
    geocode.geocode(address, (error, {latitude, longitude, name} = {}) => {
        if (error) {
            return callback(error, undefined)
        }
        console.log(`Getting weather forecast for ${name}`)
        forecast.getWeatherInfo({latitude, longitude}, (error, data) => {
            if (error) {
                return callback(error, undefined)
            }
            const temperature = data.temperature
            const precipitation = data.precip

            const location = `Weather update for  ${data.location.name}, ${data.location.region}, ${data.location.country}`
            const forecast = `${data.weatherDesc}. It is currently ${temperature} degrees out, but it feels like ${data.feelslike} degrees. There is a ${precipitation}% change of rain.`
            const icon = data.icon
            // console.log(data)

            return callback(undefined, {location, forecast, icon})
        })
    })
}

export default {displayWeatherDetails}