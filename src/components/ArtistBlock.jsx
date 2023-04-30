

const ArtistBlock = ({ artist, isFeatured }) => {
    console.log(artist)
    return <div className="h-64 w-64 p-4 border-2 m-2">
        <h2>{artist.user.username}</h2>
    </div>
}

export default ArtistBlock