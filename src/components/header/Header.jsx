import appLogo64 from '../../assets/weather-app_64.png';

import './header.css';

export default function Header () {
    return (
        <>
            <header className='bg-primary'>
                <div className='app-logo'>
                    <a href="/"><img className='app-icon-64' src={appLogo64} alt="weather app icon" /></a>
                </div>
                <div className='website-title'>
                    <h3 className='website-title-text text-light'>Weather Forecast Explorer</h3>
                </div>
                <nav>
                    <p className='text-light'>Navbar Goes Here</p>
                </nav>
            </header>
        </>

        // <div className='header-bg'>
        //     <div className='header-wrapper'>
        //         <div className='header'>
        //             <div className='site-title'>
        //                 <a href='/'>
        //                     <h3>&lt;Alchamyst/&gt;</h3>
        //                     <h4>Ashley Yetman</h4>

        //                 </a> 
        //             </div>    
        //         </div>
        //     </div>
        // </div>
    );
}