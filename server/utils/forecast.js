import request from "postman-request";

const forecast = (longitude, latitude, callback)  => {

    if (!process.env.WEATHER_API_KEY) return callback('Unable to connect to location services, API Misconfiguration.', undefined);

    const url =`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;
    console.log(`url = ${url}`);

    request({url, json: true}, (error, {body}) => {
        if(error) return callback('Unable to connect to weather service!', undefined);

        if(body.error) return callback('Unable to find weather for this location.', undefined);

        callback(undefined, {
            observation_time: body.current.observation_time,
            temperature: body.current.temperature,
            feelslike: body.current.feelslike,
            weather_descriptions: body.current.weather_descriptions,
            wind_speed: body.current.wind_speed,
            precip: body.current.precip,
            humidity: body.current.humidity,
            uv_index: body.current.uv_index,
            visibility: body.current.visibility
        })
    });
}

export default forecast;