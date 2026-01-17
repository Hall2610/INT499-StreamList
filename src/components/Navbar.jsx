import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.1rem",
};

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav
      style={{
        padding: "1rem",
        display: "flex",
        gap: "1.5rem",
        background: "#222",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/subscriptions" style={linkStyle}>Subscriptions</Link>

      <Link to="/cart" style={linkStyle}>
        Cart{" "}
        <span
          style={{
            marginLeft: "0.35rem",
            background: "#444",
            padding: "0.15rem 0.55rem",
            borderRadius: "999px",
            fontSize: "0.95rem",
          }}
        >
          {totalItems}
        </span>
      </Link>

      <Link to="/movies" style={linkStyle}>Movies</Link>
      <Link to="/streamlist" style={linkStyle}>Stream List</Link>
    </nav>
  );
}
