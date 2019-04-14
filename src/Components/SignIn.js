import React from 'react';
import {Link, Redirect} from 'react-router-dom'

const SignIn = (props) => {

    return (
      <div className="gradient">
        <h2>Explore. Listen. Repeat.</h2>
        <p>Welcome back! Please sign in.</p>
        <form onSubmit={props.listUsersSongs} className="signInForm">

          <label htmlFor="username" className="visuallyHidden">Username</label>
          <input type="text" id="username" name="username" onChange={props.handleChange} value={props.username} placeholder="Username" required />

          <label htmlFor="email" className="visuallyHidden">Email Address</label>
          <input type="email" onChange={props.handleChange} id="email" name="userEmail" value={props.userEmail} placeholder="Email Address" required />

          <label htmlFor="password" className="visuallyHidden">Password</label>
          <input type="password" id="password" name="userPassword" value={props.userPassword} onChange={props.handleChange} placeholder="******" />

          <input type="submit" value="Sign In" /> 
          {props.signInError !== null ?

            <p>{props.signInError} <Link to="/signup">Sign Up</Link></p> 
            
            : null
          }

          {props.signInSuccess ? 
            <Redirect to="/home" />
             : null 
          } 
        
        </form>
      </div>
    )
    
  }

  export default SignIn;