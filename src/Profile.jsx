import { Edit, LinkIcon, Dribble, TwitterIcon, InstagramIcon, CashAppLogo, PaypalLogo, VenmoLogo } from './components/Icons'
import { useState, useEffect, useRef } from 'react'

const Profile = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  const [profile, setProfile] = useState([])


  useEffect(() => {
    // fetch goes here
    setProfile({
      "description": "string",
      "user": {
        "username": "Evelyn Boyer",
        "email": "user@example.com"
      },
      "profile_pic_url": "artwork-1.JPG",
      socials: [
        { name: 'twitter', url: 'https://twitter.com' },
        { name: 'instagram', url: 'https://instagram.com' },
        { name: 'facebook', url: 'https://facebook.com' }
      ],
      payment: [
        { name: 'cashapp', url: 'https://cash.app' },
        { name: 'paypal', url: 'https://paypal.com' },
        { name: 'venmo', url: 'https://venmo.com' }
      ],
      gallery: [
        { name: 'artwork-1', url: 'artwork-1.JPG' },
        { name: 'artwork-2', url: 'artwork-2.jpg' },
        { name: 'artwork-3', url: 'artwork-3.JPG' },
        { name: 'artwork-4', url: 'artwork-4.JPG' },
      ]
    })
  }, [])

  return (
    <div className=''>
      <header className='bg-[#222222] opacity-90 min-h-[360px] flex justify-center mb-56'>
        <div
          id='profile-pic'
          style={{
            backgroundImage: `url(${profile?.profile_pic_url})`,
            backgroundSize: 'cover',
            hover: {
              opacity: .5
            }
          }}
          className=' h-72 w-72 rounded-full bg-[#D9D9D9] relative top-[216px] transition duration-300 ease-in-out '>
          {loggedIn && <button className='absolute top-32 left-32 text-xs text-white hover:text-indigo-600 transition duration-300 ease-in-out '><Edit /></button>}

        </div>
      </header>
      <main className='relative space-y-20 h-screen px-10'>
        <div className='space-y-8 max-w-xl lg:max-w-4xl mx-auto'>
          <h2 className='text-4xl font-extralight text-center'>{profile?.user?.username}</h2>
          <ul className='flex justify-center gap-4'>
            {profile?.socials?.map((social, index) => {
              return (
                <li key={index} className='relative'>
                  <a href={social.url} className='flex justify-center gap-1 py-0 p-6 hover:text-indigo-600  transition duration-300 ease-in-out'>
                    {social.name === 'twitter' && <TwitterIcon />}
                    {social.name === 'instagram' && <InstagramIcon />}
                    {social.name !== 'twitter' && social.name !== 'instagram' && <LinkIcon />}
                    {social.name}
                  </a>
                  {loggedIn && <button className='absolute top-0 right-0 text-xs text-slate-300 hover:text-indigo-600  transition duration-300 ease-in-out'><Edit /></button>}
                </li>
              )
            })}

          </ul>
          <p className='text-center'>
            {profile.description}
          </p>
          <div className='flex justify-center'>
            <ul className='flex gap-9'>
              {profile?.payment?.map((p, i) => {
                return (
                  <li key={p.name} className='w-[72px] h-[72px] rounded-full overflow-hidden'>
                    <a href={p.url}>
                      {p.name === 'cashapp' && <CashAppLogo />}
                      {p.name === 'paypal' && <PaypalLogo />}
                      {p.name === 'venmo' && <VenmoLogo />}
                      {p.name !== 'cashApp' && p.name !== 'paypal' && p.name !== 'venmo' && <LinkIcon />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <h2 className='text-6xl text-extralight'>Gallery</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center'>
          {profile?.gallery?.map((art, index) => {
            return (
              <a href={'/' + art.url}><img src={'/' + art.url} alt={art.name} /></a>
            )
          })}

        </div>
      </main>
    </div>
  )
}

export default Profile
