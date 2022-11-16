import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';



import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

  return (
    <GoogleOAuthProvider clientId="81611501110-pad8o3mqp6inupe3pfj0pa0hppq58u7a.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/auth' exact element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    

  )
}

export default App;