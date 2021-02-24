import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Friend = props => {
  const history = useHistory();

  return (
    <Card onClick={() => history.push(`/friends/${props.details.id}`)}>
      <h3>{props.details.name}, {props.details.age}</h3>
      <p>{props.details.email}</p>
    </Card>
  )
};

const Card = styled.div`
  border: 1px solid black;
  padding: 1%;
  margin: 1%;
  border-radius:5%;
  background-color:#ffffff;

  &:hover{
    cursor:pointer;
    background-color:#eeeeee;
  }

  h3 {
    margin: 0;
    padding: 0;
  }

  p {
    margin:0;
    padding:0;
  }
`

export default Friend;