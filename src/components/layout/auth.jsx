import { Outlet } from 'react-router-dom';

const LayoutAuth = () => {
  return (
    <div className="layout-auth">
      <div className="layout-auth-left">
        <div className="layout-auth-logo">
          <p>NOTBLESSY</p>
        </div>
        <div className="layout-auth-form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
