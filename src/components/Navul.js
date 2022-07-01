import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navul.css';
import { useTranslation} from "react-i18next";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [ language, setLanguage ] = useState('');
    
    const handleChange = e => {
        setLanguage(e.target.value);
        i18n.changeLanguage(e.target.value);
    }

    return ( 
        <ul className='header__ul'>
            <li className='header__li'>
                <Link to="/" className='header__link'>{t('header.home')}</Link>
            </li>
            <li className='header__li'>
                <Link to="/create-task-list" className='header__link'>{t('header.create')}</Link>
            </li>
            <li className='header__li'>
                <Link to="/calendar" className='header__link'>{t('header.calendar')}</Link>
            </li>
            <li className='header__li-mobile'>
                <Link to="/tutorial" className='header__link'>{t('header.tutorial')}</Link>
            </li>
            <li className='header__li-mobile'>
                <select defaultValue={language} onChange={handleChange} className='header__select'>
                    <option>Language</option>
                    <option value='es'>Español</option>
                    <option value='en'>English</option>
                </select>
            </li>
        </ul>
     );
}
 
export default Navbar;