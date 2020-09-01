const request = require("request");
const baseGeoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const geoToken = "pk.eyJ1IjoiYWthZ2h6aSIsImEiOiJja2Vha3kxOTgwMWw0MzVxaW5leWx3dXpvIn0.ScBqfC-D-c5SRziIQ-Cw2g";

const getlonglat = (city, callback) => {
    const geoUrl = baseGeoUrl + encodeURIComponent(city) + '.json?access_token=' + geoToken;

    request({
            url: geoUrl,
            json: true
        },
        (error, {body}) => {
            if (error) {
                callback("Can not connect to geocoding service")
            } else if (body.features.length === 0) {
                callback('Can not find the location')
            } else {
                let data = {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                }
                callback(undefined, data)
            }
        });
}
module.exports = getlonglat