import { useState } from "react";
import { useRouteError, Navigate } from "react-router-dom";

export default function Error() {
    const [clicked, setClicked] = useState(false);
    const error = useRouteError();
    
    if (clicked) return <Navigate to="/" />;
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-extralight text-6xl mb-12">Error</h1>
            <p className="text-2xl">{error?.status}</p>
            <p>{error?.statusText || error?.message}</p>
            <button
          className='p-4 bg-[#222222] font-extralight mt-4 text-xl text-white uppercase tracking-wider hover:bg-indigo-700 transition duration-300 ease-in-out'
          onClick={() => setClicked(true)}
        >Go to the homepage</button>
        </div>
    )
}