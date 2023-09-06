import request from "postman-request";

const geocode = (address, callback) => {
    if (!address) {
        callback('Provide address to find the geocode data', undefined)
        return
    }
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=ip&access_token=pk.eyJ1IjoibmF2LWtyaXNobmEiLCJhIjoiY2xtMHpjODA4M2Q0ejNjcHY2YzFhcWxzcSJ9.F5_ok8Dmy66y1XFU-xRaNQ&limit=1`
    request({url: geocodeUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
            return
        } else if (response.body.features.length === 0) {
            callback('Unable to find location!', undefined)
            return
        }
        let feature = response.body.features[0];
        // console.log(feature)
        const coordinates = feature.center
        const longitude = coordinates[0]
        const latitude = coordinates[1]
        callback(undefined, {latitude: latitude, longitude: longitude, name: feature.place_name})
    })
}

export default {geocode}