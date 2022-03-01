import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Result } from 'antd';

import {
  Protector,
  GuestOnly,
  LayoutAuth,
  LayoutDashboard,
} from './components';

import { AuthProvider } from './libs/contexts/auth';

import Login from './pages/auth/login';
import Home from './pages/home';
import Customers from './pages/customer';
import Categories from './pages/categories';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Protector />}>
            <Route element={<LayoutDashboard />}>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Customers />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Route>
          <Route element={<GuestOnly />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route
            exact
            path="/404"
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
              />
            }
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
