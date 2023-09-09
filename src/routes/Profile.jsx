import {
  Dribble,
  TwitterIcon,
  InstagramIcon,
  CashAppLogo,
  PaypalLogo,
  VenmoLogo,
} from "../components/Icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLoaderData, Link } from "react-router-dom";
import { getStorage, ref, getBlob } from "firebase/storage";

async function getProfileImage(artist) {
  const storage = getStorage()
  console.log("A", artist)
  const pathRef = ref(storage, `${artist.username}`)
  const imgBlob = await getBlob(pathRef).catch(() => null)
  return imgBlob ? URL.createObjectURL(imgBlob) : ''
}


export async function loader() {
  const uid = localStorage.getItem("uid");
  let mock_profile = {
    bio: "",
    username: "",
    fullName: "",
    profile_pic_url: "",
    twitter: "",
    instagram: "",
    dribble: "",
    portfolio: "",
    cashapp: "",
    paypal: "",
    venmo: "",
    gallery: [],
  };
  const docRef = doc(db, "artists", uid);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const profileImage = await getProfileImage(docSnap.data())
    const profile = docSnap.data()
    return { ...profile, profile_picture: profileImage }
 } else return mock_profile
}

  // const artist = querySnapshot ? querySnapshot.docs[0].data() : null
  // const profile = await getProfileImage(artist)
  // console.log(profile)
  // return { ...querySnapshot.docs[0].data(), profile_picture: profile };
// }

const Profile = () => {
  const profile = useLoaderData();

  if (profile) {
    return (
      <main className="flex flex-col items-center justify-center w-full pt-8 pb-12">
        {profile.profile_picture && <img className='w-80 object-cover rounded-full mb-6' src={profile.profile_picture} alt={'profile picture for ' + profile.fullName} />}

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
                target="_blank"
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
                target="_blank"
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
                target="_blank"

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
                target="_blank"
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
                target="_blank"
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
                target="_blank"
              >
                {profile.venmo}
              </a>
            </h2>
          </div>
        )}
        <Link
                  to="/auth/edit-profile"
                  className="bg-gray-600 text-white p-4 py-2 mr-4 underline text-xl text-normal uppercase tracking-wider hover:bg-pink-600 transition duration-300"
                >
                  Edit profile
                </Link>
      </main>
    );
  }
};

export default Profile;
