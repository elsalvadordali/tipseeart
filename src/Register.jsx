import { useState } from 'react'
import { submitForm } from './util/crudOperations'
const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  // const [errors, setErrors] = []

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== password2) return
    if (password.length < 5) return
    if (username.length < 3) return
    const userRegistration = {
      username,
      email,
      password,
    }
    submitForm(userRegistration)
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
        <button
          type='submit'
          className='border-2 border-gray-200 py-2 px-4 outline-none active:border-grey-600 mt-6 tracking-wider uppercase text-xl hover:border-gray-700'
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
