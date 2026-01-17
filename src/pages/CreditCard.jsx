// src/pages/CreditCard.jsx
import React from "react";
import "./shop.css";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(" ") : "";
}

function isValidCardFormat(value) {
  return /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(value);
}

export default function CreditCard() {
  const [name, setName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [exp, setExp] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("savedCard");
      if (!raw) return;
      const saved = JSON.parse(raw);
      setName(saved.name || "");
      setCardNumber(saved.cardNumber || "");
      setExp(saved.exp || "");
      setCvv(saved.cvv || "");
    } catch {
      // ignore
    }
  }, []);

  function handleSave(e) {
    e.preventDefault();

    if (!isValidCardFormat(cardNumber)) {
      setMessage("Card number must match: 1234 5678 9012 3456");
      return;
    }

    const payload = { name, cardNumber, exp, cvv };
    localStorage.setItem("savedCard", JSON.stringify(payload));
    setMessage("Card saved to localStorage successfully.");
  }

  return (
    <section className="shop">
      <div className="card">
        <h1>Credit Card Management</h1>
        <p className="muted">
          Enter card details and save to localStorage (for demo purposes).
        </p>

        <form
          onSubmit={handleSave}
          style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}
        >
          <label>
            Cardholder Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "10px" }}
              required
            />
          </label>

          <label>
            Card Number (format: 1234 5678 9012 3456)
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              style={{ width: "100%", padding: "0.5rem", borderRadius: "10px" }}
              required
            />
          </label>

          <label>
            Expiration (MM/YY)
            <input
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              placeholder="MM/YY"
              style={{ width: "100%", padding: "0.5rem", borderRadius: "10px" }}
              required
            />
          </label>

          <label>
            CVV
            <input
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="123"
              style={{ width: "100%", padding: "0.5rem", borderRadius: "10px" }}
              required
            />
          </label>

          <button className="btn" type="submit">
            Save Card
          </button>

          {message && <p className="muted">{message}</p>}
        </form>
      </div>
    </section>
  );
}
