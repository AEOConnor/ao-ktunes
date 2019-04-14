import React from 'react';


const HomeLibrary = (props) => {
  return (

    <main className="wrapper">
      <ul className="musicLibrary">

        {props.homeLibrary.map(song => {
          return (<li key={song.id} className="songDetails">
            <h2>Song: {song.title}</h2>
            <h3>Artist: {song.artist}</h3>
            <button value={song.id} onClick={props.downloadSong}>Download Song <span><i className="fas fa-music"></i></span></button>
          </li>
          )
        })}
        
      </ul>
    </main>

  )
}

export default HomeLibrary;