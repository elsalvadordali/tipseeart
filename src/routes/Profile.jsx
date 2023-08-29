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
  query,
  getDoc,
  setDoc,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Navigate, redirect, useLoaderData } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function loader({ request }) {
  const path = new URL(request.url).pathname;
  console.log("PARAMS ARE", path);
  const isAuthenticated = sessionStorage.getItem("token") ? true : false;
  if (!isAuthenticated) return redirect("/");

  if (path == "/profile" || path == "/profile/") {
    const uid = localStorage.getItem("uid");
    const docRef = doc(db, "artists", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
      const storage = getStorage();
    const pathReference = ref(storage, 'images/stars.jpg');

    } else {

      //need to find userID first
      //const artistsRef = collection(db, "artists");
      //const profile = query(collection(db, "artists"), where("username", "==", ) )
    }
  }
  return null;
  //get profile pic??
  //const pathReference = ref(storage, `${}`)
}

const Profile = () => {
  const profile = useLoaderData();
  console.log("HAH", profile);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({});
  const [gallery, setGallery] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const uid = localStorage.getItem("uid");

    if (uid) {
      await setDoc(doc(db, "artists", uid), formData);
      uploadBytes(storageRef, profile).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    }
  }

  async function handleProfilePicture(e) {
    e.preventDefault();
    const picture = e.target.files[0];
    const regex = /\.\w{3,4}$/gm;
    const fileExtension = picture.name.match(regex)[0];
    if (!picture) return;
    const uid = localStorage.getItem("uid");
    const storage = getStorage();
    const storageRef = ref(storage, `profiles/${uid}${fileExtension}`);
    uploadBytes(storageRef, picture).then((snapshot) => {
      const bucket = snapshot.ref._location.bucket;
      const path = snapshot.ref._location.path_;
      const pathReference = ref(storage, path);
      getDownloadURL(ref(storage, path));
    });
  }
  console.log(profile);
  if (profile) {
    return (
      <main className="flex flex-col items-center justify-center w-full pt-8 pb-12">
        <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 outline-none transition duration-300 ease-in-out">
          <h2 className="text-6xl font-extralight col-span-3">
            {profile.fullName}
          </h2>
        </div>
        <div className="w-80">
          <p>{profile.description}</p>
        </div>
        {(profile.twitter || profile.instagram || profile.dribble) && <h3 className="text-3xl font-extralight mb-6">Follow</h3>}
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
        {(profile.cashApp || profile.paypal || profile.venmo) && <h3 className="text-3xl font-extralight mb-6">Tip</h3>}
        {profile.cashApp && <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
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
          </div>}
          {profile.paypal && <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
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
          </div>}
          {profile.venmo && <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 hover:border-indigo-400 transition duration-300 ease-in-out">
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
          </div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          <h2 className="text-4xl text-extralight">Gallery</h2>

          {profile.gallery?.map((art, index) => {
            return (
              <a href={"/" + art.url} key={`artist-${index}`}>
                <img src={"/" + art.url} alt={art.name} />
              </a>
            );
          })}
        </div>
      </main>
    );
  }
};

export default Profile;
