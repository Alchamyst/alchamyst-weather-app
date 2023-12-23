import './weatherForecast.css';

export default function WeatherForecast(props) {

    return (
        <>
            <div className='hourly-weather bg-secondary text-light'>
                <p>Weather Forecast</p>
                <div className='forecast-grid'>
                    <div className='grid-item'>
                        <p>Hour</p><div className='grid-container'>{props.weatherData.hours.map((time, index) => <div className='grid-item' key={`hourlyTime-${index}`}>{time}</div>)}</div>
                    </div>
                    <div className='grid-item'>
                        <p>Temp.</p><div className='grid-container'>{props.weatherData.temperature.map((temp, index) => <div className='grid-item' key={`hourlyTemp-${index}`}>{temp} &#176;C</div>)}</div>
                    </div>
                    <div className='grid-item'>
                        <p>Feelslike</p><div className='grid-container'>{props.weatherData.feelslike.map((feelslike, index) => <div className='grid-item' key={`hourlyFeelslike-${index}`}>{feelslike} &#176;C</div>)}</div>
                    </div>
                    <div className='grid-item'>
                        <p>Precip. Chance</p><div className='grid-container'>{props.weatherData.precipitationChance.map((PrecipChance, index) => <div className='grid-item' key={`hourlyChance-${index}`}>{PrecipChance}%</div>)}</div>
                    </div>
                    <div className='grid-item'>
                        <p>Humidity</p><div className='grid-container'>{props.weatherData.humidity.map((humidity, index) => <div className='grid-item' key={`hourlyHumidity-${index}`}>{humidity}%</div>)}</div>
                    </div>
                    <div className='grid-item'>
                        <p>WindSpeed</p><div className='grid-container'>{props.weatherData.windSpeed.map((windSpeed, index) => <div className='grid-item' key={`hourlyWindSpeed-${index}`}>{windSpeed}mph</div>)}</div>
                    </div>
                </div>
            </div>
        </>
    )
}