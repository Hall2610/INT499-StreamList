// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Movies from "./pages/Movies";
import StreamList from "./pages/StreamList";
import Subscriptions from "./pages/Subscriptions";
import Login from "./pages/Login";
import CreditCard from "./pages/CreditCard";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login first */}
        <Route path="/login" element={<Login />} />

        {/* Protected area with Navbar */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Navbar />
              <Routes>
                <Route path="/" element={<StreamList />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/credit-card" element={<CreditCard />} />
                <Route path="/about" element={<About />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/streamlist" element={<StreamList />} />
                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
