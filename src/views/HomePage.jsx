import './homePage.css';
import Weather from '../components/Weather';

export default function HomePage() {

  return (
    <>
      <div className='homepage page bg-light text-dark'>
        <h1>Check Current Weather</h1>
        <Weather />
      </div>
    </>
  )
}