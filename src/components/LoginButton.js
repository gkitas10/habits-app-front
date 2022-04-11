import '../styles/LoginButton.css';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return ( 
        <button className='login-btn' onClick={() => loginWithRedirect()}>Log in</button>
     );
}
 
export default LoginButton;
