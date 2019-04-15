import React from 'react';
import {Link} from 'react-router-dom';


const LandingPage = (props) => {
  return(
    <main className="LandingPage gradient">
      <h1>Welcome to kTunes</h1>
      <p>Explore. Listen. Repeat.</p>
      <p>kTunes is a free, hasse-free music library. <Link to="/newuser" className="signInLink">Join today!</Link></p>

      {props.errorMessage !== null ? <p className="errorMessage">Sorry, there appears to be a {props.errorMessage}. Please tune in again soon.</p> : null}    

    </main>   
  )
}

export default LandingPage;