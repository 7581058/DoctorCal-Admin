import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Users from '@/pages/Users';
import Requests from '@/pages/Requests';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import Annual from '@/pages/Annual';
import Duty from '@/pages/Duty';
import Register from '@/pages/Register';
import Attendance from '@/pages/Attendance';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/requests',
            element: <Requests />,
          },
          {
            path: '/annual',
            element: <Annual />,
          },
          {
            path: '/duty',
            element: <Duty />,
          },
          {
            path: '/register',
            element: <Register />,
          },
          {
            path: '/attendance',
            element: <Attendance />,
          },
        ],
      },
    ],
  },
]);

export default router;
