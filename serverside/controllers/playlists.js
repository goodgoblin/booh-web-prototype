var express = require('express');
//var fetch = require('node-fetch').default;
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var playlists = express.Router();

playlists.get('/', function(req, res) {
  var token = req.headers.authorization.split(' ')[1]; // assuming token is passed in Authorization header
  var playlistData = [];
  var morePlaylists = true;
  var offset = 0;
  var fetched = 0;
  var total = 0;
  var limit = 50; // maximum limit is 50
  console.log('playlists wuz here')
  function fetchPlaylists() {
    if (!morePlaylists) {
      console.log('mooooree pleeze');
      return Promise.resolve(playlistData);
    }
    console.log('going for it offset ', offset);
    return fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
    //33s061rq8q1wb9wxv8g29vy94
    //return fetch(`https://api.spotify.com/v1/users/33s061rq8q1wb9wxv8g29vy94/playlists?limit=${limit}&offset=${offset}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(data => {
      if(total==0){
        total = data.total;
        console.log("initial token ", token);
      }
      fetched = fetched+ data.items.length;
      console.log("total: "+total+" fetched: "+fetched);
      var playlistPromises = data.items.map(function(playlist) {
        console.log('playlist name is is ', playlist.name);
        if (playlist.name.toLowerCase().includes('bat')) {
          console.log('not one?');
          return fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then(tracksResponse => tracksResponse.json())
          .then(tracksData => {
            console.log('reached tracks data', tracksData);
            var totalDurationSeconds = tracksData.items.reduce(function(total, item) {
              return total + item.track.duration_ms / 1000;
            }, 0);
            console.log('on my way back', totalDurationSeconds);
            return Object.assign({}, playlist, { totalDurationSeconds: totalDurationSeconds });
          });
        }
      });

      return Promise.all(playlistPromises).then(function(resolvedPlaylists) {
        playlistData = playlistData.concat(resolvedPlaylists.filter(Boolean));

        if (fetched == total) {
          morePlaylists = false;
        } else {
          offset += limit;
        }

        return fetchPlaylists();
      });
    })
    .catch(function(error) {
      console.error('Error fetching playlists', error);
      morePlaylists = false;
      return Promise.resolve(playlistData);
    });
  }


  //fetchPlaylists();
  fetchPlaylists().then(function(playlistData) {
      res.json(playlistData);
    }).catch(function(error) {
      console.error('Error fetching playlists', error);
      res.status(500).send('Error fetching playlists');
    });
});

module.exports = playlists;
