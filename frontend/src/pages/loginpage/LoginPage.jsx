import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const userData = {
      username: username,
      password: password
    }

    const response = await axios.post('https://localhost:9000/auth/login', userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      alert(`user is logged in ${data.user.username}`)
      navigate('/')
    }

    setUsername('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex items-center justify-center'>
      <div className='w-full max-w-md'>
      
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your username</h3>
          <input
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="text"
            placeholder='Enter your username'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required 
            type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
    </div>
  )
}

export default LoginPage
