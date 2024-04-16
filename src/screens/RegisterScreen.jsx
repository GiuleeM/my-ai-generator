import React, { useState } from 'react';
import '../style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import LOGO from '../assets/logo.png';

function RegisterScreen() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName,
        }).then(() => navigate('/'));
      })
      .catch((error) => {
        console.log(error);
      });

    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer blurredContainer">
      <img src={LOGO} className="bigLogo" />
      <h1>Create an account</h1>
      <label htmlFor="email">Display name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={displayName}
        onChange={(event) => {
          setDisplayName(event.target.value);
        }}
        placeholder="Your displayname"
      />

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

      <label htmlFor="password">Confirm password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
        placeholder="Confirm password"
      />
      <p className="errorMessage">{error}</p>

      <button type="submit" className="buttonClass">Register</button>

      <NavLink to="/login" className="authNavLink"></NavLink>
      <NavLink to="/" className="goBackHome">Go back home</NavLink>
    </form>
  );
}

export default RegisterScreen;