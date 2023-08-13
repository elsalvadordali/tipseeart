import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { submitForm } from '../util/crudOperations'
import SuccessToast from '../components/SuccessToast'


const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState({})
  const [formCompleted, setFormCompleted] = useState(false)
  const navigate = useNavigate()
  const isAuthenticated = sessionStorage.getItem('token') ? true : false

  // Redirects authenticated user from login page.
  useEffect(() => {
    if (isAuthenticated === true && formCompleted === false) {
      return navigate('/')
    }
  }, [isAuthenticated, navigate, formCompleted])

  async function handleSubmit(e) {
    e.preventDefault()
    if (email.includes('@') === false || email.includes('.') === false)
      return setError({ email: 'Email must be valid' })
    if (password.length < 8) return setError({ password: 'Password must be at least 8 characters' })
    if (password !== password2) return setError({ password2: 'Passwords do not match' })

    const userRegistration = {
      email,
      password,
    }
    await submitForm(userRegistration)
    setFormCompleted((prev) => !prev)
   //await new Promise((resolve) => setTimeout(resolve, 500))
    //navigate('/create-profile')

    
  }

  return (
    <div className='flex flex-col items-center justify-center py-6 relative'>
      {formCompleted && <SuccessToast toastType={'register'} />}
      <h1 className='font-extralight text-6xl mb-6'>Register</h1>
      <form className='flex flex-col w-1/2 sm:max-w-xs lg:max-w-md'>
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
