import './navbar.css';

export default function Navbar () {

    const pageList = [
        { "path":"/", "label": "Home" },
        { "path":"/planner", "label": "Planner" },
        { "path":"/about", "label": "About" }
    ];

    const navLinks = pageList.map( (page) => {
        if( page.path == window.location.pathname){
            return (<li key={page.path}><a href={page.path} className='current-page text-light'>{page.label}</a></li>)    
        }
        return (<li key={page.path}><a href={page.path} className='nav-link text-light'>{page.label}</a></li>)
    });

    return(
        <nav>
            <ul>{navLinks}</ul>
        </nav>
    );
}