import React, { useState } from 'react';
import '../style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import LOGO from '../assets/logo.png';

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer blurredContainer">
      <img src={LOGO} className="bigLogo" />
      <h1>Log in to your account</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Email"
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Password"
      />

      <button type="submit" className="buttonClass">
        Login
      </button>
      <NavLink to="/register" className="authNavLink">
        I don't have an account
      </NavLink>
    </form>
  );
}

export default LoginScreen;