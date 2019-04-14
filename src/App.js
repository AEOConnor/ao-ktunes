//dependencies 
import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import midifileparser from 'midi-file-parser'
// import MidiConvert from 'midiconvert';
//components
import LandingPage from './Components/LandingPage.js'
import Header from './Components/Header.js';
import HomeLibrary from "./Components/HomeLibrary.js";
import CreateUser from './Components/CreateUser.js'
import SignIn from './Components/SignIn.js'
import UsersLibrary from './Components/UsersLibrary.js';
import Footer from './Components/Footer.js';

//styles
import './App.css';

//proxy used to ensure no cors error
const proxyUrl = "https://cors-anywhere.herokuapp.com/"

class App extends Component {
  constructor() {
    super();
    this.state = {
      kTunesLibrary: [],
      usersLibrary: [],
      username: "",
      userEmail: "",
      userPassword: "",
      userSongId: "",
      usersDownloads: [],
      downloadError: null,
      signInError: null,
      signInSuccess: false
    }
  }

  //function to create new user 
  listUsersSongs = (e) => {
    e.preventDefault()

    const listingUrl = `https://kepler.space/frontend2019/stinging_phonemes/listSongs`

    axios.get(proxyUrl + listingUrl, {
      headers: {
        Authorization: `Bearer stinging_phonemes `
      },
      params: {
        method: "GET",
        email: `${this.state.userEmail}`,
        password: `${this.state.userPassword}`,
      }
    }).then((res) => {

      const usersDownloads = []
      const parseString = require('xml2js').parseString;
      const xml = res.data;

      parseString(xml, function (err, result) {
        usersDownloads.push((result.response.songs[0].song))
      });


      this.addUsersDownloadsToLibrary(usersDownloads)

      this.setState({
        signInError: null,
        signInSuccess: true,
        usersDownloads: usersDownloads[0]
      })

    })
      .catch((error) => {
        this.setState({
          signInError: "No account found. Please try again or create a new account."
        })
        console.log(error)
      })
  }

  //add previously downloaded songs to the users current library
  addUsersDownloadsToLibrary = (usersDownloads) => {
    
    const downloadedSongs = []
    const trimmedSongs = [] 
  
    usersDownloads[0].forEach(songId => {
      const id = (songId).trim()
      trimmedSongs.push(id)
    })
  
    trimmedSongs.forEach(songId => {
      this.state.kTunesLibrary.map(song => {
      if (song.id === songId) {
        downloadedSongs.push(song)
       }
      }) 
    })

    this.setState({
      usersLibrary: downloadedSongs
    })
  
  }

  //matches the song id of download to songs in ktunes library and creates new song record in users library
  updateUsersLibrary = (songId) => {
    const usersLibrary =[]

    this.state.kTunesLibrary.map(song => {
      if(song.id === songId){
        usersLibrary.push(song)
      }
    }) 

    this.setState({
      usersLibrary: usersLibrary
    })
  }


  downloadSong = (e) => {
    const songId = (e.target.value);

    this.getSong(songId);
    this.updateUsersLibrary(songId)
  }

  getSong = (songId) => {

    const listingUrl = `https://kepler.space/frontend2019/stinging_phonemes/getSong`

    axios.get(proxyUrl + listingUrl, {
      headers: {
        Authorization: `Bearer stinging_phonemes `
      },
      params: {
        method: "GET",
        email:`${this.state.userEmail}`,
        password: `${this.state.userPassword}`,
        songid: `${songId}`
      }
    })
      .then((res) => {


        const parseString = require('xml2js').parseString;
        const xml = res.data;
        const downloadResponse = []
    

        parseString(xml, function (err, result) {

          downloadResponse.push(result.response)

        });
        
        console.log(downloadResponse[0].rawdata[0]._)
        console.log( downloadResponse[0].rawdata[0]._) 

      })
      .catch((error) => {
        console.log(error)
      })
  }

  createUser = (e) => {
    e.preventDefault()

    const listingUrl = `https://kepler.space/frontend2019/stinging_phonemes/createUser`

    axios.get(proxyUrl + listingUrl, {
      headers: {
        Authorization: `Bearer stinging_phonemes `
      },
      params: {
        method: "GET",
        name: `${this.state.username}`,
        email: `${this.state.userEmail}`,
        password: `${this.state.userPassword}`,
      }
    }).then((res) => {

      const parseString = require('xml2js').parseString;
      const xml = res.data;
      const createUserResponse = []

      parseString(xml, function (err, result) {
        createUserResponse.push(result.response)
      });


      if (createUserResponse[0]._ === "User already exists."){
        this.setState({
          signInError: "An account already exists with with this information.",
          signInSuccess: false
        })
      } 
        
      this.setState({
        signInSuccess: true
        })

    }).catch((error) => {
      console.log(error)
    })
  }

  //on page load, retrieve the ktunes library 
  componentDidMount() {

    const listingUrl = `https://kepler.space/frontend2019/stinging_phonemes/listSongs`

    axios.get(proxyUrl + listingUrl, {
      headers: {
        Authorization: `Bearer stinging_phonemes `
      },
      params: {
        method: "GET",
      }
    }).then((res) => {
      
      //converting xml to json 
      const parseString = require('xml2js').parseString;
      const xml = res.data;
      const jsonResponseListSongs = [];
      parseString(xml, function (err, result) {
        jsonResponseListSongs.push(result.response.songs[0].song);
      });
      this.createLibrary(jsonResponseListSongs[0])
    })
      .catch(function (error) {
        console.log(error)
        Swal.fire("Sorry! Looks like something's down on the server. Tune back in soon!")
      })
  }

  //function to restructure data in array from the the api call
  createLibrary = (library) => {
    const kTunesLibrary = [];
  
    let title;
    let artist;
    let id;

    //function to update artist and song titles that were mixed up
    library.forEach(song => {

      if (song.$.name === "ABBA" || song.$.name === "Sugar Ray" || song.$.name === "The Beatles") {
        title = song.$.artist.replace(/([a-z])([A-Z])/, '$1 $2');
        artist = song.$.name;
        id = (song._).trim()
      } else {
        title = song.$.name.replace(/([a-z])([A-Z])/, '$1 $2');
        artist = song.$.artist;
        id = (song._).trim();
      }
      const songInfo = { title, artist, id }
      kTunesLibrary.push(songInfo)
    })

    this.sortLibrary(kTunesLibrary)
  }

  //function to sort library by artist name and set state to the final array of data
  sortLibrary = (array) => {
    const finalArray = array.sort((a, b) => {
      if (a.artist < b.artist) {
        return -1;
      } else if (a.artist > b.artist) {
        return 1;
      }
    })
    //set state to be the final restructured and sorted array
    this.setState({
      kTunesLibrary: finalArray
    })
  }

  //event handler to listen for user's input on change and update state
  handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value

    this.setState({
      [field]: `${value}`
    })
  }

  componentDidUpdate () {
    this.renderRedirect()
  }

renderRedirect = () => {
  if(this.state.signInSuccess !== true) {
    return  <Redirect to="/"  />;
  }
 
}

  render() {
    return (
      <Router>
        <div>
          
           <Header
            username={this.state.username}
            signInSuccess={this.state.signInSuccess}
            usersDownloads={this.state.usersDownloads}
          />

    
          <Route path="/" exact component={LandingPage} />

          <Route path="/home" render={() => {
            return (
              <HomeLibrary
                listUsersSongs={this.listUsersSongs}
                homeLibrary={this.state.kTunesLibrary}
                downloadSong={this.downloadSong}
                downloadError={this.state.downloadError}
              />
            )
          }}
          />

          <Route path="/newuser" render={() => {
            return (
              <CreateUser
                handleChange={this.handleChange}
                createUser={this.createUser}
                username={this.state.username}
                userEmail={this.state.userEmail}
                userFirstName={this.state.userFirstName}
                userLastName={this.state.userLastName}
                userPassword={this.state.userPassword}
                signInError={this.state.signInError}
              />
            )
          }}
          />

          <Route path="/signin" render={() => {
            return (
              <SignIn
                listUsersSongs={this.listUsersSongs}
                handleChange={this.handleChange}
                userEmail={this.state.userEmail}
                userPassword={this.state.userPassword}
                signInError={this.state.signInError}
                usersDownloads={this.state.usersDownloads}
                signInSuccess={this.state.signInSuccess}
              />
            )
          }}
          />

          <Route path="/mylibrary" render={() => {
            return (
              <UsersLibrary 
                usersLibrary={this.state.usersLibrary}
              
              />
            )
          }} />

          <Footer />
        </div>
      </Router>

    );
  }
}

export default App;


//functionaly
//header is a constant on the page, it will always remain 
// what changes, is the main: library, create new user, see my downloads