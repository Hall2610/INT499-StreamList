import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <main className="page">
          <Routes>
            <Route path="/" element={<Navigate to="/streamlist" replace />} />
            <Route path="/streamlist" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
