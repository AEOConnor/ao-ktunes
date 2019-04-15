import React from 'react';

const UsersLibrary = (props) => {

  return (

    <main className="wrapper">

      <table>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {props.usersLibrary.map(song => {
            return (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td><button><i className="far fa-play-circle"></i></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>


  )
}

export default UsersLibrary