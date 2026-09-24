import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  Sparkles,
  X
} from "lucide-react";

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotalCount,
    cartSubtotalUsd,
    discountAmountUsd,
    freeShippingThresholdUsd,
    isFreeShipping,
    shippingUsd,
    grandTotalUsd,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setIsCheckoutOpen
  } = useStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError("");
      setPromoInput("");
    }
  };

  // Free shipping calculation
  const amountAwayFromFree = Math.max(0, freeShippingThresholdUsd - cartSubtotalUsd);
  const freeShippingProgress = Math.min(100, (cartSubtotalUsd / freeShippingThresholdUsd) * 100);

  if (cart.length === 0) {
    return (
      <main className="cart-page-empty">
        <div className="empty-cart-card">
          <div className="empty-icon-wrap">
            <ShoppingBag size={48} className="empty-bag-icon" />
          </div>
          <h1>Your Shopping Bag is Empty</h1>
          <p>
            Your skincare journey begins with a single mindful ritual. Explore our
            pure botanical formulations or take our personalized consultation quiz.
          </p>
          <div className="empty-actions-row">
            <Link to="/shop" className="btn-primary-filled">
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/quiz" className="btn-secondary-outlined">
              <Sparkles size={16} />
              <span>Take Routine Quiz</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page-full">
      {/* Page Header */}
      <section className="cart-hero-header">
        <span className="section-overhead-tag">YOUR BOTANICAL SELECTION</span>
        <h1>Shopping Bag ({cartTotalCount} items)</h1>
      </section>

      {/* Free Shipping Progress Meter */}
      <div className="free-shipping-progress-banner">
        <div className="shipping-progress-text">
          <Truck size={20} className="shipping-icon" />
          {isFreeShipping ? (
            <span>
              <strong>Congratulations!</strong> You have unlocked <strong>Free Express Delivery</strong>.
            </span>
          ) : (
            <span>
              Add <strong>{formatPrice(amountAwayFromFree)}</strong> more to unlock <strong>Complimentary Express Shipping</strong>!
            </span>
          )}
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${freeShippingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Cart Grid */}
      <div className="cart-layout-grid">
        {/* Items Column */}
        <div className="cart-items-column">
          <div className="cart-table-header">
            <span>Product Ritual</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item-row">
                {/* Media & Title */}
                <div className="cart-item-info">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-thumb-img"
                    />
                  </Link>
                  <div className="cart-meta-col">
                    <span className="cart-cat-text">{item.product.category}</span>
                    <h3 className="cart-item-name">
                      <Link to={`/product/${item.product.id}`}>
                        {item.product.name}
                      </Link>
                    </h3>
                    <span className="cart-unit-price">
                      {formatPrice(item.product.priceUsd)}
                    </span>
                    <button
                      className="cart-remove-mobile-btn"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="cart-item-qty">
                  <div className="quantity-stepper">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Item Total & Desktop Delete */}
                <div className="cart-item-total">
                  <span className="item-calculated-price">
                    {formatPrice(item.product.priceUsd * item.quantity)}
                  </span>
                  <button
                    className="cart-delete-desktop-btn"
                    onClick={() => removeFromCart(item.product.id)}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-items-footer-actions">
            <Link to="/shop" className="continue-shopping-link">
              ← Continue Discovering Products
            </Link>
            <button onClick={clearCart} className="btn-text-clear">
              Clear Entire Bag
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary-column">
          <div className="summary-card">
            <h3>Order Summary</h3>

            {/* Promo Code Box */}
            <div className="promo-code-container">
              {appliedPromo ? (
                <div className="applied-promo-tag">
                  <div className="applied-promo-left">
                    <Tag size={16} />
                    <div>
                      <strong>{appliedPromo.code}</strong>
                      <p>{appliedPromo.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="remove-promo-btn"
                    title="Remove discount"
                    aria-label="Remove promo code"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="promo-input-form">
                  <div className="promo-input-wrapper">
                    <Tag size={16} className="promo-icon" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LUMEA20)"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError("");
                      }}
                    />
                  </div>
                  <button type="submit" className="promo-apply-btn">
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="promo-error-msg">{promoError}</p>}
            </div>

            {/* Breakdown */}
            <div className="summary-breakdown-list">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotalUsd)}</span>
              </div>

              {discountAmountUsd > 0 && (
                <div className="breakdown-row discount-row">
                  <span>
                    Special Discount ({appliedPromo.percent}%)
                  </span>
                  <span>-{formatPrice(discountAmountUsd)}</span>
                </div>
              )}

              <div className="breakdown-row">
                <span>Estimated Shipping</span>
                <span>{shippingUsd === 0 ? "FREE" : formatPrice(shippingUsd)}</span>
              </div>

              <div className="breakdown-row total-row">
                <strong>Grand Total</strong>
                <strong>{formatPrice(grandTotalUsd)}</strong>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-primary-filled checkout-trigger-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Guarantee Signals */}
            <div className="summary-perks">
              <div className="summary-perk-item">
                <ShieldCheck size={18} />
                <span>256-Bit SSL Encrypted & Secure Checkout</span>
              </div>
              <div className="summary-perk-item">
                <CheckCircle2 size={18} />
                <span>30-Day Happiness Guarantee & Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;