import {Route} from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react'; 
import Loading from '../Loading';

const ProtectedRoute = ({ component }) => {
    return ( 
        <Route
        component={withAuthenticationRequired(component, {
            onRedirecting:() => <Loading/>
        })}
        />
     );
}
 
export default ProtectedRoute;