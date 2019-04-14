import React from 'react';

const UsersLibrary = (props) => {

  return (

    <main className="wrapper">
      <ul className="musicLibrary">
        {
          props.usersLibrary.map(song => {
            return (
              <li key={song.id} className="songDetails">
                <h2>{song.title}</h2>
                <h3>{song.artist}</h3>
                <button><i class="far fa-play-circle"></i></button>
              </li>
            )
          }
          )
        }
      </ul>
    </main>


  )
}

export default UsersLibrary