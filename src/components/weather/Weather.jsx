import { useState } from 'react';
import moment from 'moment';
import './weather.css';
import weatherCodes from './weather-codes.json';


export default function Project(props) {
    const [locationInput, setLocationInput] = useState("");
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyWeather, setHourlyWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined);

    const fetchCurrentWeather = (locationQuery) => {
        const searchUrl = `/api/weather?address=${locationQuery}`;

        return fetch(searchUrl)
            .then((response) => response.json())
            .then((weatherData) => parseWeather(weatherData));
    }

    const parseWeather = (weatherData) => {
        console.log(weatherData);

        if (weatherData.error) { return handleError(weatherData.error) }

        setErrorMessage (undefined);
        setCurrentWeather({
            location: weatherData.location,
            observationTime: moment(weatherData.forecastData.observation_time).format('h:mm a'),
            feelsLike: weatherData.forecastData.feelslike, 
            precip: weatherData.forecastData.precip,
            temperature: weatherData.forecastData.temperature,
            windSpeed: weatherData.forecastData.wind_speed,
            description: readWeatherCode(weatherData.forecastData.weather_code), //this description will be used as the alt text for icon.
        });
        setHourlyWeather({
           times: weatherData.forecastData.hourly_times.map((time) => moment(time).format('h:mm a')),
           temps: weatherData.forecastData.hourly_temps,
           precipProbability: weatherData.forecastData.hourly_precip_probability,
           wCode : weatherData.forecastData.hourly_weather_code 
        })
    }

    const readWeatherCode = (weather_code) => {
        const description = weatherCodes[weather_code];
        return description;
    }

    const handleError = (error) => {
        setCurrentWeather({});
        return setErrorMessage (error);
    }

    return (
        <>
            <p>Enter a city name, address or post/zip code below to get the weather.</p>
            <div className='weather-search'>
                <input className='input-location'  type='text' name='location' id='location' placeholder='Enter Search Location' value={locationInput} onChange={ (e) => setLocationInput(e.target.value)} onKeyDown={(event) => {if(event.key === "Enter") fetchCurrentWeather(locationInput)}}/>
                <button className='btn-search bg-secondary text-light' onClick={() => fetchCurrentWeather(locationInput)}>Get Weather</button>
            </div>

            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
            {currentWeather.location && <div className='weather-forecast bg-secondary text-light'>
                <p>Current Weather in {currentWeather.location}</p>
                <p>{currentWeather.description}</p>
                <p>Temperature: {currentWeather.temperature} &#176;C</p>
                <p>Feels Like: {currentWeather.feelsLike} &#176;C</p>
                <p>Wind Speed: {currentWeather.windSpeed} mph</p>
                <p>Precipitation: {currentWeather.precip} mm</p>
                <p>Observed at {currentWeather.observationTime}</p>
                <br />
                <div class="hourly-weather">
                    <div class="grid-item">
                        <p>Hourly Times:</p><div class="grid-container">{hourlyWeather.times.map((time) => <div class="grid-item">{time}</div>)}</div>
                    </div>
                    <div class="grid-item">
                        <p>Hourly Temps:</p><div class="grid-container">{hourlyWeather.temps.map((temp) => <div class="grid-item">{temp} &#176;C</div>)}</div>
                    </div>
                    <div class="grid-item">
                        <p>Hourly Pricip. Chance:</p><div class="grid-container">{hourlyWeather.precipProbability.map((precip) => <div class="grid-item">{precip}%</div>)}</div>
                    </div>
                </div>
                
            </div>
            }
        </>
    )
}