
function signOut() {
  localStorage.clear()
}

const LogoutComponent = () => {

  return (
    <button
      className='border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-black md:text-white'
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  )
}

export default LogoutComponent
