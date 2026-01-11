// src/pages/Subscriptions.jsx
import React from "react";
import list from "../data/Data";
import { useCart } from "../context/CartContext";
import "./shop.css";

export default function Subscriptions() {
  const { addToCart, warning } = useCart();

  return (
    <section className="shop">
      <header className="shop-header">
        <h1>Subscriptions and Accessories</h1>
        <p className="muted">
          Add one subscription at a time. Accessories can be added multiple times.
        </p>

        {warning && <div className="warning">{warning}</div>}
      </header>

      <div className="grid">
        {list.map((item) => (
          <article className="product" key={item.id}>
            <img className="product-img" src={item.img} alt={item.service} />

            <div className="product-body">
              <h3>{item.service}</h3>
              <p className="muted">{item.serviceInfo}</p>
              <p className="price">${Number(item.price).toFixed(2)}</p>

              <button className="btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>

              <span className={`pill ${item.type}`}>
                {item.type === "subscription" ? "Subscription" : "Accessory"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}