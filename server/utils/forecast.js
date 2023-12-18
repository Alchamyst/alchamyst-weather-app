import request from 'postman-request';
import weatherCodes from './weather-codes.json' assert { type: "json"};

// const forecast = (longitude, latitude, callback)  => {

//     if (!process.env.WEATHER_API_KEY) return callback('Unable to connect to location services, API Misconfiguration.', undefined);

//     const url =`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;
//     console.log(`url = ${url}`);

//     request({url, json: true}, (error, {body}) => {
//         if(error) return callback('Unable to connect to weather service!', undefined);

//         if(body.error) return callback('Unable to find weather for this location.', undefined);

//         callback(undefined, {
//             observation_time: body.current.observation_time,
//             temperature: body.current.temperature,
//             feelslike: body.current.feelslike,
//             weather_descriptions: body.current.weather_descriptions,
//             wind_speed: body.current.wind_speed,
//             precip: body.current.precip,
//             humidity: body.current.humidity,
//             uv_index: body.current.uv_index,
//             visibility: body.current.visibility
//         })
//     });
// }

const forecast = (longitude, latitude, callback)  => {

    // if (!process.env.WEATHER_API_KEY) return callback('Unable to connect to location services, API Misconfiguration.', undefined);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&wind_speed_unit=mph&timezone=auto`;
    console.log(`url = ${url}`);

    request({url, json: true}, (error, {body}) => {
        if(error) return callback('Unable to connect to weather service!', undefined);

        if(body.error) console.log(body.reason); // Temporary so we can see the API error messages.
        if(body.error) return callback('Unable to find weather for this location.', undefined);

        callback(undefined, {
            observation_time: body.current.time,
            temperature: body.current.temperature_2m,
            feelslike: body.current.apparent_temperature,
            weather_description: readWeatherCode(body.current.weather_code),
            // wind_speed: body.current.wind_speed,
            // precip: body.current.precip,
            // humidity: body.current.humidity,
            // uv_index: body.current.uv_index,
            // visibility: body.current.visibility
        })
    });
}

const readWeatherCode = (weather_code) => {
    const description = weatherCodes[weather_code];
    return description;
}

export default forecast;