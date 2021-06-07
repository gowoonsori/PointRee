import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/layout/DashboardLayout';
import Account from 'src/pages/Account';
import Customers from 'src/pages/Customers';
import Points from 'src/pages/Points';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import LogOut from 'src/pages/LogOut';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Introduce from 'src/pages/Introduce';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/pointree" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'pointree',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Introduce /> },
      { path: 'account', element: <Account /> },
      { path: 'logout', element: <LogOut /> },
      { path: 'points', element: <Points /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'customers', element: <Customers /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  }
];

export default routes;
