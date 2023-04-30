import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let authToken = sessionStorage.getItem('token')
  return authToken ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
