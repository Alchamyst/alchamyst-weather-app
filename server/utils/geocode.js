// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const request = require('postman-request');

import request from "postman-request";

const geocode = (address, callback) => {

    if (!process.env.GEOCODE_API_KEY) return callback('Unable to connect to location services, API Misconfiguration.', undefined);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=ip&access_token=${process.env.GEOCODE_API_KEY}`;

    console.log(url);

    request({url, json: true}, (error, {body}) => {
        if(error) return callback('Unable to connect to location service!', undefined);

        if(body.features.length === 0) return callback('Unable to find location. Try another search.', undefined);

        callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
        })
    });
}

export default geocode;