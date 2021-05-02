import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/layout/DashboardLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import LogOut from 'src/pages/LogOut';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';

const routes = [
  {
    path: 'pointree',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'logout', element: <LogOut /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/pointree/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
