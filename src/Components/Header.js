import React from 'react'
import { Link } from 'react-router-dom';
import keplerLogo from '../assets/keplerLogo.png';

const Header = (props) => {
  return (
    <header className="Header wrapper">
      <div className="headerFlexContainer">
        <div>
          <img src={keplerLogo} alt="Kepler Communications Logo" className="logo" />
        </div>
        <h1><Link to="/">kTunes</Link></h1>

        {/* ternary operate to check if the user signed in successfully, and display respective content */}
        {props.signInSuccess ?
          <p><span><Link to="/home" className="signInLink">kTunes Home</Link></span><span><button onClick={props.listUsersSongs}><Link to="/mylibrary" className="signInLink">My Library</Link></button><button onClick={props.signOut} className="signInLink">Sign Out</button></span>
          </p>
          :
          <p><span className="signInLink"><Link to="/signin">Sign In</Link></span><span className="signInLink"><Link to="/newuser">Sign Up</Link></span> </p>
        }
      </div>
    </header>
  )
}

export default Header;

