import request from 'postman-request';

const forecast = (longitude, latitude, callback)  => {
    try {
        fetchWeather(longitude, latitude, (error, weatherData) => {
            if(error) {
                console.error('Error fetching weather data:', error);
                callback('Error fetching weather data', undefined);  
            }

            const parsedData = parseWeatherData(weatherData.current, weatherData.hourly);
            callback(undefined, parsedData);
        })   
    } catch (error) {
        console.error('Error parsing weather data:', error);
        callback('Error parsing weather data', undefined);    
    }
};

const fetchWeather = (longitude, latitude, callback) => {
    const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;
    const currentUrlQuery = `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;
    const hourlyUrlQuery = `&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m`;
    const miscURLQuery = `&wind_speed_unit=mph&timezone=auto&forecast_days=1&forecast_hours=24`;

    const url = baseUrl + currentUrlQuery + hourlyUrlQuery + miscURLQuery;
    console.log(`url = ${url}`);

    request({url, json: true}, (error, {body}) => {
        if(error) return callback('Unable to connect to weather service!', undefined);
        if(body.error) return callback('Unable to find weather for this location.', undefined);

        callback(undefined, body);
    });

};

const parseWeatherData = (currentWeatherData, forecastWeatherData) => {
    return {
        current: {
            temperature: currentWeatherData.temperature_2m,
            feelslike: currentWeatherData.apparent_temperature,
            weatherCode: currentWeatherData.weather_code,
            precipitationAmount: currentWeatherData.precipitation,
            humidity: currentWeatherData.relative_humidity_2m,
            windSpeed: currentWeatherData.wind_speed_10m
        },
        forecast: {
            hours: forecastWeatherData.time,
            temperature: forecastWeatherData.temperature_2m,
            feelslike: forecastWeatherData.apparent_temperature,
            weatherCode: forecastWeatherData.weather_code,
            precipitationChance: forecastWeatherData.precipitation_probability,
            humidity: forecastWeatherData.relative_humidity_2m,
            windSpeed: forecastWeatherData.wind_speed_10m
        }
    }
};

export default forecast;