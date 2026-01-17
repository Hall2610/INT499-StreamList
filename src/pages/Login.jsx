// src/pages/Login.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";   // ✅ FIXED IMPORT

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleSuccess(credentialResponse) {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        })
      );

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login decode error:", err);
    }
  }

  function handleError() {
    console.error("Google Login Failed");
  }

  return (
    <section style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div
        style={{
          width: "min(900px, 92vw)",
          padding: "2rem",
          borderRadius: "18px",
          background: "#111",
        }}
      >
        <h1 style={{ color: "#fff", marginBottom: "0.5rem" }}>Login</h1>
        <p style={{ color: "#bbb", marginBottom: "1.5rem" }}>
          Please sign in with Google to access the StreamList application.
        </p>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </section>
  );
}
