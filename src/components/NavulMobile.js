import { Link } from 'react-router-dom';
import '../styles/NavulMobile.css';

const NavulMobile = () => {
    return ( 
        <ul className='header__ul-mobile'>
            <li className='header__li-mobile'>
                <Link to="/" className='header__link-mobile'>Home</Link>
            </li>
            <li className='header__li-mobile'>
                <Link to="/create-task-list" className='header__link-mobile'>Crear lista de tareas</Link>
            </li>
            <li className='header__li-mobile'>
                <Link to="/calendar" className='header__link-mobile'>Calendario</Link>
            </li>
            <li className='header__li-mobile'>
                <Link to="/tutorial" className='header__link-mobile'>Tutorial</Link>
            </li>
        </ul>
     );
}
 
export default NavulMobile;