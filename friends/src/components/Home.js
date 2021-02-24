import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import Friend from './Friend';
import FriendsForm from './FriendsForm';
import styled from 'styled-components';

const Home = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axiosWithAuth()
      .get('/api/friends')
      .then(res => {
        // console.log("made successful get call to /api/friends")
        setFriends(res.data)
      })
      .catch(err => {
        console.log({err})
      })
  }, [])

  return (
    <div>
      {!friends.length && <p>Loading friends data...</p>}
      <FlexContainer>
        {friends.length ? friends.map(friend => <Friend key={friend.id} details={friend} />) : null}
      </FlexContainer>
      <FriendsForm setFriends={setFriends} />
    </div>
  )
};

const FlexContainer = styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  border:1px solid black;
  border-radius: 1%;
  margin:3%;
`

export default Home
