import React, { useState, useEffect } from 'react';
import HarukiMurakami from './HarukiMurakami'
import Login from './Login'
import Header from './Header'
//import ShowPlaylists from './ShowPlaylists'
import './App.css';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
      <Header/>
      { false && <Login/> }
        { token === '' ? <Login/> : <HarukiMurakami token={token} /> }
    </>
  );
}


export default App;
