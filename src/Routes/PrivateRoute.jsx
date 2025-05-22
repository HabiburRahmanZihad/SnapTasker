import { use } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';


const PrivateRoute = ({ children }) => {

    const location = useLocation();

    const { user, loading } = use(AuthContext);


    if (loading) {
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate state={location?.pathname} to="/signin" />;
    }

    return children;
};

export default PrivateRoute;