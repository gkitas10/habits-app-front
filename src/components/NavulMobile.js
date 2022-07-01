import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavulMobile.css';
import { useTranslation} from "react-i18next";


const NavulMobile = () => {
    const { t, i18n } = useTranslation();
    const [ language, setLanguage ] = useState('');
    
    const handleChange = e => {
        setLanguage(e.target.value);
        i18n.changeLanguage(e.target.value);
    }

    return ( 
        <ul className='header__ul-mobile'>
            <li className='header__li-mobile'>
                <Link to="/" className='header__link-mobile'>{t('header.home')}</Link>
            </li>
            <li className='header__li-mobile'>
                <Link to="/create-task-list" className='header__link-mobile'>{t('header.create')}</Link>
            </li>
            <li className='header__li-mobile'>
                <Link to="/calendar" className='header__link-mobile'>{t('header.calendar')}</Link>
            </li>
            <li className='header__li-mobile'>
                <Link to="/tutorial" className='header__link-mobile'>{t('header.tutorial')}</Link>
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
 
export default NavulMobile;