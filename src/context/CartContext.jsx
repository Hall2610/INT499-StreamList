import React from "react";

const CartContext = React.createContext(null);

const STORAGE_KEY = "streamlist_cart_v1";

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = React.useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? safeParse(raw, []) : [];
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalItems = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }, [items]);

  const totalPrice = React.useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
  }, [items]);

  function addToCart(product) {
    setItems((prev) => {
      // Restriction: only one subscription at a time
      if (product.type === "subscription") {
        const hasSubscription = prev.some((p) => p.type === "subscription");
        if (hasSubscription) {
          // Keep state unchanged; UI should show warning in Subscriptions page
          return prev;
        }
      }

      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        // Accessories can be added multiple times: just increment quantity
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: (Number(p.quantity) || 1) + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQuantity(id, value) {
    const qty = Math.max(1, Number(value) || 1);
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
