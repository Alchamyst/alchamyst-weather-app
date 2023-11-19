import alchamystLogo64 from '../../assets/alchamyst_64.png';
import alchamystLogo128 from '../../assets/alchamyst_128.png';

import './header.css';

export default function Header () {
    return (
        <>
            <div className='header bg-primary'>
                <p className='text-light'>This is my header component.</p>
            </div>
        </>

        // <div className='header-bg'>
        //     <div className='header-wrapper'>
        //         <div className='header'>
        //             <div className='site-title'>
        //                 <a href='/'>
        //                     <h3>&lt;Alchamyst/&gt;</h3>
        //                     <h4>Ashley Yetman</h4>
        //                     <img className='alchamyst-logo-64' src={alchamystLogo64} alt="alchamyst logo" />
        //                     <img className='alchamyst-logo-128' src={alchamystLogo128} alt="alchamyst logo" />
        //                 </a> 
        //             </div>    
        //         </div>
        //     </div>
        // </div>
    );
}