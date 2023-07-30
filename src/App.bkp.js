import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//import WebPlayback from './WebPlayback'
import ShowPlaylists from './ShowPlaylists'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Login from './Login'

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


       <div className="App">
         { token === '' && <Login/> }


         <Header/>
         { token !== '' &&
         <Router>
           <Routes>
             <Route path="/playlists" element=
               <ShowPlaylists token={token} />/>
             <Route path="/" element={<Home token={token}/>} />
           </Routes>
         </Router>
         }
         <Footer />
       </div>

   );
}


export default App;
