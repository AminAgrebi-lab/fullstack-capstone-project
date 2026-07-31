import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      {/* Brand logo link */}
      <a className="navbar-brand" href="/">GiftLink</a>
      
      {/* Responsive navigation toggler */}
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navigation menu aligned to the right */}
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center gap-2">
          {/* Home Page Link */}
          <li className="nav-item">
            <a className="nav-link" href="/home.html">Home</a>
          </li>

          {/* Gifts Main Page Link */}
          <li className="nav-item">
            <Link className="nav-link" to="/app">Gifts</Link>
          </li>

          {/* Search Page Link */}
          <li className="nav-item">
            <Link className="nav-link" to="/app/search">Search</Link>
          </li>

          {/* Green Login Button with white text */}
          <li className="nav-item">
            <Link className="btn btn-success text-white px-3" to="/app/login">Login</Link>
          </li>

          {/* Register Page Link */}
          <li className="nav-item">
            <Link className="nav-link text-primary fw-bold" to="/app/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}