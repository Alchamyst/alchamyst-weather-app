import { useState } from 'react';

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

        if (weatherData.error) return setErrorMessage (weatherData.error);

        setErrorMessage (undefined);
        setCurrentWeather({
            location: weatherData.location,
            observationTime: weatherData.forecastData.observation_time,
            feelsLike: weatherData.forecastData.feelslike, 
            precip: weatherData.forecastData.precip,
            temperature: weatherData.forecastData.temperature,
            windSpeed: weatherData.forecastData.wind_speed,
            weatherDescriptions: weatherData.forecastData.weather_descriptions,
        })
    }

    return (
        <>
            <p>Search below to get the weather in your location.</p>

            <input type='text' name='location' id='location' placeholder='Search Location' value={locationInput} onChange={ (e) => setLocationInput(e.target.value)} onKeyDown={(event) => {if(event.key === "Enter") fetchCurrentWeather(locationInput)}}/>
            <button onClick={() => fetchCurrentWeather(locationInput)}>Get Current Weather</button>

            {errorMessage && <p>{errorMessage}</p>}
            {currentWeather.location && <>
                <p>{currentWeather.location}</p>
                {currentWeather.weatherDescriptions.map((description) => <p key={description}>{description}</p>)}
                {/* <p>{currentWeather.weatherDescriptions[0]}</p> */}
                <p>Temperature: {currentWeather.temperature} &#176;C</p>
                <p>Wind Speed: {currentWeather.windSpeed} kmph</p>
                <p>Precipitation: {currentWeather.precip} mm</p>
                <p>Observed at {currentWeather.observationTime}</p>
            </>}
        </>
    )
}