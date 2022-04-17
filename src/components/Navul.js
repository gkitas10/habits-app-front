import { Link } from 'react-router-dom';
import '../styles/Navul.css';

const Navbar = () => {
    return ( 
        <ul className='header__ul'>
            <li className='header__li'>
                <Link to="/" className='header__link'>Home</Link>
            </li>
            <li className='header__li'>
                <Link to="/create-task-list" className='header__link'>Crear lista de tareas</Link>
            </li>
            <li className='header__li'>
                <Link to="/calendar" className='header__link'>Calendario</Link>
            </li>
        </ul>
     );
}
 
export default Navbar;