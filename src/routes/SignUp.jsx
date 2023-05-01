import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { submitForm } from '../util/crudOperations'
import SuccessToast from '../components/SuccessToast'
import { useIsAuthenticated } from 'react-auth-kit'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState({})
  const [formCompleted, setFormCompleted] = useState(false)
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  // Redirects authenticated user from login page.
  useEffect(() => {
    if (isAuthenticated()) {
      return navigate('/')
    }
  }, [isAuthenticated, navigate])
  function clearForm() {
    setUsername('')
    setEmail('')
    setPassword('')
    setPassword2('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (username.length < 3) return setError({ username: 'Username must be at least 3 characters' })
    if (email.includes('@') === false || email.includes('.') === false)
      return setError({ email: 'Email must be valid' })
    if (password.length < 8) return setError({ password: 'Password must be at least 8 characters' })
    if (password !== password2) return setError({ password2: 'Passwords do not match' })

    const userRegistration = {
      username,
      email,
      password,
    }
    submitForm(userRegistration)
    setFormCompleted((prev) => !prev)
    clearForm()
    await new Promise((r) => setTimeout(r, 3000))
    await navigate('/create-profile')
  }

  return (
    <div className='flex flex-col items-center justify-center py-6 relative'>
      {formCompleted && <SuccessToast />}
      <h1 className='font-extralight text-6xl mb-6'>Register</h1>
      <form className='flex flex-col w-1/2 sm:max-w-xs lg:max-w-md'>
        <label htmlFor='username' className='text-xl font-medium mb-2'>
          Username
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700 rounded-lg'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className='text-red-600'>{error?.username}</p>

        <label htmlFor='email' className='mt-4 text-xl font-medium mb-2'>
          Email
        </label>
        <input
          type='text'
          name='email'
          id='email'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700 rounded-lg'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='text-red-600'>{error?.email}</p>

        <label htmlFor='password' className='mt-4 text-xl font-medium mb-2'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700 rounded-lg'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='text-red-600'>{error?.password}</p>

        <label htmlFor='password2' className='mt-4 text-xl font-medium mb-2'>
          Confirm Password
        </label>
        <input
          type='password'
          name='password2'
          id='password2'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700 rounded-lg'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <p className='text-red-600'>{error?.password2}</p>

        <button
          type='submit'
          className='border-2 border-gray-200 py-2 px-4 outline-none active:border-grey-600 mt-6 tracking-wider uppercase text-xl hover:border-gray-700 rounded-lg w-32 mx-auto'
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
      <Link to={'/login'} className='mt-4 text-xl font-normal underline'>
        Already registered?
      </Link>
    </div>
  )
}

export default SignUp
