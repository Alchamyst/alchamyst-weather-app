import moment from 'moment';
import { useState } from 'react';
import { getWeatherDescription } from '../../utils/weather-info';
import WeatherForecast from './WeatherForecast';
import WeatherSummary from './WeatherSummary';
import './weather.css';


export default function Weather (props) {
    const [locationInput, setLocationInput] = useState("");
    const [searchLocation, setsearchLocation] = useState("");
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyWeather, setHourlyWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleGetWeather = () => {
        getLocation(locationInput)
            .then(location => {
                const parsedLocationData = parseLocation(location);
                console.log(parsedLocationData);
                setsearchLocation(parsedLocationData);
            })
            .catch(error => console.log(error));
    }

    const getLocation = (locationQuery) => {
        const searchUrl = `/api/location?address=${locationQuery}`;

        return fetch(searchUrl)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .catch(error => {
                setErrorMessage('An error occured fetching location data.')
                console.log(error)
            });
    }

    const parseLocation = (locationData) => {
        return {
            longitude: locationData.longitude,
            latitude: locationData.latitude
        };
    }

    const getCurrentWeather = () => {
        const searchUrl = `/api/weather?address=${locationQuery}`;

        return fetch(searchUrl)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .catch(error => {
            setErrorMessage('An error occured fetching location data.')
            console.log(error)
        })   
    }

    const fetchCurrentWeather = (locationQuery) => {
        const searchUrl = `/api/weather?address=${locationQuery}`;

        fetch(searchUrl)
            .then((response) => response.json())
            .then((weatherData) => parseWeather(weatherData))
            .catch(error => setErrorMessage('An error occured fetching weather data.'));
            // .catch(error => console.log(error));
    }

    const parseWeather = (weatherData) => {
        if (weatherData.error) { return handleError(weatherData.error) }

        setErrorMessage (undefined);
        setCurrentWeather({
            location: weatherData.location,
            feelsLike: weatherData.forecastData.feelslike, 
            temperature: weatherData.forecastData.temperature,
            description: getWeatherDescription(weatherData.forecastData.weather_code), //this description will be used as the alt text for icon.
        });
        setHourlyWeather({
            location: weatherData.location,
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

    // This function is just to simply testing without hammering the API and should not be in use for production.
    const mockWeather = () => {
        setErrorMessage (undefined);

        const location = '221B Baker Street, London, England United Kingdom.';

        const times = ["2023-12-22T00:00", "2023-12-22T01:00", "2023-12-22T02:00", "2023-12-22T03:00", "2023-12-22T04:00", "2023-12-22T05:00", "2023-12-22T06:00", "2023-12-22T07:00", "2023-12-22T08:00", "2023-12-22T09:00", "2023-12-22T10:00", "2023-12-22T11:00"];
        const momentTimes = times.map((time) => moment(time).format('h:mm a'));
        const temps = [8.8, 9.1, 9.3, 9.7, 10, 10.4, 10.5, 10.5, 10.4, 10.2, 10.3, 10.3];
        const precipProbability = [0, 32, 65, 97, 97, 97, 97, 79, 60, 42, 32, 23];
        const wCode = [3, 3, 3, 61, 61, 61, 61, 61, 61, 3, 61, 61];

        setCurrentWeather({
            location,
            description: getWeatherDescription('2'), //this description will be used as the alt text for icon.
            temperature: '10',
            feelsLike: '8', 
        });
        setHourlyWeather({
            location,
            times: momentTimes,
            temps,
            precipProbability,
            wCode 
        })
    }

    return (
        <>
            <p>Enter a city name, address or post/zip code below to get the weather.</p>
            <div className='weather-search'>
                <input className='input-location'  type='text' name='location' id='location' placeholder='Enter Search Location' value={locationInput} onChange={ (e) => setLocationInput(e.target.value)} onKeyDown={(event) => {if(event.key === "Enter") fetchCurrentWeather(locationInput)}}/>
                <button className='btn-search bg-secondary text-light' onClick={() => fetchCurrentWeather()}>Get Weather</button>
                {!import.meta.env.PROD && <button className='dev-temp' onClick={() => handleGetWeather()}>Get Location</button>}
                {!import.meta.env.PROD && <button className='dev-temp' onClick={() => mockWeather()}>Mock Fetch</button>}
            </div>
            
            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
            {currentWeather.location && <WeatherSummary currentWeather={currentWeather} />}
            {hourlyWeather.location && <WeatherForecast hourlyWeather={hourlyWeather} />}
        </>
    )
}