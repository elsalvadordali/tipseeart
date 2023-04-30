<<<<<<< HEAD
import { Link } from 'react-router-dom'

const ArtistBlock = ({ artist, isFeatured }) => {
  if (isFeatured)
    return (
      <div
        key={artist.user.username}
        className='w-full h-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full p-4 flex flex-col items-center self-start border-2 border-green-600 order-1'
      >
        <div className='h-full w-full p-4 border-2 m-2 relative'>
          <img src={artist.profile_pic_url} alt={artist.user.username} className='h-full w-full object-cover' />
          <div className='absolute top-0 left-0 bg-green-200 p-2 text-xl tracking-widest uppercase text-green-800'>
            <p>Featured</p>
          </div>
        </div>
        <h2 className='text-3xl font-extralight'>{artist.user.username}</h2>
        <Link
          to={`/artist/${artist.user.username}`}
          className='text-xl border-2 p-2 px-4 m-4  uppercase tracking-wider hover:bg-fuchsia-500 transition duration-300'
        >
          View Profile
        </Link>
      </div>
    )
  return (
    <div
      key={artist.user.username}
      className='w-full h-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full p-4 flex flex-col items-center  order-2'
    >
      <div className='h-full w-full p-4 border-2 m-2'>
        <img src={artist.profile_pic_url} alt={artist.user.username} className='h-full w-full object-cover' />
      </div>
      <h2 className='text-3xl font-extralight'>{artist.user.username}</h2>
      <Link
        to={`/artist/${artist.user.username}`}
        className='text-xl border-2 p-2 px-4 m-4  uppercase tracking-wider hover:bg-fuchsia-500 transition duration-300'
      >
        View Profile
      </Link>
    </div>
  )
=======
import { Link } from "react-router-dom"

const ArtistBlock = ({ artist, isFeatured }) => {
    if (isFeatured) return (
        <div key={artist.user.username} className="w-full h-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full p-4 flex flex-col items-center self-start border-2 border-green-600 order-1" >
            <div className="h-full w-full p-4 border-2 m-2 relative" >
                <img src={artist.profile_pic_url} alt={artist.user.username} className="h-full w-full object-cover" />
                <div className="absolute top-0 left-0 bg-green-200 p-2 text-xl tracking-widest uppercase text-green-800"><p>Featured</p></div>
            </div >
            <h2 className="text-3xl font-extralight">{artist.user.username}</h2>
            <Link to={`/artist/${artist.user.username}`} className="text-xl border-2 p-2 px-4 m-4  uppercase tracking-wider hover:bg-fuchsia-500 transition duration-300">View Profile</Link>
        </div>
    )
    return (
        <div key={artist.user.username} className="w-full h-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full p-4 flex flex-col items-center  order-2" >
            <div className="h-full w-full p-4 border-2 m-2" >
                <img src={artist.profile_pic_url} alt={artist.user.username} className="h-full w-full object-cover" />
            </div >
            <h2 className="text-3xl font-extralight">{artist.user.username}</h2>
            <Link to={`/artist/${artist.user.username}`} className="text-xl border-2 p-2 px-4 m-4  uppercase tracking-wider hover:bg-fuchsia-500 transition duration-300">View Profile</Link>
        </div>
    )
>>>>>>> main
}

export default ArtistBlock
