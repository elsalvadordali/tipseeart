import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
<<<<<<< HEAD:src/routes/Register.jsx
import { submitForm } from '../util/crudOperations'
=======
import { submitForm } from './util/crudOperations'
>>>>>>> main:src/Register.jsx

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState({})

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (username.length < 3) return setError({ username: 'Username must be at least 3 characters' })
<<<<<<< HEAD:src/routes/Register.jsx
    if (email.includes('@') === false || email.includes('.') === false)
      return setError({ email: 'Email must be valid' })
=======
    if (email.includes('@') === false || email.includes('.') === false) return setError({ email: 'Email must be valid' })
>>>>>>> main:src/Register.jsx
    if (password.length < 8) return setError({ password: 'Password must be at least 8 characters' })
    if (password !== password2) return setError({ password2: 'Passwords do not match' })

    const userRegistration = {
      username,
      email,
      password,
    }
    submitForm(userRegistration)
    navigate('/create-profile')
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-extralight text-6xl mb-12'>Register</h1>
      <form className='flex flex-col w-5/6 lg:w-1/3'>
        <label htmlFor='username' className='mt-4 text-xl font-medium'>
          Username
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className='text-red-600'>{error?.username}</p>

        <label htmlFor='email' className='mt-4 text-xl font-medium'>
          Email
        </label>
        <input
          type='text'
          name='email'
          id='email'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='text-red-600'>{error?.email}</p>

        <label htmlFor='password' className='mt-4 text-xl font-medium'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='text-red-600'>{error?.password}</p>

        <label htmlFor='password2' className='mt-4 text-xl font-medium'>
          Confirm Password
        </label>
        <input
          type='password'
          name='password2'
          id='password2'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <p className='text-red-600'>{error?.password2}</p>

        <button
          type='submit'
          className='border-2 border-gray-200 py-2 px-4 outline-none active:border-grey-600 mt-6 tracking-wider uppercase text-xl hover:border-gray-700'
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

export default Register
