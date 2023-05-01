import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'

const Login = () => {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })

  async function onSubmit(e) {
    e.preventDefault()
    const response = await axios.post('https://tipseeart.fly.dev/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response.status === 200) {
      if (
        signIn({
          token: response.data.access_token,
          tokenType: 'bearer',
          expiresIn: 30000, // Needs added to api end points. Hardcoded in the meantime due to being a required value.
          // authState: response.data.authState, // Not currently available from our api end points.
          // refreshToken: response.data.refreshToken, // Only if you are using refreshToken feature
          // refreshTokenExpireIn: response.data.refreshTokenExpireIn, // Only if you are using refreshToken feature
        })
      ) {
        navigate('/profile')
      } else {
        console.log(`Error: ${response}`)
      }
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-extralight text-6xl mb-12'>Login</h1>
      <form className='flex flex-col w-5/6 lg:w-1/3' onSubmit={onSubmit}>
        <label htmlFor='username' className='mt-4 text-xl font-medium'>
          Email
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <label htmlFor='password' className='mt-4 text-xl font-medium'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700'
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button
          type='submit'
          className='border-2 border-gray-200 py-2 px-4 outline-none active:border-grey-600 mt-6 tracking-wider uppercase text-xl hover:border-gray-700'
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
