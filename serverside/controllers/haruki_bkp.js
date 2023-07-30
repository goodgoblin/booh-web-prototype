var express = require('express');
//var fetch = require('node-fetch').default;
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var router = express.Router();

router.get('/', function(req, res) {
  var token = req.headers.authorization.split(' ')[1]; // assuming token is passed in Authorization header
  var currentId = '';
  var currentSongName = 'We Are The World'
  var currently= {}
  console.log('Haruki wuz here')
  function fetchHaruki() {
    //ChatGPT HERE I want to replace with a call to a function that gets the current playlist
    // using custom heuristics --- what is the best way to add such a function to this file?
    return fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      console.log("response status is ", response.status);
      if(response.status===204){
        return {'message': 'Not playing'}
      }else{
        return response.json();
      }
    })
    .then(current => {
      console.log("currenty playing is :", current);
      currently = current;
      if(current && current.context && current.context.type === 'playlist'){
        currentId = current.context.uri.split(':')[2];

        console.log("currently playing song name is: "+currentId);


        return fetch(`https://api.spotify.com/v1/playlists/${currentId}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json());
      }else{
        return current;
      }

    }).catch(function(error) {
      console.error('Error fetching Haruki', error);
    });
  }
  fetchHaruki().then( murakami => {
    console.log("fetchHaruki finally", murakami);
    murakami.currently = currently;
     res.json(murakami);
   });
});

module.exports = router;
