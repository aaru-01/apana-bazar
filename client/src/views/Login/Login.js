import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../../components/Navbar/Navbar'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const login = async () => {
    const response = await axios.post('/login', {
      email: email,
      password: password
    });

    alert(response?.data?.message);

    if (response?.data?.success) {
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      window.location.href = "/";
    }

  }

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
    if (storageUser?.email) {
      alert("You are already logged in!");
      window.location.href = "/";
    }
  }, [])

  return (
    <div>
      <Navbar />
      <form className='login-form'>
        <h1 className='text-center'>Login</h1>

        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' placeholder='Enter Your Email' id='email' className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder='Enter Your Password' id='password' className='form-control' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button type='button' className='btn login-btn ' onClick={login}>Login</button>

        <p className="text-right">
          <Link to="/signup">Create a new account?</Link>
        </p>


      </form>
    </div>
  )
}

export default Login
