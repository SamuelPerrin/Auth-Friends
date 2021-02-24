import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

const Profile = () => {
  const [data, setData] = useState({name:'', age:'', email:''});
  const [editing, setEditing] = useState(false);
  const [newData, setNewData] = useState({
    name: data.name || '',
    age: data.age || '',
    email: data.email || '',
  })
  const id = useParams().id;
  const history = useHistory();

  useEffect(()=>{
    console.log("in useEffect")
    axiosWithAuth().get(`/api/friends/`)
      .then(res => {
        setData(res.data.filter(x => x.id == id)[0]);
      })
      .catch(err => console.log("in catch:", {err}))
  }, [id]);

  useEffect(() => {
    setNewData(data)
  }, [data])

  const handleChange = e => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/api/friends/${id}`, newData)
      .then(res => {
        setData(res.data.filter(x => x.id == id)[0]);
        setNewData({
          name: data.name || '',
          age: data.age || '',
          email: data.email || '',
        });
        setEditing(false);
      })
      .catch(err => console.log({err}));
  }

  const handleDelete = e => {
    e.preventDefault();
    axiosWithAuth().delete(`/api/friends/${id}`)
      .then(() => {
        history.push('/')
      })
      .catch(err => console.log({err}))
  }

  return (
    <div>
      {!data.name.length ? <p>Loading friend's data...</p> : null}
      {data.name.length ? <h1>{data.name}</h1> : null}
      {data.name.length ? <p>{data.name} is {data.age} years old.</p> : null}
      {data.name.length ? <p>Email: {data.email}</p> : null}
      {!editing &&
      <div>
        <button onClick={() => setEditing(!editing)}>Edit profile</button>
        <button onClick={handleDelete}>Delete Profile</button>
      </div>}
      {editing && 
        <form onSubmit={handleSubmit}>
          <input
          type='text'
          name='name'
          placeholder='Name'
          value={newData.name}
          onChange={handleChange}
          />
          <input
            type='text'
            name='age'
            placeholder='Age'
            value={newData.age}
            onChange={handleChange}
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={newData.email}
            onChange={handleChange}
          />
          <button type='submit'>Update Profile</button>
        </form>}
    </div>
  )
}

export default Profile
