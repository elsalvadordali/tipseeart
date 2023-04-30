import { Link } from 'react-router-dom'
import { useState } from 'react'

import { loginRequest } from './util/crudOperations'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (password.length === '') return
    if (username.length === '') return
    const formData = new FormData()
    // formData.append('grant_type', '')
    formData.append('username', username)
    formData.append('password', password)
    // formData.append('scope', '')
    // formData.append('client_id', '')
    // formData.append('client_secret', '')
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`)
    }
    loginRequest(formData)
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-extralight text-6xl mb-12'>Login</h1>
      <form className='flex flex-col w-5/6 lg:w-1/3' method='post'>
        <label htmlFor='username' className='mt-4 text-xl font-medium'>
          Email
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password' className='mt-4 text-xl font-medium'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type='submit'
          className='border-2 border-gray-200 py-2 px-4 outline-none active:border-grey-600 mt-6 tracking-wider uppercase text-xl hover:border-gray-700'
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
      <Link to={'/register'} className='mt-4 text-xl font-normal underline'>
        Need an account?
      </Link>
    </div>
  )
}

export default Login
