import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Users from './Users';
import Requests from './Requests';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: '/admin/users',
        element: <Users />,
      },
      {
        path: '/admin/requests',
        element: <Requests />,
      },
    ],
  },
]);

export default router;
