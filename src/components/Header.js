import '../styles/Header.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Navul from './Navul';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import NavulMobile from './NavulMobile';

const Header = () => {
    const { isAuthenticated, user } = useAuth0();
    console.log(user);
    const [ togglenav, setTogglenav ] = useState(false);
    return ( 
        <div className="header">
            <svg className='header__burger-icon' viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
            onClick={ () => setTogglenav(!togglenav) }
            >
                <rect id="icon-bound" fill="none" />
                <path d="M1,9h14V7H1V9z M1,14h14v-2H1V14z M1,2v2h14V2H1z" />
            </svg>
            <nav className='header__navbar'>
                 { togglenav ? <NavulMobile/> : null }
                 <Navul/>
            </nav>
            <div className="header__login-container">
                { isAuthenticated ? <LogoutButton/> : <LoginButton/> }
            </div>
            
        </div>
     );
}
 
export default Header;