import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../style.css';
import LOGO from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Navbar() {
  const location = useLocation();
  const { currentUser } = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="blurredContainer">
      <NavLink to="/" className="logoContainer">
        <img src={LOGO} className="logo" />
        <p>My AI-Generator</p>
      </NavLink>

      <div className="rightSideNavbar">
        {currentUser && (
          <p className="navGreeting"> Hello, {currentUser.displayName}</p>
        )}
        {currentUser && <NavLink to="/create"> Create</NavLink>}
        {currentUser ? (
          <p className="signOutButton" onClick={handleSignOut}>
            Sign Out
          </p>
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;