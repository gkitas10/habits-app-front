import { Link } from 'react-router-dom';
import '../styles/Header.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const { isAuthenticated, user } = useAuth0();
    return ( 
        <div className="header">
            <nav className='header__nav'>
                <ul className='header__ul'>
                    <li className='header__li'>
                        <Link to="/" className='header__link'>Home</Link>
                    </li>
                    <li className='header__li'>
                        <Link to="/create-task-scheme" className='header__link'>Crear esquema de tareas</Link>
                    </li>
                    <li className='header__li'>
                        <Link to="/calendar" className='header__link'>Calendario</Link>
                    </li>
                    <li className='header__li'>
                        <Link to="/stats" className='header__link'>Estadísticas</Link>
                    </li>
                </ul>
            </nav>
            <div className="header__login-container">
                <div>Hola  </div>
                { isAuthenticated ? <LogoutButton/> : <LoginButton/> }
                
                
            </div>
            
        </div>
     );
}
 
export default Header;