import '../styles/LogoutButton.css';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return ( 
        <button className='logout-btn' onClick={() => logout({ returnTo:window.location.origin })}>Log out</button>
     );
}
 
export default LogoutButton;
