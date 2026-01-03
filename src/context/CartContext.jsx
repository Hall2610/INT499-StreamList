import React from "react";

const CartContext = React.createContext(null);

const CART_KEY = "teamCartItems";

function safeParse(json) {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? safeParse(raw) : [];
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const [items, setItems] = React.useState(() => loadCart());
  const [warning, setWarning] = React.useState("");

  React.useEffect(() => {
    saveCart(items);
  }, [items]);

  const cartCount = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }, [items]);

  const totalPrice = React.useMemo(() => {
    return items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  }, [items]);

  function addToCart(product) {
    setWarning("");

    if (!product || typeof product.id === "undefined") return;

    const type = product.type;

    if (type === "subscription") {
      const hasSubscription = items.some((i) => i.type === "subscription");
      if (hasSubscription) {
        setWarning("Only one subscription can be added at a time.");
        return;
      }
    }

    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        if (type === "subscription") {
          setWarning("That subscription is already in your cart.");
          return prev;
        }

        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.service || product.name || "Item",
          description: product.serviceInfo || product.description || "",
          price: Number(product.price) || 0,
          img: product.img || "",
          type: product.type || "accessory",
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQuantity(id, newQuantity) {
    const q = Number(newQuantity);

    if (Number.isNaN(q)) return;

    setItems((prev) => {
      if (q <= 0) return prev.filter((p) => p.id !== id);

      return prev.map((p) => (p.id === id ? { ...p, quantity: q } : p));
    });
  }

  function clearCart() {
    setWarning("");
    setItems([]);
    localStorage.removeItem(CART_KEY);
  }

  const value = {
    items,
    cartCount,
    totalPrice,
    warning,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
