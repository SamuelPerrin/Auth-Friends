import React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute';
// import axiosWithAuth from './utils/axiosWithAuth';

const  App = () => {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/logout');
  }

  return (
    <div className="App">
      <Link to='/login'>Login</Link>
      <Link onClick={logout}>Logout</Link>
      <Link to='/'>Home</Link>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <PrivateRoute path='/friends/:id' component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
