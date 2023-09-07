import {
  Edit,
  LinkIcon,
  Dribble,
  TwitterIcon,
  InstagramIcon,
  CashAppLogo,
  PaypalLogo,
  VenmoLogo,
} from "../components/Icons";
import { useState, } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useLoaderData } from "react-router-dom";
import { getStorage, ref, uploadBytes, getBlob } from "firebase/storage";

async function getProfileImage(artist) {
  const storage = getStorage()
  const pathRef = ref(storage, `${artist.username}`)
  const imgBlob = await getBlob(pathRef).catch(() => null)
  //const img = new Image()
  //img.src = imgBlob ? URL.createObjectURL(imgBlob) : '/user-x.svg'
  //imgBlob ? setImage(URL.createObjectURL(imgBlob)) : setImage('/user-x.svg')
  return URL.createObjectURL(imgBlob)
}

export async function loader({ request }) {
  const username = new URL(request.url).pathname.substring(1);

  const artistRef = collection(db, "artists");
  const q = query(artistRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  const artist = querySnapshot.docs[0].data();
  const profile = await getProfileImage(artist)
  console.log(profile)
  return {...querySnapshot.docs[0].data(), profile_picture: profile};
}

const Artist = () => {
  const profile = useLoaderData();
  console.log("WHAT", profile)
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({});
  const [gallery, setGallery] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const uid = localStorage.getItem("uid");

    if (uid) {
      await setDoc(doc(db, "artists", uid), formData);
      uploadBytes(storageRef, profile)
    }
  }

  
  if (profile) {
    return (
      <main className="flex flex-col items-center justify-center w-full pt-8 pb-12">
        <img className='w-80 object-cover rounded-full mb-6' src={profile.profile_picture} alt={'profile picture for ' + profile.fullName} />

        <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 outline-none transition duration-300 ease-in-out">
          <h2 className="text-6xl font-extralight col-span-3">
            {profile.fullName}
          </h2>
        </div>
        <div className="w-80">
          <p>{profile.description}</p>
        </div>
        {(profile.twitter || profile.instagram || profile.dribble) && (
          <h3 className="text-3xl font-extralight mb-6">Follow</h3>
        )}
        {profile.twitter && (
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <TwitterIcon />
            </label>
            <h2 className="text-2xl font-extralight">
              <a
                href={`https://twitter.com/${profile.twitter}`}
                className="underline text-indigo-400 pointer"
              >
                {profile.twitter}
              </a>
            </h2>
          </div>
        )}
        {profile.instagram && (
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2  outline-none hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <InstagramIcon />
            </label>
            <h2 className="text-2xl font-extralight ">
              <a
                href={`https://instagram.com/${profile.instagram}`}
                className="underline text-indigo-400 pointer"
              >
                {profile.instagram}
              </a>
            </h2>
          </div>
        )}
        {profile.dribble && (
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2  outline-none hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <Dribble />
            </label>
            <h2 className="text-2xl font-extralight">
              <a
                href={`https://instagram.com/${profile.dribble}`}
                className="underline text-indigo-400 pointer"
              >
                {profile.dribble}
              </a>
            </h2>
          </div>
        )}
        {(profile.cashApp || profile.paypal || profile.venmo) && (
          <h3 className="text-3xl font-extralight mb-6">Tip</h3>
        )}
        {profile.cashApp && (
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <CashAppLogo />
            </label>
            <h2 className="text-2xl font-extralight flex justify-start items-center h-12">
              <a
                href={`https://cash.app/${profile.cashApp}`}
                className="underline text-indigo-400 pointer"
              >
                {profile.cashApp}
              </a>
            </h2>
          </div>
        )}
        {profile.paypal && (
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <PaypalLogo />
            </label>
            <h2 className="text-2xl font-extralight flex justify-start items-center h-12">
              <a
                href={`https://www.paypal.com/paypalme/${profile.paypal}`}
                className="underline text-indigo-400 pointer"
              >
                {profile.paypal}
              </a>
            </h2>
          </div>
        )}
        {profile.venmo && (
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center h-12">
              <VenmoLogo />
            </label>
            <h2 className="text-2xl font-extralight flex justify-start items-center">
              <a
                href={`https://venmo.com/${profile.venmo}`}
                className="underline text-indigo-400 pointer"
              >
                {profile.venmo}
              </a>
            </h2>
          </div>
        )}
       
      </main>
    );
  }
};

export default Artist;
