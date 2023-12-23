import moment from 'moment';
import { useState } from 'react';
import WeatherSummary from './WeatherSummary';
import './weather.css';

import mockData from '../../utils/mock-weather.json'; //temporary for quick testing


export default function Weather (props) {
    const [locationInput, setLocationInput] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [searchLocation, setSearchLocation] = useState(undefined);
    const [weatherData, setWeatherData] = useState(undefined); 

    const handleGetWeather = () => {
        getLocation(locationInput)
            .then(async (location) => {
                const fetchedWeather = await getWeather(location.longitude, location.latitude)
                const locationData = {
                    longitude: location.longitude,
                    latitude: location.latitude,
                    name: location.location
                };

                console.log(locationData);
                console.log(fetchedWeather);

                setSearchLocation(locationData);  
                setWeatherData(fetchedWeather.forecastData);
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

    const getWeather = async (longitude, latitude) => {
        const weatherUrl = `/api/weather?longitude=${longitude}&latitude=${latitude}`;

            return fetch(weatherUrl)
                .then((response) => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .catch(error => {
                    setErrorMessage('An error occured fetching weather data.')
                    console.log(error)
                });
    }  
    


    // const fetchCurrentWeather = (locationQuery) => {
    //     const searchUrl = `/api/weather-old?address=${locationQuery}`;

    //     fetch(searchUrl)
    //         .then((response) => response.json())
    //         .then((weatherData) => parseWeather(weatherData))
    //         .catch(error => setErrorMessage('An error occured fetching weather data.'));
    //         // .catch(error => console.log(error));
    // }

    const parseWeather = (weatherData) => {
        if (weatherData.error) { return handleError(weatherData.error) }

        setErrorMessage (undefined);
        setWeatherData(
            
        )
    }

    const handleError = (error) => {
        setCurrentWeather({});
        return setErrorMessage (error);
    }

    // This function is just to simply testing without hammering the API and should not be in use for production.
    const mockWeather = () => {
        setErrorMessage (undefined);
        setWeatherData(mockData.forecastData);
        setSearchLocation({
            longitude: -2.4457329,
            latitude: 53.097829,
            name: "Crewe, Cheshire East, England, United Kingdom"
        });
    }

    return (
        <>
            <p>Enter a city name, address or post/zip code below to get the weather.</p>
            <div className='weather-search'>
                <input className='input-location'  type='text' name='location' id='location' placeholder='Enter Search Location' value={locationInput} onChange={ (e) => setLocationInput(e.target.value)} onKeyDown={(event) => {if(event.key === "Enter") handleGetWeather()}}/>
                <button className='btn-search bg-secondary text-light' onClick={() => handleGetWeather()}>Get Weather</button>
                {!import.meta.env.PROD && <button className='dev-temp' onClick={() => mockWeather()}>Mock Fetch</button>}
            </div>
            
            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
            {searchLocation && <WeatherSummary location={searchLocation.name} weatherData={weatherData.current} />}
            {/* {searchLocation && <WeatherForecast hourlyWeather={weatherData.forecast} />} */}
        </>
    )
}