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

        {props.signInSuccess ? <Link to="/home">kTunes Home</Link> : <p><span className="signInLink"><Link to="/signin">Sign In</Link></span><span className="signInLink"><Link to="/newuser">Sign Up</Link></span> </p>}
      </div>


    </header>
  )
}

export default Header;

