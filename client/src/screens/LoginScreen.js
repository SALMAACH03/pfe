import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Success from '../component/Success';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function login() {
    const user = {
      email,
      password
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      setLoading(false);
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      window.location.href = '/home';
     if( JSON.parse(localStorage.getItem("currentUser")).isAdmin){ 
      window.location.href = '/admin';
     }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {error && <Error message='Invalid credentials' />}
          <div className='bs'>
            <h2>Login</h2>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn btn-primary mt-3' onClick={login}>
              Login
            </button>
            <a href='/register' style={{color:'black' ,margin:'10px'}}>you don't have the account?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
