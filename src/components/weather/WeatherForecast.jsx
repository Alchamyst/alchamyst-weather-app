import './weatherForecast.css';

export default function WeatherForecast(props) {

    return (
        <>
            <div className='hourly-weather bg-secondary text-light'>
                <p>Weather Forecast</p>
                <div className='forecast-grid'>
                    <div className='grid-item'>
                        <p>Hour</p><div className='grid-container'>{props.hourlyWeather.times.map((time, index) => <div className='grid-item' key={`hourlyTime-${index}`}>{time}</div>)}</div>
                    </div>
                    <div className='grid-item'>
                        <p>Temp.</p><div className='grid-container'>{props.hourlyWeather.temps.map((temp, index) => <div className='grid-item' key={`hourlyTemp-${index}`}>{temp} &#176;C</div>)}</div>
                    </div>
                    <div className='grid-item'>
                        <p>Precip. Chance</p><div className='grid-container'>{props.hourlyWeather.precipProbability.map((precip, index) => <div className='grid-item' key={`hourlyPrecip-${index}`}>{precip}%</div>)}</div>
                    </div>
                </div>
            </div>
        </>
    )
}