import './homePage.css';
import Weather from '../components/weather/Weather';

export default function HomePage() {

  return (
    <>
      <div className='homepage page bg-light text-dark'>
        <h1>Fetch Your Forecast</h1>
        <Weather />
      </div>
    </>
  )
}