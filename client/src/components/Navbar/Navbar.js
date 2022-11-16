import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Location = useLocation();
 
  const logout = () => {
    dispatch({type: 'LOGOUT'});
    navigate('/auth');
    setUser(null);
   }
  


  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      // exp in milliseconds, if expiry is before current time
      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      };
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [Location]);
  return (
  <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memoriesLogo} alt="icon" height="60" />
    </div>
    <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Log In</Button>
        )}
      </Toolbar>
  </AppBar>

  )
}
export default Navbar;