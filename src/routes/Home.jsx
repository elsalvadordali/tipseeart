import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ArtistBlock from '../components/ArtistBlock'

function Home() {
  let allArtists = useRef()
  const [artists, setArtists] = useState([])
  const [search, setSearch] = useState('')
  const [featured, setFeatured] = useState(Math.floor(Math.random() * artists.length))

  useEffect(() => {
    allArtists.current = [
      {
        description: 'string',
        user: {
          username: 'Evelyn Boyer',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-1.JPG',
      },
      {
        description: 'string',
        user: {
          username: 'Austin Coue.',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-2.jpg',
      },
      {
        description: 'string',
        user: {
          username: 'Wesley Woroeumstrom',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-3.JPG',
      },
      {
        description: 'string',
        user: {
          username: 'Collin Powouell',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-4.JPG',
      },
      {
        description: 'string',
        user: {
          username: 'Evelyn Boyouer',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-1.JPG',
      },
      {
        description: 'string',
        user: {
          username: 'Ausoeutin C.',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-2.jpg',
      },
      {
        description: 'string',
        user: {
          username: 'Wesluoey Wormstrom',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-3.JPG',
      },
      {
        description: 'string',
        user: {
          username: 'Coluolin Powell',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-4.JPG',
      },
      {
        description: 'string',
        user: {
          username: 'Evelyn Boaoyer',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-1.JPG',
      },
      {
        description: 'string',
        user: {
          username: 'Austieiin C.',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-2.jpg',
      },
      {
        description: 'straoeuing',
        user: {
          username: 'Wesley Wormstrom',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-3.JPG',
      },
      {
        description: 'straoeuing',
        user: {
          username: 'Collin Powell',
          email: 'user@example.com',
        },
        profile_pic_url: 'artwork-4.JPG',
      },
    ]
    /*
      fetch('https://tipseeart.fly.dev/artists')
        .then(res => res.json())
        .then(data => allArtists.current = data )
        */
    let random = Math.floor(Math.random() * allArtists.current.length)
    setFeatured(random)
    setArtists(allArtists.current)
  }, [])

  useEffect(() => {
    setArtists(filterArtists())
  }, [search])

  return (
    <>
      <div className='p-6 py-12 md:p-12'>
        <h1 className='text-6xl font-extralight mb-4'>Support Local Artists</h1>
        <p>
          <span className='italic font-xl'>TLDR;</span> TipSee.Art is a way to tip an artist for the art you see. Your
          dollars will go directly to the artist of your choosing, in a method that works for you, helping to further
          their practice and allowing them to continue to make their mark on our community, for you to enjoy. If you’d
          buy them a drink, take the leap and get TipSee for art.
        </p>

        <input
          className='border-2 hover:border-gray-600 p-2 mb-4 w-full mt-8 outline-none focus:border-gray-600'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundImage: "url('/search.png')",
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center',
          }}
        />
        <p>{search && artists.length + ' found'}</p>
        <div className='flex flex-row flex-wrap w-full justify-evenly items-start min-h-screen'>
          {artists.length > 0 ? (
            artists.map((artist, i) => <ArtistBlock artist={artist} isFeatured={i == featured} />)
          ) : (
            <p>No artists found! </p>
          )}
        </div>
        <div className='flex flex-col items-center border-t-2 border-b-2 p-12 mb-24'>
          <h3 className='mb-4 text-4xl font-extralight'>Are you an artist?</h3>
          <p>
            <Link
              to='/register'
              className='bg-gray-600 text-white p-4 py-2 underline text-xl text-normal uppercase tracking-wider hover:bg-fuchsia-500 transition duration-300'
            >
              Register here
            </Link>{' '}
            to be featured on our page. It's free!
          </p>
        </div>
      </div>
    </>
  )
  function filterArtists() {
    return allArtists.current.filter((artist) => artist.user.username.toLowerCase().includes(search.toLowerCase()))
  }
}

export default Home
