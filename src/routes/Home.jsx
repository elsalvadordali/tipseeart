import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ArtistBlock from "../components/ArtistBlock";

function Home() {
  const uid = localStorage.getItem("uid");
  const [allArtists, setAllArtists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(
    Math.floor(Math.random() * artists.length)
  );

  useEffect(() => {
    async function get() {
      const artistRef = collection(db, "artists");
      const querySnapshot = await getDocs(artistRef);

      const a = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setAllArtists(a)
      return null;
    }
    if (allArtists.length == 0) get();
  }, []);

  useEffect(() => {
    setArtists(allArtists);

  }, [allArtists])

  useEffect(() => {
    let random = Math.floor(Math.random() * allArtists.length);
    setFeatured(random);
  }, [artists]);

  useEffect(() => {
    if (search) setArtists(filterArtists());
  }, [search]);

  if (artists) {
    return (
      <>
        <div className="p-6 py-12 md:p-12">
          <div className="w-100 flex items-start">
            <div>
          <h1 className="text-6xl font-extralight mb-4">
            Support Local Artists
          </h1>
          <p>
            <span className="italic font-xl">TLDR;</span> TipSee.Art is a way to
            tip an artist for the art you see. Your dollars will go directly to
            the artist of your choosing, in a method that works for you, helping
            to further their practice and allowing them to continue to make
            their mark on our community, for you to enjoy. If you’d buy them a
            drink, take the leap and get TipSee for art.
          </p>
          </div>
          <input
            className="border-2 hover:border-gray-600 p-2 mb-4 w-full mt-8 outline-none focus:border-gray-600"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value == "" ? "" : e.target.value.toLowerCase())}
            style={{
              backgroundImage: "url('/search.png')",
              backgroundSize: "auto 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
            }}
          />
          </div>
          <p>{search && artists.length + " found"}</p>
          <div className="flex flex-row flex-wrap w-full justify-evenly items-start min-h-screen">
            {artists.length > 0 ? (
              artists.map((artist, i) => (
                <ArtistBlock
                  key={`artist-info-box-${i}`}
                  artist={artist}
                  isFeatured={i == featured}
                />
              ))
            ) : (
              <p>No artists found! </p>
            )}
          </div>
          {!uid && (
            <div className="flex flex-col items-center border-t-2 border-b-2 p-12 mb-24">
              <h3 className="mb-4 text-4xl font-extralight">
                Are you an artist?
              </h3>

              <p>
                <Link
                  to="/signup"
                  className="bg-gray-600 text-white p-4 py-2 mr-4 underline text-xl text-normal uppercase tracking-wider hover:bg-pink-600 transition duration-300"
                >
                  Register here
                </Link>
                to be featured on our page. It's free!
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
  function filterArtists() {
    console.log("SEARCH IS", search.length)
    if (search.length <= 1) return allArtists
    const s = search.toLowerCase().split(' ').join('')
    console.log("empty", allArtists)
    return allArtists.filter((artist) => {
      const fullName = artist.fullName.split(' ').join('').toLowerCase()
      const username = artist.username.toLowerCase()
      return fullName.includes(s) || username.includes(s);
    })
}
}

export default Home;
