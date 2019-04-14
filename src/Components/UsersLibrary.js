import React from 'react';

const UsersLibrary = (props) => {

  return(
    <div>
      <ul>
        {
          props.usersLibrary.map(song => {
              return(
                <li key={song.id}>
                  <h2>{song.title}</h2>
                  <h3>{song.artist}</h3>
                </li>
              )
            }
          )
        }
      </ul>
    </div>
  )
}

export default UsersLibrary