import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const FriendsForm = props => {
  const [formValues, setFormValues] = useState({
    name:'',
    age:'',
    email:'',
  });

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/friends', formValues)
      .then(res => {
        props.setFriends(res.data);
        setFormValues({name: '', age: '', email: ''})
      })
      .catch(err => console.log({err}))
  }

  return (
    <div>
      <h2>Add a New Friend</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formValues.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='age'
          placeholder='Age'
          value={formValues.age}
          onChange={handleChange}
        />
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={formValues.email}
          onChange={handleChange}
        />
        <button type='submit'>Add New Friend</button>
      </form>
    </div>
  )
}

export default FriendsForm
