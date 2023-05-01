import { AuthProvider, RequireAuth } from 'react-auth-kit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './routes/Layout'
import Home from './routes/Home'
import CreateProfile from './routes/CreateProfile'
import Profile from './routes/Profile'
import Login from './routes/login'
import SignUp from './routes/SignUp'
import Error from './routes/error'

const App = () => (
  <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === 'https:'}
  >
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} errorElement={<Error />} />
          <Route path='/login' element={<Login />} errorElement={<Error />} />
          <Route path='/signup' element={<SignUp />} errorElement={<Error />} />
          <Route
            path={'/create-a-profile'}
            element={
              <RequireAuth loginPath={'/login'}>
                <CreateProfile />
              </RequireAuth>
            }
            errorElement={<Error />}
          />
          <Route
            path={'/Profile'}
            element={
              <RequireAuth loginPath={'/login'}>
                <Profile />
              </RequireAuth>
            }
            errorElement={<Error />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)

export default App
