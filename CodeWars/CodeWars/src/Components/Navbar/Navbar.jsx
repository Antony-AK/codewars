import React from "react";
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="team-name">CodeRushers</div>
        <div className="timer">Time Left: 00:30:00</div>
      </nav>
    </div>
  );
};

export default Navbar;
