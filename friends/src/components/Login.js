import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
  const [credentials, setCredentials] = useState({
    username:'',
    password:'',
  });
  const [error, setError] = useState('');

  const login = () => {
    axios.post('http://localhost:5000/api/login', credentials)
      .then(res => {
        setError('');
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        props.history.push('/');
      })
      .catch(err => {
        setError(err.response.data.error)
      })
  }

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    setCredentials({ username: '', password: '' })
    login();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          value={credentials.username}
          placeholder='username'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          value={credentials.password}
          placeholder='password'
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}

export default Login
