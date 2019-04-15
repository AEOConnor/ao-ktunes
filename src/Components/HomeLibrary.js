import React from 'react';


const HomeLibrary = (props) => {
  return (

    <main className="wrapper">
    <aside>

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

    </main>

  )
}

export default HomeLibrary;