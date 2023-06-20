import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Success from '../component/Success';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function register() {
    if (password === cpassword) {
      const user = { name, email, password, cpassword };
      try {
        setLoading(true);
        const response = await axios.post('/api/users/register', user);
        setLoading(false);
        setSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {success && <Success message='Registration successful' />}
          <div className='bs'>
            <h2>Register</h2>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type='password'
              className='form-control'
              placeholder='Confirm your password'
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button className='btn btn-primary mt-3' onClick={register}>
              Register
            </button>
            <a href='/login' style={{color:'black' ,margin:'10px'}}>you already have the account?</a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
