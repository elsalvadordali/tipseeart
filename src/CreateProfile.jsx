import { useState, useEffect, useRef } from "react"
import Dropdown from "./components/Dropdown"
import Socials from "./components/Socials"
import { confirmToken } from './util/crudOperations'

const SOCIAL_MEDIA = [
    { name: 'Twitter', url: '', set: false },
    { name: 'Facebook', url: '', set: false },
    { name: 'Youtube', url: '', set: false },
    { name: 'Instagram', url: '', set: false },
    { name: 'LinkedIn', url: '', set: false },
    { name: 'Bandcamp', url: '', set: false },
    { name: 'Soundcloud', url: '', set: false },
    { name: 'Spotify', url: '', set: false },
    { name: 'Portfolio', url: '', set: false },
    { name: 'TikTok', url: '', set: false },
    { name: 'Etsy', url: '', set: false },
    { name: 'Twitch', url: '', set: false },
    { name: 'Reddit', url: '', set: false },
    { name: 'Pinterest', url: '', set: false },
    { name: 'Other', url: '', set: false },
    { name: 'close' }
]
const PAYMENT_LINKS = [
    { name: 'Venmo', url: '', set: false },
    { name: 'Paypal', url: '', set: false },
    { name: 'CashApp', url: '', set: false },
    { name: 'Other', url: '', set: false },
    { name: 'close' }

]

const CreateProfile = () => {
    const token = sessionStorage.getItem('token')
    const [artistsSM, setArtistsSM] = useState(SOCIAL_MEDIA)
    const [artistsPayment, setArtistsPayment] = useState(PAYMENT_LINKS)
    const [bio, setBio] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        //let res = confirmToken(token)
    }, [])

    useEffect(() => {
        if (profilePicture) {
            setImage(URL.createObjectURL(profilePicture))
        } else {
            setImage(null)
        }
    }, [profilePicture])
    console.log(profilePicture)

    return (
        <div className="flex items-center justify-center w-full">
            <form className="flex flex-col items-start m-6 sm:w-96" onSubmit={submitForm}>
                <h1 className="font-extralight text-6xl mb-12">Create Profile</h1>
                <h2 className="text-2xl font-extralight mb-2">1. Profile Picture</h2>
                <label htmlFor='profilePicture' className="w-80 border-2 p-12 text-center bg-gray-200 border-gray-600 mb-12">click or drag here</label>
                <input
                    id='profilePicture'
                    type='file'
                    accept='image/*'
                    className="hidden"
                    onChange={e => setProfilePicture(e.target.files[0])}
                />
                {image && <div className="relative"><img src={image} alt='uploading' /><button className="absolute top-0 right-0 px-4 text-xl text-red-600" onClick={() => setProfilePicture(null)}>×</button></div>}

                <h2 className="text-2xl font-extralight mb-2">2. Bio</h2>
                <textarea
                    className="border-2 w-80 p-2 h-36 focus:border-gray-600 outline-none hover:border-indigo-700 transition duration-300 ease-in-out"
                    placeholder="I grew up in... I draw my inspiration from..."
                    onChange={e => setBio(e.target.value)}
                    value={bio}
                />
                <p className="mb-12">*240 characters max</p>
                <div className="flex flex-col items-start mb-12 w-full">
                    <h2 className="text-2xl font-extralight mb-2">3. Add your handle below</h2>
                    <h3 className="text-l mb-4">(Full url for portfolios/other)</h3>
                    <Dropdown list={artistsSM} toggleInput={toggleSocialInput} displayName="Add Social Media" />
                    <div className="flex flex-col items-center w-full">
                        {artistsSM.map((item, index) => {
                            if (item.set) return <div key={item.name} className="flex flex-row justify-between items-center mb-4 w-full"><Socials name={item.name} updateHandle={updateSocialHandle} toggleInput={toggleSocialInput} /></div>
                        })}
                    </div>
                </div>

                <div className="flex flex-col items-start mb-12 w-full">
                    <h2 className="text-2xl font-extralight mb-2">4. Add your tip jar</h2>
                    <Dropdown list={artistsPayment} toggleInput={toggleFundsInput} displayName="Add tipping Options" />
                    <div className="flex flex-col items-center w-full">
                        {artistsPayment.map((item) => {
                            if (item.set) return <div key={item.name} className="flex flex-row justify-between items-center mb-4 w-full"><Socials name={item.name} updateHandle={updateFinancialHandle} toggleInput={toggleFundsInput} /></div>
                        })}
                    </div>
                </div>
                <button className="py-4 px-6 bg-[#222222] text-white uppercase tracking-wider font-normal hover:bg-indigo-700 transition duration-300 ease-in-out">upload gallery</button>
            </form>
        </div>
    )

    function toggleSocialInput(socialMediaName) {
        const updatedList = artistsSM.map(item => {
            if (item.name === socialMediaName) {
                if (item.set) item.url = ''
                item.set = !item.set
            }
            return item
        })
        setArtistsSM(updatedList)
    }
    function toggleFundsInput(bankName) {
        const updatedList = artistsPayment.map(item => {
            if (item.name === bankName) {
                if (item.set) item.url = ''
                item.set = !item.set
            }
            return item
        })
        setArtistsPayment(updatedList)
    }

    function updateSocialHandle(socialMediaName, handle) {
        const updatedList = artistsSM.map(item => {
            if (item.name === socialMediaName) {
                if (handle[0] === '@') item.url = handle.substring(1)
                else item.url = handle
            }
            return item
        })
        setArtistsSM(updatedList)
    }
    function updateFinancialHandle(bankName, handle) {
        const updatedList = artistsPayment.map(item => {
            if (item.name === bankName) {
                if (handle[0] === '@') item.url = handle.substring(1)
                else item.url = handle
            }
            return item
        })
        setArtistsPayment(updatedList)
    }
    async function submitForm(e) {
        e.preventDefault()
        console.log('hello?')
        if (bio.length > 255) return
        try {
            const response = await fetch('https://tipseeart.fly.dev/artists/create', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: bio }),
            })

            if (!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            const data = await response.json()
            console.log(data)
            //const token = data.access_token
            //sessionStorage.setItem('token', token)
        } catch (error) {
            console.log(`Error: ${error}`)
        }

    }
}

export default CreateProfile