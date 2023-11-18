import { useState } from 'react';
import { getCurrentWeather } from '../utils/weatherData';

export default function Project(props) {
    const [currentWeather, setcurrentWeather] = useState("");
    const [errorMessage, seterrorMessage] = useState(undefined);

    const fetchWeather = () => {
        const fetchedWeather = getCurrentWeather("Cheltenham");

        // if (fetchedWeather.error) return seterrorMessage(fetchedWeather.error);

        // setcurrentWeather(fetchedWeather);
    }

    return (
        <>
            <p>Search below to get the weather in your location.</p>
            <form>
                <input placeholder="location" />
                <button>Search</button>
            </form>

            <button onClick={() => {fetchWeather()}}>Cheltenham Weather</button>
            {errorMessage && <p>{errorMessage}</p>}
            {!errorMessage && <p>{currentWeather}</p>}
        </>
    )
}