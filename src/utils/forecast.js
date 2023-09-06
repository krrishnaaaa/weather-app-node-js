import request from "postman-request";

const getWeatherInfo = (data, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=388e764999a15e027d9ebc0539c6bbca&units=m&query=${data.latitude},${data.longitude}`

    request({url: weatherUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
            return
        } else if (response.body.error) {
            callback('Unable to get weather!', undefined)
            return
        }
        // console.log(response.body.current)
        const {temperature, precip, feelslike} = response.body.current
        const weatherDesc = response.body.current.weather_descriptions
        const {name, region, country} = response.body.location
        callback(undefined, {temperature, precip, weatherDesc, feelslike, location: {name, region, country}})
    })
}

export default {getWeatherInfo}