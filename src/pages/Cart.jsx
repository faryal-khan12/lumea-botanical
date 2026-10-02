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
  X,
  Plus,
  Minus
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

  const amountAwayFromFree = Math.max(0, freeShippingThresholdUsd - cartSubtotalUsd);
  const freeShippingProgress = Math.min(100, (cartSubtotalUsd / freeShippingThresholdUsd) * 100);

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty-container">
          <div className="empty-cart-card">
            <div className="empty-cart-icon-wrap">
              <ShoppingBag size={44} className="empty-bag-icon" />
            </div>
            <h1 className="empty-cart-title">Your Shopping Bag is Empty</h1>
            <p className="empty-cart-desc">
              Your skincare journey begins with a single mindful choice. Explore our
              cold-pressed botanical collection or take our personalized consultation quiz.
            </p>
            <div className="empty-cart-actions">
              <Link to="/shop" className="btn-primary-filled">
                <span>Discover Products</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/quiz" className="btn-secondary-outlined">
                <Sparkles size={15} />
                <span>Take Skincare Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        {/* Page Header */}
        <div className="cart-header">
          <span className="section-overhead-tag">YOUR BOTANICAL BAG</span>
          <h1 className="cart-heading">Review Bag ({cartTotalCount} {cartTotalCount === 1 ? "Item" : "Items"})</h1>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="cart-shipping-banner">
          <div className="shipping-banner-info">
            <div className="shipping-icon-wrap">
              <Truck size={18} />
            </div>
            <div className="shipping-banner-text">
              {isFreeShipping ? (
                <span>
                  <strong>Complimentary Express Shipping Unlocked!</strong> Your order qualifies for free delivery.
                </span>
              ) : (
                <span>
                  Add <strong>{formatPrice(amountAwayFromFree)}</strong> more to unlock <strong>Free Express Delivery</strong>!
                </span>
              )}
            </div>
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Grid: Items + Order Summary */}
        <div className="cart-layout-grid">
          {/* Left Column: Structured Item Blocks */}
          <div className="cart-items-column">
            <div className="cart-items-list-header">
              <span className="items-list-title">Selected Formulas</span>
              <span className="items-list-count">{cart.length} unique {cart.length === 1 ? "product" : "products"}</span>
            </div>

            <div className="cart-blocks-list">
              {cart.map((item, index) => {
                const itemNumber = String(index + 1).padStart(2, "0");
                const itemTotal = item.product.priceUsd * item.quantity;

                return (
                  <div key={item.product.id} className="cart-product-block">
                    {/* Block Header */}
                    <div className="cart-block-top">
                      <div className="cart-block-index-wrap">
                        <span className="cart-block-index">ITEM {itemNumber}</span>
                        <span className="cart-block-category">{item.product.category}</span>
                      </div>
                      <button
                        className="cart-remove-item-btn"
                        onClick={() => removeFromCart(item.product.id)}
                        title="Remove product"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={15} />
                        <span>Remove</span>
                      </button>
                    </div>

                    {/* Block Content */}
                    <div className="cart-block-body">
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${item.product.id}`}
                        className="cart-block-image-link"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="cart-block-thumb"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="cart-block-info">
                        <h2 className="cart-block-name">
                          <Link to={`/product/${item.product.id}`}>
                            {item.product.name}
                          </Link>
                        </h2>

                        {item.product.volume && (
                          <span className="cart-block-volume">
                            Size: {item.product.volume}
                          </span>
                        )}

                        <p className="cart-block-desc">
                          {item.product.description}
                        </p>

                        {item.product.keyIngredients && item.product.keyIngredients.length > 0 && (
                          <div className="cart-block-ingredients">
                            <span className="ingredients-label">Key Actives:</span>
                            {item.product.keyIngredients.slice(0, 3).map((ing, i) => (
                              <span key={i} className="ingredient-chip">
                                {ing}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Block Footer / Pricing & Controls */}
                    <div className="cart-block-bottom">
                      <div className="cart-block-pricing">
                        <span className="unit-price-label">Unit Price:</span>
                        <span className="unit-price-val">
                          {formatPrice(item.product.priceUsd)}
                        </span>
                      </div>

                      <div className="cart-stepper-wrap">
                        <span className="stepper-label">Qty:</span>
                        <div className="cart-stepper">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            aria-label="Decrease quantity"
                            className="stepper-btn"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="stepper-value">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            aria-label="Increase quantity"
                            className="stepper-btn"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="cart-block-subtotal">
                        <span className="subtotal-label">Subtotal:</span>
                        <span className="subtotal-val">{formatPrice(itemTotal)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Bottom Actions */}
            <div className="cart-bottom-actions">
              <Link to="/shop" className="btn-continue-shopping">
                ← Continue Browsing Collection
              </Link>
              <button onClick={clearCart} className="btn-clear-cart">
                <Trash2 size={14} />
                <span>Clear Bag</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="cart-summary-column">
            <div className="order-summary-card">
              <h2 className="summary-title">Order Summary</h2>

              {/* Promo Code Form */}
              <div className="cart-promo-section">
                {appliedPromo ? (
                  <div className="cart-applied-promo">
                    <div className="applied-promo-info">
                      <Tag size={15} className="promo-tag-icon" />
                      <div>
                        <strong>{appliedPromo.code}</strong>
                        <span>{appliedPromo.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="promo-remove-btn"
                      title="Remove promo"
                      aria-label="Remove promo code"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="promo-form">
                    <div className="promo-input-box">
                      <Tag size={15} className="promo-input-icon" />
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
                    <button type="submit" className="promo-submit-btn">
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="promo-error">{promoError}</p>}
                {!appliedPromo && (
                  <p className="promo-tip">
                    Tip: Use code <strong>LUMEA20</strong> for 20% off your order.
                  </p>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Bag Subtotal</span>
                  <span>{formatPrice(cartSubtotalUsd)}</span>
                </div>

                {discountAmountUsd > 0 && (
                  <div className="summary-row discount">
                    <span>Special Discount ({appliedPromo?.percent}%)</span>
                    <span>-{formatPrice(discountAmountUsd)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  <span>{shippingUsd === 0 ? "FREE" : formatPrice(shippingUsd)}</span>
                </div>

                <div className="summary-row grand-total">
                  <span>Estimated Total</span>
                  <span className="total-amount">{formatPrice(grandTotalUsd)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="btn-primary-filled cart-checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              {/* Trust & Guarantee Badges */}
              <div className="cart-guarantee-list">
                <div className="guarantee-item">
                  <ShieldCheck size={16} className="guarantee-icon" />
                  <span>256-Bit SSL Encrypted & Secure Checkout</span>
                </div>
                <div className="guarantee-item">
                  <CheckCircle2 size={16} className="guarantee-icon" />
                  <span>30-Day Radiant Skin Guarantee & Free Returns</span>
                </div>
                <div className="guarantee-item">
                  <Truck size={16} className="guarantee-icon" />
                  <span>Dispatches within 24 hours in amber glass packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;