import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header className='bg-[#222222] opacity-90 p-12'>
        <div className='flex justify-between items-center'>
          <img src='/tipseeart.svg' className='w-36' alt='tip see art' />
          <nav>
            <ul className='flex gap-3 justify-end'>
              <li>
                <NavLink to={'/'} className='text-white underline text-xl'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={'/login'} className='text-white underline text-xl'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to={'/signup'} className='text-white underline text-xl'>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to={'/profile'} className='text-white underline text-xl'>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={'/create-a-profile'} className='text-white underline text-xl'>
                  Create a Profile
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
