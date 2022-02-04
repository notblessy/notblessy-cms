import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function GuestOnly(props) {
  const [cookies] = useCookies();

  if (cookies?.access_token) {
    return <Navigate to="/" />;
  }

  return <Outlet {...props} />;
}

export default GuestOnly;
