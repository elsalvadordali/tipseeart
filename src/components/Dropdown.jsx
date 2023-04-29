import { useState } from 'react'

const Dropdown = ({ list, toggleInput, displayName }) => {
    const [openList, setOpenList] = useState(false)
    return (
        <div
            name='socialMedia'
            id='socialMedia'
            onChange={e => addLinkInput(e.target.value)}
            className='border-2 flex flex-col items-stretch mb-6 w-80'
        >
            {openList ?
                list.map((item, index) => {
                    if (!item.set) {
                        if (item.name === 'close') return <button className='p-4 bg-gray-200 uppercase tracking-wider border-b-2 last:border-0 text-left' key={index} onClick={() => setOpenList(!openList)}>{item.name} <span className='text-xl ml-4'>🞁</span></button>
                        return <button className='p-4 border-b-2 last:border-0 text-left' key={index} onClick={() => toggleInput(item.name)}>{item.name}</button>
                    }
                })
                : <button className="p-4 bg-[#222222] font-extralight text-xl text-white uppercase tracking-wider" onClick={() => setOpenList(!openList)}>{displayName} <span className='text-xl ml-4'> 🞃</span></button>
            }
        </div>
    )
}

export default Dropdown