import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
const Root = () => {
  return (
    <>
      <div className='h-screen'>
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default Root
