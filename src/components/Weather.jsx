import { useState } from 'react';

export default function Project(props) {
    const [currentWeather, setCurrentWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleOnClick = () => {
        fetchCurrentWeather("Cheltenham");
    }


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
            <form>
                <input placeholder="location" />
                <button>Search</button>
            </form>

            <button onClick={handleOnClick}>Cheltenham Weather</button>
            {errorMessage && <p>{errorMessage}</p>}
            {currentWeather.location && <>
                <p>{currentWeather.location}</p>
                <p>Observed at {currentWeather.observationTime}</p>
                <p>Temperature: {currentWeather.temperature} &#176;C</p>
                <p>Wind Speed: {currentWeather.windSpeed} kmph</p>
                <p>Precipitation: {currentWeather.precip} mm</p>
            </>}
        </>
    )
}