import Logo from '../assets/icons/daily-tasks.png';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { useTranslation} from "react-i18next";

const Home = () => {
    const { t } = useTranslation();

    return ( 
        <div className='home'>
            <div className='home__main-container'>
                <img
                    className='home__logo'
                    src={Logo}
                />
                <Link className='home__link' to='create-task-list' ><button className='home__call-to-action'>{t("home.startnow")}</button></Link>
            </div>
        </div>
     );
}
 
export default Home;