import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-[#222222] opacity-90 p-12'>
      <div className='flex justify-between items-center'>
        <img src='/tipseeart.svg' className='w-36' alt='tip see art' />
        <nav>
          <ul className='flex gap-3 justify-end'>
            <li>
              <Link to={'/'} className='text-white underline text-xl'>
                Home
              </Link>
            </li>
            <li>
              <Link to={'/login'} className='text-white underline text-xl'>
                Login
              </Link>
            </li>
            <li>
              <Link to={'/Register'} className='text-white underline text-xl'>
                Register
              </Link>
            </li>

            {
              <li>
                <Link to={'/profile'} className='text-white underline text-xl'>
                  Profile
                </Link>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
