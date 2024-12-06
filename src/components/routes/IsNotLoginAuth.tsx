import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function IsNotLoginAuth() {
    const { user } = useSelector((state: any) => state.auth);

    if (user) {
        return <Navigate to={`/store`} replace />;
    }

    return <Outlet />;
}

