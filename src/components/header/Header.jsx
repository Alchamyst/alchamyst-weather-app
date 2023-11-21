import Navbar from '../navbar/Navbar';

import appLogo64 from '../../assets/weather-app_64.png';

import './header.css';

export default function Header () {
    return (
        <>
            <div className='header-background bg-primary'>
                <div className='header-content'>
                    <header>
                        <div className='app-logo'>
                            <a href="/"><img className='app-icon-64' src={appLogo64} alt="weather app icon" /></a>
                        </div>
                        <div className='website-title'>
                            <h3 className='website-title-text text-light'>Weather Wingman</h3>
                        </div>
                        <Navbar />
                    </header>
                </div>
            </div>
        </>
    );
}