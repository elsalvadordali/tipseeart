

export default Header = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="font-extralight text-6xl mb-12">HELLO</h1>

            <Link to={'/register'} className="mt-4 text-xl font-normal underline">Need an account?</Link>
        </div>
    )
}