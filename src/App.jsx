import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ArtistBlock from './components/ArtistBlock'

function App() {
  let allArtists = useRef()

  const [count, setCount] = useState(0)
  const [artists, setArtists] = useState([])
  const [search, setSearch] = useState('')
  const [featured, setFeatured] = useState(Math.floor(Math.random() * artists.length))

  useEffect(() => {
    allArtists.current = [
      {
        "description": "string",
        "user": {
          "username": "Evelyn Boyer",
          "email": "user@example.com"
        },
        "profile_pic_url": "string"
      },
      {
        "description": "string",
        "user": {
          "username": "Austin C.",
          "email": "user@example.com"
        },
        "profile_pic_url": "string"
      },
      {
        "description": "string",
        "user": {
          "username": "Wesley Wormstrom",
          "email": "user@example.com"
        },
        "profile_pic_url": "string"
      },
      {
        "description": "string",
        "user": {
          "username": "Collin Powell",
          "email": "user@example.com"
        },
        "profile_pic_url": "string"
      },
      {
        "description": "string",
        "user": {
          "username": "string",
          "email": "user@example.com"
        },
        "profile_pic_url": "string"
      }
    ]
    /*
      fetch('https://tipseeart.fly.dev/artists')
        .then(res => res.json())
        .then(data => allArtists.current = data )
        */
    setArtists(allArtists.current)
  }, [])

  useEffect(() => {
    setArtists(filterArtists())
  }, [search])


  return (
    <>
      <header className='bg-[#222222] opacity-90 p-12 flex flex-row justify-around items-center'>
        <img src='/tipseeart.svg' className="w-36" alt="tip see art" />
        <Link to='/login' className='text-white underline text-xl'>Login</Link>
      </header>
      <div className="p-6 py-12 md:p-12">

        <h1 className="text-6xl font-extralight mb-4">Support Local Artists</h1>
        <p><span className='italic font-xl'>TLDR;</span> TipSee.Art is a way to tip an artist for the art you see. Your dollars will go directly to the artist of your choosing, in a method that works for you, helping to further their practice and allowing them to continue to make their mark on our community, for you to enjoy. If you’d buy them a drink, take the leap and get TipSee for art.

        </p>

        <input
          className='border-2 hover:border-gray-600 p-2 mb-4 w-full mt-8 outline-none focus:border-gray-600'
          type='text' value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            backgroundImage: "url('/search.png')",
            backgroundSize: "auto 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
        />
        <div className='flex flex-row flex-wrap w-full justify-evenly items-start'>
          {artists.length > 0 ? artists.map(artist => (
            <div key={artist.user.username}><ArtistBlock artist={artist} isFeatured={false} /> </div>
          )) : <p>No artists found! </p>}
        </div>
      </div>
    </>
  )
  function filterArtists() {
    return allArtists.current.filter(artist => artist.user.username.toLowerCase().includes(search.toLowerCase()))
  }
}

export default App
