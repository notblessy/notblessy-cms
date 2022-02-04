import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Protected(props) {
  const location = useLocation();
  const [cookies] = useCookies();

  if (!cookies?.access_token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet {...props} />;
}

export default Protected;
