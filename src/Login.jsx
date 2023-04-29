import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="font-extralight text-6xl mb-12">Login</h1>

            <form className="flex flex-col w-5/6 lg:w-1/3">
                <label htmlFor="email" className="mt-4 text-xl font-medium">Email</label>
                <input
                    type="text"
                    name="email" id="email"
                    className="border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700"
                />
                <label htmlFor="password" className="mt-4 text-xl font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700"
                />

                <button
                    type="submit"
                    className="border-2 border-gray-200 py-2 px-4 outline-none active:border-grey-600 mt-6 tracking-wider uppercase text-xl hover:border-gray-700"

                >Login</button>
            </form>
            <Link to={'/register'} className="mt-4 text-xl font-normal underline">Need an account?</Link>
        </div>
    )
}

export default Login