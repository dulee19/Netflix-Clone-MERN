import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authUser'

const SignUp = () => {
  const { searchParams } = new URL(document.location)
  const emailValue = searchParams.get('email');

  const [formData, setFormData] = useState({
    username: '',
    email: emailValue || '',
    password: ''
  });

  const { signUp } = useAuthStore();

  const { username, email, password } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSignUp = e => {
    e.preventDefault();
    signUp({ email, username, password })
  }

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img 
            src="/netflix-logo.png" 
            alt="Logo"
            decoding="async"
            className='w-52' 
          />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
            <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

            <form className='space-y-4' onSubmit={handleSignUp}>
              <div>
                <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                  placeholder='Email'
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                  Username
                </label>
                <input 
                  type="text" 
                  name="username"
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                  placeholder='Username'
                  id="username"
                  value={username}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                  Password
                </label>
                <input 
                  type="password" 
                  name="password"
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                  placeholder='Password'
                  id="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>

              <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">Sign Up</button>
            </form>

            <div className='text-center text-gray-400'>
              Already a member?{" "}
              <Link to="/login" className='text-red-500 hover:underline'>Sign In</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SignUp