import React from 'react';
import { Redirect } from 'react-router-dom';

const HomeLibrary = (props) => {
  return (
    <div>
      {/* ternary operate used to check if sign in was a success, if not, redirect to landing page */}
      {props.signInSuccess ?
        <main className="wrapper">
        <h1>Home</h1>
          {props.homeLibrary.length === 0 ?
            <div className="ldsRipple"><div></div><div></div></div> :
            <div className="libraryMain">
              <aside className="recentlyDownloadedAside">
                <h2>Recently Downloaded</h2>
                {props.lastDownloadId.map(song => {
                  return (
                    <ul>
                      <li key={song.id}>
                        <p>{song.title}</p>
                        <p>{song.artist}</p>
                        <button><i className="far fa-play-circle"></i></button>
                      </li>
                    </ul>
                  )
                })}
              </aside>
              <table>
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {props.homeLibrary.map(song => {
                    return (
                      <tr key={song.id}>
                        <td>{song.title}</td>
                        <td>{song.artist}</td>
                        <td>
                          <button value={song.id} onClick={props.downloadSong}><span><i className="fas fa-arrow-circle-down"></i>
                          </span></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          }
        </main> : 
        <Redirect to="/" />
      }
    </div>
  )
}

export default HomeLibrary;