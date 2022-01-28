import '../styles/LogoutButton.css';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { logout } = useAuth0();

    return ( 
        <button className='login-button' onClick={() => logout({ returnTo:window.location.origin })}>Log out</button>
     );
}
 
export default LoginButton;
