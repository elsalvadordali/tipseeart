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
import { useState, useEffect, useRef } from "react";
import {
  doc,
  getDoc,
  
} from "firebase/firestore";
import { db } from "../../firebase";
import { Navigate, redirect, useLoaderData } from "react-router-dom";
import { getStorage, ref, getBlob} from "firebase/storage";

export async function loader({ request }) {
  const path = new URL(request.url).pathname;
  const isAuthenticated = sessionStorage.getItem("token") ? true : false;
  if (!isAuthenticated) return redirect("/");

  const uid = localStorage.getItem("uid");
  const docRef = doc(db, "artists", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
    const storage = getStorage();
    const pathReference = ref(storage, "images/stars.jpg");
  }
  return null;
  //get profile pic??
  //const pathReference = ref(storage, `${}`)
}

const Profile = () => {
  const profile = useLoaderData();
  const [profileImage, setImage] = useState(null);

  async function getProfileImage() {
    if (profile) {
      const storage = getStorage();
      const pathRef = ref(storage, `${profile.username}`);
      const imgBlob = await getBlob(pathRef);
      const img = new Image();
      img.src = URL.createObjectURL(imgBlob);
      setImage(URL.createObjectURL(imgBlob));
    }
  }

  useEffect(() => {
    getProfileImage();
    scroll({top: 0})
  }, []);
  if (profile) {
    return (
      <main className="relative flex flex-col items-center justify-center w-full pt-24">
        <div className="absolute -top-36">
          <img src={profileImage} alt="profile pic"  className="rounded-full"/>
        </div>
        <div className="mt-32 grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 outline-none transition duration-300 ease-in-out">
          <h2 className="text-6xl font-extralight col-span-3">
            {profile.fullName}
          </h2>
        </div>
        
        <div className="w-80 mb-12 mt-8">
          <h3 className="text-6xl font-extralight col-span-3">Bio</h3>
          <p>{profile.bio}</p>
        </div>
        {(profile.twitter || profile.instagram || profile.dribble) && (
          <h3 className="text-3xl font-extralight mb-6">Follow</h3>
        )}
        {profile.twitter && (
          <div className="grid grid-cols-6 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <TwitterIcon />
            </label>
            <h2 className="text-2xl font-extralight col-span
            5">
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
          <div className="grid grid-cols-6 gap-2 border-2 w-80 mb-12 p-2  outline-none hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <InstagramIcon />
            </label>
            <h2 className="text-2xl font-extralight col-span-5">
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
          <div className="grid grid-cols-6 gap-2 border-2 w-80 mb-12 p-2  outline-none hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center">
              <Dribble />
            </label>
            <h2 className="text-2xl font-extralight col-span-5">
              <a
                href={`https://dribbble.com/${profile.dribble}`}
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
          <div className="grid grid-cols-6 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center h-10 col-span-2">
              <CashAppLogo />
            </label>
            <h2 className="text-2xl font-extralight col-span-4">
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
          <div className="grid grid-cols-6 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center h-10 col-span-2">
              <PaypalLogo />
            </label>
            <h2 className="text-2xl font-extralight  col-span-4">
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
          <div className="grid grid-cols-6 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
            <label className="flex justify-start items-center h-10 col-span-2">
              <VenmoLogo />
            </label>
            <h2 className="text-2xl font-extralight col-span-4">
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

export default Profile;
