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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Navigate, redirect, useLoaderData } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export async function loader() {
  const isAuthenticated = sessionStorage.getItem("token") ? true : false;
  if (!isAuthenticated) return redirect("/");

  const uid = localStorage.getItem("uid");
  const docRef = doc(db, "artists", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

const Profile = () => {
  const data = useLoaderData();
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({});
  const [profile, setProfile] = useState([]);
  const [gallery, setGallery] = useState([]);


  useEffect(() => {
    if (!data) {
      setProfile({
        description: "write your description here",
        user: {
          username: "chose a unique username",
        },
        profile_pic_url: "",
        socials: [
          { name: "twitter", url: "https://twitter.com" },
          { name: "instagram", url: "https://instagram.com" },
          { name: "facebook", url: "https://facebook.com" },
        ],
        payment: [
          { name: "cashapp", url: "https://cash.app" },
          { name: "paypal", url: "https://paypal.com" },
          { name: "venmo", url: "https://venmo.com" },
        ],
        gallery: [],
      });
    } else {
      setProfile(data);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    const storage = getStorage();
    const storageRef = ref(storage, "images");

    if (uid) {
      await setDoc(doc(db, "artists", uid), formData);
      uploadBytes(storageRef, profile).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    }
  }
  console.log(profilePic);

  return (
    <div className="">
      <main className="relative space-y-20 h-screen px-10">
        <form className="border-2 border-black w-100" onSubmit={handleSubmit}>
          <header className="bg-[#222222] opacity-90 min-h-[360px] flex justify-center mb-56">
            <div
              id="profile-pic"
              style={{
                backgroundSize: "cover",
                hover: {
                  opacity: 0.5,
                },
              }}
              className=" h-72 w-72 rounded-full bg-[#D9D9D9] relative top-[216px] transition duration-300 ease-in flex items-center justify-center"
            >
              <img
                alt="profile picture"
                src={profilePic ? URL.createObjectURL(profilePic) : ''}
              />
              <label htmlFor="profilePicture" className="p-12 m-12">
                Profile pic
              </label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                className="hidden"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
          </header>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="flex flex-row gap-3 justify-between items-center">
                <label htmlFor="username">Username (if none set)</label>
                <input
                  id="username"
                  type="text"
                  autoComplete="off"
                  className="border-2 border-black p-2 outline-none hover:border-emerald-400 focus:border-cyan-400 ease-in-out"
                  placeholder="cbus-artist"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                ></input>
              </div>
              <div>
                <h2 className="text-2xl">Social Media Handles</h2>
                <p>JUST the handle</p>

                <div className="flex flex-row gap-3 mb-3 justify-between items-center">
                  <label htmlFor="twitter" className="flex flex-row gap-1">
                    Twitter <TwitterIcon />
                  </label>
                  <input
                    id="twitter"
                    name="twitter"
                    className="border-2 border-black p-2 outline-none hover:border-emerald-400 focus:border-cyan-400 ease-in-out"
                    placeholder={
                      data && data.twitter ? data.twitter : "monet__x"
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        twitter: e.target.value.trim(),
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-row gap-3 mb-3 justify-between items-center">
                  <label htmlFor="instagram" className="flex flex-row gap-1">
                    Instagram <InstagramIcon />
                  </label>
                  <input
                    id="instagram"
                    name="instagram"
                    className="border-2 border-black p-2  outline-none hover:border-emerald-400 focus:border-cyan-400 ease-in-out"
                    placeholder={
                      data && data.instagram ? data.instagram : "@oh-keefe"
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        instagram: e.target.value.trim(),
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-row gap-3 mb-3 justify-between items-center">
                  <label htmlFor="website" className="flex flex-row gap-1">
                    Website <LinkIcon />
                  </label>
                  <input
                    id="website"
                    name="website"
                    className="border-2 border-black p-2 outline-none hover:border-emerald-400 focus:border-cyan-400 ease-in-out"
                    placeholder={
                      data && data.website ? data.website : "bobrossa.rt"
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        website: e.target.value.trim(),
                      })
                    }
                  ></input>
                </div>
              </div>

              <div>
                <h2 className="text-2xl">Tip Links</h2>
                <p>Again, just the handle</p>
                <div className="flex flex-row gap-3 mb-3 justify-between items-center">
                  <label
                    htmlFor="cashapp"
                    className="flex flex-row gap-1 items-center"
                  >
                    Cashapp <CashAppLogo />
                  </label>
                  <input
                    id="cashapp"
                    name="cashapp"
                    className="border-2 border-black p-2 outline-none hover:border-emerald-400 focus:border-cyan-400 ease-in-out"
                    placeholder={data && data.cashapp ? data.cashapp : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cashapp: e.target.value.trim(),
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-row gap-3 mb-3 justify-between items-center">
                  <label
                    htmlFor="paypal"
                    className={`flex flex-row gap-1 items-center bg-[url(${profilePic})]`}
                  >
                    Paypal <PaypalLogo />
                  </label>
                  <input
                    id="paypal"
                    name="paypal"
                    className="border-2 border-black p-2 outline-none hover:border-emerald-400 focus:border-cyan-400 ease-in-out"
                    placeholder={data && data.paypal ? data.paypal : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paypal: e.target.value.trim(),
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-row gap-3 mb-3 justify-between items-center">
                  <label
                    htmlFor="venmo"
                    className="flex flex-row gap-1 items-center"
                  >
                    Venmo <VenmoLogo />
                  </label>
                  <input
                    id="venmo"
                    name="venmo"
                    className="border-2 border-black p-2 outline-none hover:border-emerald-400 focus:border-cyan-400 ease-in-out"
                    placeholder={data && data.venmo ? data.venmo : ""}
                    onChange={(e) =>
                      setFormData({ ...formData, venmo: e.target.value.trim() })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex flex-col">
                <h2>Gallery</h2>
                <div>
                  <label
                    className=" border-2 border-black p-12 box-content m-12 w-96"
                    htmlFor="gallery"
                  >
                    Drag and drop your artwork here
                  </label>

                  <input
                    id="gallery"
                    name="gallery"
                    type="file"
                    className="hidden"
                    accept="jpg,jpeg,apng,png,gif,svg,webp"
                    multiple
                    onChange={(e) =>
                      setGallery([...gallery, ...e.target.files])
                    }
                  ></input>
                </div>
              </div>
              <button>{data ? "Update profile" : "Create profile"}</button>
            </div>
          </div>
        </form>
        <div className="space-y-8 max-w-xl lg:max-w-4xl mx-auto">
          <h2 className="text-4xl font-extralight text-center">
            {profile?.user?.username}
          </h2>

          <ul className="flex justify-center gap-4">
            {profile?.socials?.map((social, index) => {
              return (
                <li key={index} className="relative">
                  <a
                    href={social.url}
                    className="flex justify-center gap-1 py-0 p-6 hover:text-indigo-600  transition duration-300 ease-in-out"
                  >
                    {social.name === "twitter" && <TwitterIcon />}
                    {social.name === "instagram" && <InstagramIcon />}
                    {social.name !== "twitter" &&
                      social.name !== "instagram" && <LinkIcon />}
                    {social.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-center">{profile.description}</p>
          <div className="flex justify-center">
            <ul className="flex gap-9">
              {profile?.payment?.map((p, i) => {
                return (
                  <li
                    key={p.name}
                    className="w-[72px] h-[72px] rounded-full overflow-hidden"
                  >
                    <a href={p.url}>
                      {p.name === "cashapp" && <CashAppLogo />}
                      {p.name === "paypal" && <PaypalLogo />}
                      {p.name === "venmo" && <VenmoLogo />}
                      {p.name !== "cashApp" &&
                        p.name !== "paypal" &&
                        p.name !== "venmo" && <LinkIcon />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <h2 className="text-6xl text-extralight">Gallery</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {profile?.gallery?.map((art, index) => {
            return (
              <a href={"/" + art.url} key={`artist-${index}`}>
                <img src={"/" + art.url} alt={art.name} />
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Profile;
