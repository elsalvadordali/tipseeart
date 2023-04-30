import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.log(error)
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-extralight text-6xl mb-12">Error</h1>
            <p className="text-2xl">{error.status}</p>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}