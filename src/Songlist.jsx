import React, { useState, useEffect } from 'react';

const Songlist = ({ token }) => {
  const [songlist, setSonglist] = useState({});

  useEffect(() => {
    const fetchSonglist = async () => {
      const response = await fetch('http://localhost:3000/booh/haruki', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      console.log("fetching songlist");
      const songlist = await response.json();
      console.log("got the Songlist yo:", songlist);
      setSonglist(songlist);
    };

    fetchSonglist();
  }, [token]);

  const currentlyPlaying = songlist.currently && songlist.currently.item.id
  return (
    <>
    <div className="song-list">
    <p>hi mom! {currentlyPlaying}</p>
      <ul>{songlist.name}
      {songlist.tracks && songlist.tracks.items.map(item => (


            <li className={item.track.id===currentlyPlaying ? 'playing' : 'normal'}>
              {item.track.name}  pop: {item.track.popularity}
            </li>




      ))}
      </ul>
    </div>
    </>
  );
};

export default Songlist;
