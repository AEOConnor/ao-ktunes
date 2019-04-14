import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const CreateUser = (props) => {
  return (
    <main className="gradient">
      <h2>Explore. Listen. Repeat.</h2>
      <p>Create an account below.</p>
      <form onSubmit={props.createUser} className="signInForm">

        <label htmlFor="username" className="visuallyHidden">Username</label>
        <input type="text" id="username" name="username" onChange={props.handleChange} value={props.username} placeholder="Username" required />

        <label htmlFor="email" className="visuallyHidden">Email Address</label>
        <input type="email" onChange={props.handleChange} id="email" name="userEmail" value={props.userEmail} placeholder="Email Address" required />

        <label htmlFor="password" className="visuallyHidden">Password</label>
        <input type="password" id="password" name="userPassword" value={props.userPassword} onChange={props.handleChange} placeholder="******" required minLength="8" maxLength="12" />

        <input type="submit" value="Sign Up" />

        {props.signInError !== null ?

          <p>{props.signInError} <Link to="/signin" className="signInLink">Sign In</Link></p>

          : null
        }
      </form>
      {props.errorMessage !== null ? <p>{props.errorMessage}</p> : null}

      {props.signInSuccess ?
        <Redirect to="/home" />
        : null
      }
    </main>
  )
}

export default CreateUser;