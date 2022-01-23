import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { LayoutDashboard } from './components';

import Home from './pages/home';
import User from './pages/user';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutDashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}
