import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root'
import './index.css'
import Register from './routes/Register.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './routes/Error.jsx'
import Login from './routes/Login'
import CreateProfile from './routes/CreateProfile.jsx'
import PrivateRoutes from './routes/PrivateRoutes.jsx'
import Profile from './routes/Profile'
import App from './routes/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <Error />,
      },
      {
        path: '/register',
        element: <Register />,
        errorElement: <Error />,
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: '/create-profile',
        element: <PrivateRoutes />,
        children: [
          {
            path: '/create-profile',
            element: <CreateProfile />,
          },
        ],
        errorElement: <Error />,
      },
      {
        path: '/profile',
        element: <PrivateRoutes />,
        errorElement: <Error />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
