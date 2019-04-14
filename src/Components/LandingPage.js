import React from 'react'

const LandingPage = (props) => {
  return(
    <main className="LandingPage gradient">
      <h1>Welcome to kTunes</h1>
      <p>Explore. Listen. Repeat.</p>

    {props.errorMessage !== null ? <p className="errorMessage">Sorry, there appears to be a {props.errorMessage}. Please tune in again soon.</p> : null}    

    </main>
    
  )
}

export default LandingPage;