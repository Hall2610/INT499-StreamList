// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        display: "flex",
        gap: "1.5rem",
        background: "#222",
        color: "#fff",
        alignItems: "center"
      }}
    >
      <Link to="/" style={linkStyle}>
        Home
      </Link>

      <Link to="/about" style={linkStyle}>
        About
      </Link>

      <Link to="/cart" style={linkStyle}>
        Cart
      </Link>

      <Link to="/movies" style={linkStyle}>
        Movies
      </Link>

      <Link to="/streamlist" style={linkStyle}>
        Stream List
      </Link>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.1rem"
};

export default Navbar;
