import { useState } from 'react';
import './weather.css';


export default function Project(props) {
    const [locationInput, setLocationInput] = useState("");
    const [currentWeather, setCurrentWeather] = useState({});
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
            observationTime: weatherData.forecastData.observation_time,
            feelsLike: weatherData.forecastData.feelslike, 
            // precip: weatherData.forecastData.precip,
            temperature: weatherData.forecastData.temperature,
            // windSpeed: weatherData.forecastData.wind_speed,
            // weatherDescriptions: weatherData.forecastData.weather_descriptions,
            description: weatherData.forecastData.weather_description,
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
            {currentWeather.location && <div className='weather-forecast bg-secondary text-light'>
                <p>Current Weather in {currentWeather.location}</p>
                <p>{currentWeather.description}</p>
                {/* {currentWeather.weatherDescriptions.map((description) => <p key={description}>{description}</p>)} */}
                {/* <p>{currentWeather.weatherDescriptions[0]}</p> */}
                <p>Temperature: {currentWeather.temperature} &#176;C</p>
                <p>Feels Like: {currentWeather.feelsLike} &#176;C</p>
                {/* <p>Wind Speed: {currentWeather.windSpeed} kmph</p>
                <p>Precipitation: {currentWeather.precip} mm</p> */}
                <p>Observed at {currentWeather.observationTime}</p>
            </div>}
        </>
    )
}