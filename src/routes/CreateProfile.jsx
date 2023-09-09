import { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { uploadBytes, ref, getStorage } from "firebase/storage";
import { useLoaderData, Navigate } from "react-router-dom";

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
    return docSnap.data();
 } else return mock_profile
}

const CreateProfile = () => {
  const oldProfile = useLoaderData();
  const [formCompleted, setFormCompleted] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profile, setProfile] = useState({
    bio: "",
    username: oldProfile.username,
    fullName: "",
    profile_pic_last_modified: null,
    twitter: "",
    instagram: "",
    dribble: "",
    portfolio: "",
    cashapp: "",
    paypal: "",
    venmo: "",
    gallery: [],
  });

  async function submitForm(e, profile, oldProfile) {
    e.preventDefault();
    if (profile.username.length == 0) return;
    const uid = localStorage.getItem("uid");
    if (!profile.bio) profile.bio = oldProfile.bio;
    if (!profile.fullName) profile.fullName = oldProfile.fullName;
    if (!profile.profile_pic_url)
      profile.profile_pic_url = oldProfile.profile_pic_url;
    if (!profile.twitter) profile.twitter = oldProfile.twitter;
    if (!profile.instagram) profile.instagram = oldProfile.instagram;
    if (!profile.dribble) profile.dribble = oldProfile.dribble;
    if (!profile.portfolio) profile.portfolio = oldProfile.portfolio;
    if (!profile.cashapp) profile.cashapp = oldProfile.cashapp;
    if (!profile.paypal) profile.paypal = oldProfile.paypal;
    if (!profile.venmo) profile.venmo = oldProfile.venmo;
    if (!profile.gallery) profile.gallery = oldProfile.gallery;

    if (profile.twitter[0] == "@")
      profile.twitter = profile.twitter.substring(1);
    if (profile.instagram[0] == "@")
      profile.instagram = profile.instagram.substring(1);
    if (profile.dribble[0] == "@")
      profile.dribble = profile.dribble.substring(1);

    if (profile.cashapp[0] == "@")
      profile.cashapp = profile.cashapp.substring(1);
    if (profile.paypal[0] == "@") profile.paypal = profile.paypal.substring(1);
    if (profile.venmo[0] == "@") profile.venmo = profile.venmo.substring(1);

    if (uid) {
      await setDoc(doc(db, "artists", uid), profile)
        .then(() => setFormCompleted(true))
        .catch((err) => console.log("ERROR: ", err));
        
    }
  }

  function resize(file) {
    const img = new Image();
    img.alt = "profile image";
    img.src = URL.createObjectURL(file);

    img.onload = function () {
      const canvas = document.getElementById("canvas");
      const scale =
        Math.min(img.width, img.height) == img.width
          ? img.width / 316
          : img.height / 316;
      const size = { width: img.width / scale, height: img.height / scale };
      const position = {
        x: (316 - size.width) / 2,
        y: (316 - size.height) / 2,
      };
      canvas
        .getContext("2d")
        .drawImage(img, position.x, position.y, size.width, size.height);
      canvas.toBlob((blob) => {
        const storage = getStorage();
        const imgRef = ref(storage, profile.username);
        const blobToFile = new File(
          [blob],
          `${profile.username}.png`,
          { type: "image/png" },
          "image/png"
        );
        uploadBytes(imgRef, blobToFile);
      });
      setProfile((prev) => ({
        ...prev,
        profile_pic_last_modified: new Date().valueOf(),
      }));
    };
  }

  useEffect(() => {
    if (profile.profile_pic_last_modified > new Date().valueOf() - 1000) return;
    if (profilePicture && profile.username) resize(profilePicture);
  }, [profilePicture, profile.username]);

  if (formCompleted) return <Navigate to="/auth/profile" replace={true} />;

  return (
    <div className="flex items-center justify-center w-full">
      <form
        className="flex flex-col items-start m-6 sm:w-96"
        onSubmit={(e) => submitForm(e, profile, oldProfile)}
      >
        <h1 className="font-extralight text-6xl mb-12">Edit Profile</h1>
        <h2 className="text-2xl font-extralight mb-2">0. Name</h2>
        <label htmlFor="fullName">Your stage name, as it were</label>
        <input
          className="border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out"
          type="text"
          id="fullName"
          name="fullName"
          autoComplete="true"
          value={profile.fullName}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, fullName: e.target.value }))
          }
          placeholder={oldProfile.fullName}
        />
        <h2 className="text-2xl font-extralight mb-2">1. Username</h2>
        <label htmlFor="username">Used for display</label>
        <input
          className={`${
            oldProfile.username.length == 0 && profile.username.length == 0
              ? "border-rose-600 "
              : "mb-12"
          } border-2 w-80 ${
            oldProfile.username.length == 0
              ? "hover:border-indigo-700"
              : "border-slate-400 "
          } p-2 focus:border-gray-600 outline-none transition duration-300 ease-in-out`}
          type="text"
          id="username"
          name="username"
          autoComplete="true"
          value={profile.username}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, username: e.target.value }))
          }
          placeholder={oldProfile.username}
          disabled={oldProfile.username ? true : false}
        />
        {oldProfile.username.length == 0 && profile.username.length == 0 && (
          <p className="mb-10 text-rose-600 ">*Required field</p>
        )}
        <p>{profile.username.length < 4}</p>
        <h2 className="text-2xl font-extralight mb-2 flex justify-center items-center ">
          2. Profile Picture
        </h2>
        <div
          id="mom"
          className="h-80 w-80 border-2 p-12 relative text-center border-gray-600 mb-12 flex justify-center items-center"
        >
          <canvas
            id="canvas"
            className="absolute top-0 left-0 z-10"
            width="316"
            height="316"
            style={{ background: "#D5DBE4" }}
          />

          <label htmlFor="profilePicture" className="z-20">
            {profile.profile_pic_last_modified
              ? "click or drag to update"
              : "click or drag here"}
          </label>
        </div>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <h2 className="text-2xl font-extralight mb-2">
          2. Bio <span className="text-red-600">(required)</span>
        </h2>
        <textarea
          className="border-2 w-80 p-2 h-36 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out"
          placeholder={oldProfile.bio}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, bio: e.target.value }))
          }
          value={profile.bio}
        />
        <p className="mb-12">*240 characters max</p>
        <div className="flex flex-col items-start mb-12 w-full">
          <h2 className="text-2xl font-extralight mb-2">
            3. Add your handle below
          </h2>
          <h3 className="text-l mb-4">
            (handle for social media, full url for portfolio)
          </h3>
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out">
            <label
              htmlFor="twitter"
              className="w-12 pl-2 flex justify-start items-center"
            >
              Twitter
            </label>
            <input
              id="twitter"
              name="twitter"
              type="text"
              className="col-span-2 outline-none"
              placeholder={oldProfile ? oldProfile.twitter : "@"}
              value={profile.twitter}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, twitter: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out">
            <label
              htmlFor="twitter"
              className="w-12 pl-2 flex justify-start items-center"
            >
              Instagram
            </label>
            <input
              id="insta"
              name="insta"
              type="text"
              className="col-span-2 outline-none"
              placeholder={oldProfile ? oldProfile.instagram : "@"}
              value={profile.instagram}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, instagram: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out">
            <label
              htmlFor="dribble"
              className="w-12 pl-2 flex justify-start items-center"
            >
              dribble
            </label>
            <input
              id="dribble"
              name="dribble"
              type="text"
              className="col-span-2 outline-none"
              placeholder={oldProfile ? oldProfile.dribble : ""}
              value={profile.dribble}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, dribble: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out">
            <label
              htmlFor="portfolio"
              className="w-12 pl-2 flex justify-start items-center"
            >
              Portfolio
            </label>
            <input
              id="portfolio"
              name="portfolio"
              type="text"
              className="col-span-2 outline-none"
              placeholder={oldProfile ? oldProfile.portfolio : "https://"}
              value={profile.portfolio}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, portfolio: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex flex-col items-start mb-12 w-full">
          <h2 className="text-2xl font-extralight mb-2">4. Add your tip jar</h2>
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out">
            <label
              htmlFor="cashapp"
              className="w-12 pl-2 flex justify-start items-center"
            >
              Cashapp
            </label>
            <input
              id="cashapp"
              name="cashapp"
              type="text"
              className="col-span-2 outline-none"
              placeholder={oldProfile ? oldProfile.cashapp : ""}
              value={profile.cashapp}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, cashapp: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out">
            <label
              htmlFor="paypal"
              className="w-12 pl-2 flex justify-start items-center"
            >
              Paypal
            </label>
            <input
              id="paypal"
              name="paypal"
              type="text"
              className="col-span-2 outline-none"
              placeholder={oldProfile ? oldProfile.paypal : ""}
              value={profile.paypal}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, paypal: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-2 border-2 w-80 mb-12 p-2 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out">
            <label htmlFor="venmo" className="w-12 pl-2">
              Venmo
            </label>
            <input
              id="venmo"
              name="venmo"
              type="text"
              className="col-span-2 outline-none"
              placeholder={oldProfile ? oldProfile.venmo : ""}
              value={profile.venmo}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, venmo: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col items-center w-full"></div>
        </div>
        <button className="py-4 px-6 bg-[#222222] text-white uppercase tracking-wider font-normal hover:bg-indigo-700 transition duration-300 ease-in-out">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
