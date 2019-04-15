import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const SignIn = (props) => {

  return (
    <main className="gradient">
      <h2>Explore. Listen. Repeat.</h2>
      <p>Welcome back! Please sign in.</p>
      <Link to="/newuser" className="signInLink">New to kTunes? Sign up!</Link>
      <form onSubmit={props.listUsersSongs} className="signInForm">

        <label htmlFor="username" className="visuallyHidden">Username</label>
        <input type="text" id="username" name="username" onChange={props.handleChange} value={props.username} placeholder="Username" required />

        <label htmlFor="email" className="visuallyHidden">Email Address</label>
        <input type="email" onChange={props.handleChange} id="email" name="userEmail" value={props.userEmail} placeholder="Email Address" required />

        <label htmlFor="password" className="visuallyHidden">Password</label>
        <input type="password" id="password" name="userPassword" value={props.userPassword} onChange={props.handleChange} placeholder="******" minLength="8" maxLength="12" />

        <input type="submit" value="Sign In" />
        {props.signInError !== null ?

          <p>{props.signInError} <Link to="/signup" className="signInLink">Sign Up</Link></p>

          : null
        }

      </form>

      {props.signInSuccess ?
        <Redirect to="/home" />
        : null
      }
    </main>
  )
}

export default SignIn;