var express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var router = express.Router();

// returns a promise that resolves to a playlist id
// This uses heuristics to
function getPlaylistId(token) {
  // This is just a sample API endpoint. Replace with your actual endpoint.
  var apiEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';

  return fetch(apiEndpoint, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    if(response.status===204){
      // ADD alternate path here
    }else if(response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching playlist ID');
    }
  }).then(current => {
    console.log("currenty playing is :", current);
    const envelope = {}

    currently = current;
    if(current && current.context && current.context.type === 'playlist'){
      envelope.playlistId = current.context.uri.split(':')[2];
      envelope.currentSongId = current.item.id;

      console.log("currently playing envelope is:" ,envelope);


      return envelope;

    }else{
      console.log("returning a HARD CODED one")
      envelope.playlistId = "3JDnD5LMsefq76VJr4I9yJ";
      return envelope;
    }
  });

}

//returns a promise that resolves to the currently playing song's information
function fetchHaruki(token) {
  var currently = {};

  return getPlaylistId(token)
    .then(envelope => {
      return fetch(`https://api.spotify.com/v1/playlists/${envelope.playlistId}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching Haruki');
      }
    }).catch(function(error) {
      console.error('Error fetching Haruki', error);
    });
}


router.get('/', function(req, res) {
  var token = req.headers.authorization.split(' ')[1]; // assuming token is passed in Authorization header
  var currentId = '';
  var currentSongName = 'We Are The World'
  var currently= {}
  console.log('Haruki wuz here')

  fetchHaruki(token).then(murakami => {
    //console.log("fetchHaruki finally", murakami);
    //murakami.currently = currently;
     res.json(murakami);
   });
});

module.exports = router;
