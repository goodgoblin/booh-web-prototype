import React, { useState, useEffect } from 'react';

const ShowPlaylists = ({ token }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch('http://localhost:3000/booh/playlists', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const playlists = await response.json();
      console.log("got the playlists yo:", playlists);
      setPlaylists(playlists);
    };

    fetchPlaylists();
  }, [token]);

  return (
    <div>
      <h1>Your Spotify Playlists</h1>
      {playlists.map(playlist => (
        <div key={playlist.id}>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          
          <p>Total duration: {playlist.totalDurationSeconds} seconds</p>
        </div>
      ))}
    </div>
  );
};

export default ShowPlaylists;
