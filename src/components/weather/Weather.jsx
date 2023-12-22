import moment from 'moment';
import { useState } from 'react';
import { getWeatherDescription } from '../../utils/weather-info';
import WeatherForecast from './WeatherForecast';
import WeatherSummary from './WeatherSummary';
import './weather.css';


export default function Weather (props) {
    const [locationInput, setLocationInput] = useState("");
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyWeather, setHourlyWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined);

    const fetchCurrentWeather = (locationQuery) => {
        const searchUrl = `/api/weather?address=${locationQuery}`;

        return fetch(searchUrl)
            .then((response) => response.json())
            .then((weatherData) => parseWeather(weatherData))
            .catch(setErrorMessage('An error occured fetching weather data.'));
            // .catch(error => console.log(error));
    }

    const parseWeather = (weatherData) => {
        if (weatherData.error) { return handleError(weatherData.error) }

        setErrorMessage (undefined);
        setCurrentWeather({
            location: weatherData.location,
            observationTime: moment(weatherData.forecastData.observation_time).format('h:mm a'),
            feelsLike: weatherData.forecastData.feelslike, 
            precip: weatherData.forecastData.precip,
            temperature: weatherData.forecastData.temperature,
            description: getWeatherDescription(weatherData.forecastData.weather_code), //this description will be used as the alt text for icon.
        });
        setHourlyWeather({
           times: weatherData.forecastData.hourly_times.map((time) => moment(time).format('h:mm a')),
           temps: weatherData.forecastData.hourly_temps,
           precipProbability: weatherData.forecastData.hourly_precip_probability,
           wCode : weatherData.forecastData.hourly_weather_code 
        })
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
            {currentWeather.location && <WeatherSummary currentWeather={currentWeather} />}
            {currentWeather.location && <WeatherForecast hourlyWeather={hourlyWeather} />}
        </>
    )
}