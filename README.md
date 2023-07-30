# Bat Out Of Hell

## Using your own credentials

You will need to register your app and get your own credentials from the
[Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/)

To do so, go to your Spotify for Developers Dashboard, create your
application and register the following callback URI:

`http://localhost:3000/auth/callback`

Once you have created your app, create a file called `.env` in the root folder
of the repository with your Spotify credentials:

```bash
SPOTIFY_CLIENT_ID='my_client_id'
SPOTIFY_CLIENT_SECRET='my_client_secret'
```

## Installation

These examples run on Node.js. On its
[website](http://www.nodejs.org/download/) you can find instructions on how to
install it.

Once installed, clone the repository and install its dependencies running:

```bash
npm install
```

## Running it

Start both client and server with the following command:

```bash
npm run dev
```

The React application will start on `http://localhost:3000`

## Resources

- Follow [@SpotifyPlatform](https://twitter.com/SpotifyPlatform) on Twitter for Spotify for Developers updates.
- Join the [Spotify for Developers Community Forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).

## Database
Adding database support.  
For local development using docker with local password 'boohwho123'
```

docker run --name booh_local -e POSTGRES_USER=booh_local -e POSTGRES_PASSWORD=boohwho123 -e POSTGRES_DB=booh_local -v $PWD/local_persist/pgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres

```
### migrations
```
NODE_ENV=local npx sequelize-cli db:migrate
```

### environment
```
export NODE_ENV=local
```

### connecting
```
 psql -h localhost -p 5432 -U booh_local -d booh_local
```
