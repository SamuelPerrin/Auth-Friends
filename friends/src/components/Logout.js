import React from 'react';
import {Link} from 'react-router-dom';

const Logout = () => {
  return (
    <div>
      <p>You have successfully logged out.</p>
      <Link to='/login'>Log back in</Link>
    </div>
  )
}

export default Logout
