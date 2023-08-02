import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Users from './Users';
import Requests from './Requests';
import Login from './Login';
import Layout from './Layout';
import Annual from './Annual';
import Duty from './Duty';

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
        ],
      },
    ],
  },
]);

export default router;
