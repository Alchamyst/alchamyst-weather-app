import request from 'postman-request';

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
    const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;
    const currentUrlQuery = `&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;
    const hourlyUrlQuery = `&hourly=temperature_2m,precipitation_probability,weather_code&wind_speed_unit=mph`;
    const miscURLQuery = `&timezone=auto&forecast_days=1`;

    const url = baseUrl + currentUrlQuery + hourlyUrlQuery + miscURLQuery;
    console.log(`url = ${url}`);

    request({url, json: true}, (error, {body}) => {
        if(error) return callback('Unable to connect to weather service!', undefined);

        if(body.error) console.log(body.reason); // Temporary so we can see the API error messages.
        if(body.error) return callback('Unable to find weather for this location.', undefined);

        callback(undefined, {
            observation_time: body.current.time,
            temperature: body.current.temperature_2m,
            feelslike: body.current.apparent_temperature,
            precip: body.current.precipitation,
            weather_code: body.current.weather_code,
            wind_speed: body.current.wind_speed_10m,


            hourly_times: body.hourly.time,
            hourly_temps: body.hourly.temperature_2m,
            hourly_precip_probability: body.hourly.precipitation_probability,
            hourly_weather_code: body.hourly.weather_code
        })
    });
}

// Work out which data needs remoing
// splice the array

const trimHourlyData = (hourlyData, trimAmount) => {
    const trimmedData = hourlyData.filter((item, index) => index >= trimAmount);
    return trimmedData;
}


export default forecast;