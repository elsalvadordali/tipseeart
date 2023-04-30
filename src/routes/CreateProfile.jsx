import { useState, useEffect, useRef } from 'react'
import Dropdown from '../components/Dropdown'
import Socials from '../components/Socials'
import { createProfile } from '../util/crudOperations'

const SOCIAL_MEDIA = [
  { name: 'twitter', url: '', set: false },
  { name: 'facebook', url: '', set: false },
  { name: 'youtube', url: '', set: false },
  { name: 'instagram', url: '', set: false },
  { name: 'linkedIn', url: '', set: false },
  { name: 'bandcamp', url: '', set: false },
  { name: 'soundcloud', url: '', set: false },
  { name: 'spotify', url: '', set: false },
  { name: 'portfolio', url: '', set: false },
  { name: 'tiktok', url: '', set: false },
  { name: 'etsy', url: '', set: false },
  { name: 'twitch', url: '', set: false },
  { name: 'reddit', url: '', set: false },
  { name: 'pinterest', url: '', set: false },
  { name: 'other', url: '', set: false },
  { name: 'close' },
]
const PAYMENT_LINKS = [
  { name: 'venmo', url: '', set: false },
  { name: 'paypal', url: '', set: false },
  { name: 'cashapp', url: '', set: false },
  { name: 'other', url: '', set: false },
  { name: 'close' },
]

const CreateProfile = () => {
  const token = sessionStorage.getItem('token')
  const [artistsSM, setArtistsSM] = useState(SOCIAL_MEDIA)
  const [artistsPayment, setArtistsPayment] = useState(PAYMENT_LINKS)
  const [bio, setBio] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    //let res = confirmToken(token)
  }, [])

  useEffect(() => {
    if (profilePicture) {
      setImage(URL.createObjectURL(profilePicture))
    } else {
      setImage(null)
    }
  }, [profilePicture])

  return (
    <div className='flex items-center justify-center w-full'>
      <form className='flex flex-col items-start m-6 sm:w-96' onSubmit={submitForm}>
        <h1 className='font-extralight text-6xl mb-12'>Create Profile</h1>
        <h2 className='text-2xl font-extralight mb-2'>1. Profile Picture</h2>
        <label htmlFor='profilePicture' className='w-80 border-2 p-12 text-center bg-gray-200 border-gray-600 mb-12'>
          click or drag here
        </label>
        <input
          id='profilePicture'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        {image && (
          <div className='relative'>
            <img src={image} alt='uploading' />
            <button
              className='absolute top-0 right-0 px-4 text-xl text-red-600'
              onClick={() => setProfilePicture(null)}
            >
              ×
            </button>
          </div>
        )}

        <h2 className='text-2xl font-extralight mb-2'>
          2. Bio <span className='text-red-600'>(required)</span>
        </h2>
        <textarea
          className='border-2 w-80 p-2 h-36 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out'
          placeholder='I grew up in... I draw my inspiration from...'
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
        <p className='mb-12'>*240 characters max</p>
        <div className='flex flex-col items-start mb-12 w-full'>
          <h2 className='text-2xl font-extralight mb-2'>3. Add your handle below</h2>
          <h3 className='text-l mb-4'>(Full url for portfolios/other)</h3>
          <Dropdown list={artistsSM} toggleInput={toggleSocialInput} displayName='Add Social Media' />
          <div className='flex flex-col items-center w-full'>
            {artistsSM.map((item, index) => {
              if (item.set)
                return (
                  <div key={item.name} className='flex flex-row justify-between items-center mb-4 w-full'>
                    <Socials name={item.name} updateHandle={updateSocialHandle} toggleInput={toggleSocialInput} />
                  </div>
                )
            })}
          </div>
        </div>

        <div className='flex flex-col items-start mb-12 w-full'>
          <h2 className='text-2xl font-extralight mb-2'>4. Add your tip jar</h2>
          <Dropdown list={artistsPayment} toggleInput={toggleFundsInput} displayName='Add tipping Options' />
          <div className='flex flex-col items-center w-full'>
            {artistsPayment.map((item) => {
              if (item.set)
                return (
                  <div key={item.name} className='flex flex-row justify-between items-center mb-4 w-full'>
                    <Socials name={item.name} updateHandle={updateFinancialHandle} toggleInput={toggleFundsInput} />
                  </div>
                )
            })}
          </div>
        </div>
        <button className='py-4 px-6 bg-[#222222] text-white uppercase tracking-wider font-normal hover:bg-indigo-700 transition duration-300 ease-in-out'>
          upload gallery
        </button>
      </form>
    </div>
  )

  function toggleSocialInput(socialMediaName) {
    const updatedList = artistsSM.map((item) => {
      if (item.name === socialMediaName) {
        if (item.set) item.url = ''
        item.set = !item.set
      }
      return item
    })
    setArtistsSM(updatedList)
  }
  function toggleFundsInput(bankName) {
    const updatedList = artistsPayment.map((item) => {
      if (item.name === bankName) {
        if (item.set) item.url = ''
        item.set = !item.set
      }
      return item
    })
    setArtistsPayment(updatedList)
  }

  function updateSocialHandle(socialMediaName, handle) {
    const updatedList = artistsSM.map((item) => {
      if (item.name === socialMediaName) {
        if (handle[0] === '@') item.url = handle.substring(1)
        else item.url = handle
      }
      return item
    })
    setArtistsSM(updatedList)
  }
  function updateFinancialHandle(bankName, handle) {
    const updatedList = artistsPayment.map((item) => {
      if (item.name === bankName) {
        if (handle[0] === '@') item.url = handle.substring(1)
        else item.url = handle
      }
      return item
    })
    setArtistsPayment(updatedList)
  }
  async function submitForm(e) {
    e.preventDefault()
    if (bio.length > 255) return
    const artist = { description: bio, payment_urls: [], social_links: [] }
    artistsSM.forEach((social) => {
      if (social.set) artist.social_links.push({ social_name: social.name, username: social.url })
    })
    artistsPayment.forEach((payment) => {
      if (payment.set) artist.payment_urls.push({ provider_name: payment.name, username: payment.url })
    })
    createProfile(artist, token)
  }
}

export default CreateProfile
