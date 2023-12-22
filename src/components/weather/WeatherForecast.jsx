import './weather.css';

export default function WeatherForecast(props) {

    return (
        <>
            <div className='hourly-weather bg-secondary text-light'>
                <div className='grid-item'>
                    <p>Hourly Times:</p><div className='grid-container'>{props.hourlyWeather.times.map((time) => <div className='grid-item'>{time}</div>)}</div>
                </div>
                <div className='grid-item'>
                    <p>Hourly Temps:</p><div className='grid-container'>{props.hourlyWeather.temps.map((temp) => <div className='grid-item'>{temp} &#176;C</div>)}</div>
                </div>
                <div className='grid-item'>
                    <p>Hourly Pricip. Chance:</p><div className='grid-container'>{props.hourlyWeather.precipProbability.map((precip) => <div class='grid-item'>{precip}%</div>)}</div>
                </div>
            </div>
        </>
    )
}