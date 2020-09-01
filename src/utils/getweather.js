const request = require("request");
const weatherToken = "e7d3f382b4ccab47082af45d2e0e442a";
const getweather = (latitude, longitude, units, callback) => {
    let url = 'http://api.weatherstack.com/current?' +
        'access_key=' + weatherToken +
        '&query=' + latitude + ',' + longitude +
        '&units=' + units;
    // console.log(url);

    request({
            url: url,
            json: true
        },
        (error, {body}) => {
            if (error) {
                callback(error, undefined)
                console.error('Can not connect to weather service')
                // console.error(body)
            } else if (body.success === false) {
                callback(error, undefined)
                console.error('Can not locate the geo location')
            } else {
                // console.log('temperature: ' + body.current.temperature);
                // console.log(' feels like: ' + body.current.temperature);
                callback(error, body)
            }
        });
}
module.exports = getweather