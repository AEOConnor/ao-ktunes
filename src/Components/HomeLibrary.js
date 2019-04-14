import React from 'react';
import {Link} from 'react-router-dom';

const HomeLibrary = (props) => {
  return(
    <React.Fragment>
      <main>
        <button onClick={props.listUsersSongs}> 
          <Link to="/mylibrary" >My kTunes Library</Link> 
        </button>
        <ul>
          {props.homeLibrary.map(song => {
            return(
              <li key={song.id}>
              <h2>Song Title: {song.title}</h2>
                <h3>Artist: {song.artist}</h3>
              <audio controls>
                  <source src="" type="audio/mp3" />
              </audio>
                
                {/* will need on click  to have song sent to user's downloaded song*/}
                <button value={song.id} onClick={props.downloadSong}>Download Song <span><i className="fas fa-music"></i></span></button>

              </li>
            )
          })
          }
        </ul>
      </main>
      
    </React.Fragment>
  )
}

export default HomeLibrary;