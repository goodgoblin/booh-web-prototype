import WebPlayback from './WebPlayback'
const Home = ({ token }) => {
  return(
    <>
    <h2>Home Page</h2>
    <div className="columns-3">
        <div className="bg-red">
          <img src="/dragon.png" width="400"/>
        </div>
        <div className="bg-orange">
          <video src="/japanese_movie.mp4" width="400" autoPlay="true" controls/>
        </div>
        <div className="bg-pink">
          <img src="/snatch.png" width="400"/>
        </div>

    </div>
    <WebPlayback token={token}/>
    </>



  );
}
export default Home;
