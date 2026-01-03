// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Movies from "./pages/Movies";
import StreamList from "./pages/StreamList";
import Subscriptions from "./pages/Subscriptions";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home route (shows StreamList by default) */}
        <Route path="/" element={<StreamList />} />

        {/* Team assignment routes */}
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/cart" element={<Cart />} />

        {/* Other routes */}
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/streamlist" element={<StreamList />} />
      </Routes>
    </Router>
  );
}

export default App;
