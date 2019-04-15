import React from 'react';
import { Redirect } from 'react-router-dom';

const UsersLibrary = (props) => {
  return (
    <div>
      {/* ternary operate used to check if sign in was a success, if not, redirect to landing page */}
      {props.signInSuccess ?
        <main className="wrapper">
        <h1>{props.username}'s Library</h1>
          {props.usersLibrary.length !== props.usersDownloads.length ?
            <div className="ldsRipple"><div></div><div></div></div> :
            <table>
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Listen</th>
                </tr>
              </thead>
              <tbody>
                {props.usersLibrary.map(song => {
                  return (
                    <tr key={song.id}>
                      <td>{song.title}</td>
                      <td>{song.artist}</td>
                      <td>
                        <button>
                          <i className="far fa-play-circle" aria-hidden="true"></i>
                          <span className="sr-only">Listen to {song.title} by {song.artist}.</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
        </main>
        : 
        <Redirect to="/" />}
    </div>
  )
}

export default UsersLibrary