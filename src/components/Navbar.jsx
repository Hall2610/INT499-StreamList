// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../pages/shop.css";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="nav">
      <Link to="/" className="nav-link">
        Home
      </Link>

      <Link to="/about" className="nav-link">
        About
      </Link>

      <Link to="/subscriptions" className="nav-link">
        Subscriptions
      </Link>

      <Link to="/cart" className="nav-link">
        Cart <span className="badge">{cartCount}</span>
      </Link>

      <Link to="/movies" className="nav-link">
        Movies
      </Link>

      <Link to="/streamlist" className="nav-link">
        Stream List
      </Link>
    </nav>
  );
}

export default Navbar;
