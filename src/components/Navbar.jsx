import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav-header">
      <div className="brand">
        <span className="brand-mark">🎬</span>
        <span className="brand-text">StreamList</span>
      </div>

      <nav className="nav-links">
        <NavLink
          to="/streamlist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          StreamList
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Movies
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Cart
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
