import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchLiveExchangeRates } from "../services/api";

const StoreContext = createContext();

const CURRENCIES = {
  PKR: { symbol: "Rs.", label: "PKR (Rs.)", rateKey: "PKR" },
  USD: { symbol: "$", label: "USD ($)", rateKey: "USD" },
  EUR: { symbol: "€", label: "EUR (€)", rateKey: "EUR" },
  GBP: { symbol: "£", label: "GBP (£)", rateKey: "GBP" },
  AED: { symbol: "AED", label: "AED", rateKey: "AED" }
};

const PROMO_CODES = {
  LUMEA20: { percent: 20, description: "20% Exclusive Welcome Discount" },
  GLOW15: { percent: 15, description: "15% Radiant Skin Bonus" },
  WELCOME10: { percent: 10, description: "10% First Order Privilege" }
};

export function StoreProvider({ children }) {
  // 1. Cart State (Persistent)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("lumea_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Wishlist State (Persistent)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("lumea_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Currency & Live Rates
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("lumea_currency") || "PKR";
  });

  const [rates, setRates] = useState({
    USD: 1,
    PKR: 277.5,
    EUR: 0.88,
    GBP: 0.75,
    AED: 3.67
  });

  useEffect(() => {
    fetchLiveExchangeRates().then(liveRates => {
      if (liveRates) setRates(liveRates);
    });
  }, []);

  // Save cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lumea_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("lumea_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("lumea_currency", currency);
  }, [currency]);

  // 4. Modals and Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // 5. Promo Code
  const [appliedPromo, setAppliedPromo] = useState(null);

  // 6. Toast System
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message = "", type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added to Bag`, `${product.name} (x${quantity}) added.`, "success");
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      showToast("Removed from Bag", `${item.product.name} removed.`, "info");
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    const exists = wishlist.some(p => p.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast("Saved to Wishlist", `Removed ${product.name}`, "info");
    } else {
      setWishlist(prev => [...prev, product]);
      showToast("Saved to Wishlist", `${product.name} added to favorites.`, "success");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(p => p.id === productId);
  };

  // Promo code validation
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setAppliedPromo({ code: clean, ...PROMO_CODES[clean] });
      showToast("Promo Code Applied!", `${PROMO_CODES[clean].description}`, "success");
      return { success: true, message: "Applied successfully!" };
    } else {
      showToast("Invalid Promo Code", "Try using code LUMEA20 for 20% off.", "warning");
      return { success: false, message: "Invalid code. Try LUMEA20" };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast("Promo Removed", "Promotional discount removed.", "info");
  };

  // Currency Converter & Formatter
  const formatPrice = (usdAmount) => {
    const safeUsd = Number(usdAmount) || 0;
    const currInfo = CURRENCIES[currency] || CURRENCIES.USD;
    const rate = rates[currency] || 1;
    const converted = safeUsd * rate;

    if (currency === "PKR") {
      return `PKR ${Math.round(converted).toLocaleString()}`;
    } else if (currency === "USD") {
      return `$${converted.toFixed(2)}`;
    } else if (currency === "EUR") {
      return `€${converted.toFixed(2)}`;
    } else if (currency === "GBP") {
      return `£${converted.toFixed(2)}`;
    } else if (currency === "AED") {
      return `AED ${converted.toFixed(2)}`;
    }
    return `${currInfo.symbol}${converted.toFixed(2)}`;
  };

  // Helper to convert USD into converted numeric amount
  const getConvertedAmount = (usdAmount) => {
    const safeUsd = Number(usdAmount) || 0;
    const rate = rates[currency] || 1;
    return safeUsd * rate;
  };

  // Calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalUsd = cart.reduce((sum, item) => sum + (item.product.priceUsd * item.quantity), 0);
  const discountPercent = appliedPromo ? appliedPromo.percent : 0;
  const discountAmountUsd = (cartSubtotalUsd * discountPercent) / 100;
  const freeShippingThresholdUsd = 50; // $50 free shipping
  const isFreeShipping = cartSubtotalUsd >= freeShippingThresholdUsd || cartSubtotalUsd === 0;
  const shippingUsd = isFreeShipping ? 0 : 5.00;
  const grandTotalUsd = Math.max(0, cartSubtotalUsd - discountAmountUsd + shippingUsd);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotalUsd,
        discountPercent,
        discountAmountUsd,
        freeShippingThresholdUsd,
        isFreeShipping,
        shippingUsd,
        grandTotalUsd,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        currencies: CURRENCIES,
        formatPrice,
        getConvertedAmount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        toasts,
        showToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
