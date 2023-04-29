import { LinkIcon, TwitterIcon, InstagramIcon, CashAppLogo, PaypalLogo, VenmoLogo } from './components/Icons'
const Profile = () => {
  return (
    <div className='bg-slate-100'>
      <header className='bg-[#222222] opacity-90 min-h-[360px] flex justify-center mb-[220px]'>
        <div className=' h-72 w-72 rounded-full bg-[#D9D9D9] relative top-[216px]' />
      </header>
      <main className='relative space-y-20 h-screen px-10'>
        <div className='space-y-5'>
          <h2 className='text-4xl font-extralight text-center'>John Smith</h2>
          <ul className='flex justify-center gap-4'>
            <li>
              <a href='#' className='flex justify-center gap-1'>
                <LinkIcon />
                Portfolio
              </a>
            </li>
            <li>
              <a href='#' className='flex justify-center gap-1'>
                <TwitterIcon />
                Twitter
              </a>
            </li>
            <li>
              <a href='#' className='flex justify-center gap-1'>
                <InstagramIcon />
                Instagram
              </a>
            </li>
          </ul>

          <p className='max-w-xl lg:max-w-4xl text-center mx-auto'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
          <div className='flex justify-center'>
            <ul className='flex gap-9'>
              <li className='w-[72px] h-[72px] rounded-full overflow-hidden'>
                <a href='#'>
                  <CashAppLogo />
                </a>
              </li>
              <li className='w-[72px] h-[72px] rounded-full overflow-hidden'>
                <a href='#'>
                  <PaypalLogo />
                </a>
              </li>
              <li className='w-[72px] h-[72px] rounded-full overflow-hidden'>
                <a href='#'>
                  <VenmoLogo />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-4 mx-auto gap-10 lg:max-w-4xl justify-items-center max-w-xl'>
          <div className='w-48 h-48 bg-[#D9D9D9]'></div>
          <div className='w-48 h-48 bg-[#D9D9D9]'></div>
          <div className='w-48 h-48 bg-[#D9D9D9]'></div>
          <div className='w-48 h-48 bg-[#D9D9D9]'></div>
        </div>
      </main>
    </div>
  )
}

export default Profile
