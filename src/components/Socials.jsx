import { useState } from 'react'

const Socials = ({ name, updateHandle, toggleInput }) => {
    const [handle, setHandle] = useState('')
    return (
        <>
            <label htmlFor={name} className="ml-2 mr-2 text-xl w-20 text-left font-medium">{name}</label>
            <input
                type="text"
                name={name} id={name}
                className="border-2 border-gray-200 py-2 px-4 w-42 outline-none focus:border-gray-700"
                value={handle}
                placeholder={`username`}
                onChange={e => setHandle(e.target.value)}
                onBlur={e => updateHandle(name, handle)}
            />
            <button className='text-3xl ml-6' onClick={() => toggleInput(name)}>×</button>
        </>
    )
}

export default Socials