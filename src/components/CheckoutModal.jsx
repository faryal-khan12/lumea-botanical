import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { submitOrder } from "../services/api";
import confetti from "canvas-confetti";
import {
  X,
  CheckCircle2,
  CreditCard,
  Truck,
  ShieldCheck,
  Printer,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Lock
} from "lucide-react";

function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotalUsd,
    discountAmountUsd,
    appliedPromo,
    shippingUsd,
    grandTotalUsd,
    formatPrice
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Karachi",
    postalCode: "",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // "card" | "cod" | "applepay"
  const [cardData, setCardData] = useState({
    cardNumber: "**** **** **** 4242",
    expiry: "12/28",
    cvc: "888",
    cardName: ""
  });

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    if (step === 3) {
      clearCart();
    }
    setIsCheckoutOpen(false);
    setStep(1);
    setConfirmedOrder(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoToPayment = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.address) {
      alert("Please fill in the required shipping details.");
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    const orderPayload = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode
      },
      paymentMethod:
        paymentMethod === "cod"
          ? "Cash / Card on Delivery"
          : paymentMethod === "applepay"
          ? "Apple Pay"
          : "Credit / Debit Card (ending in 4242)",
      items: cart.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        priceUsd: i.product.priceUsd,
        quantity: i.quantity
      })),
      totals: {
        subtotalUsd: cartSubtotalUsd,
        discountUsd: discountAmountUsd,
        promoCode: appliedPromo?.code || null,
        shippingUsd: shippingUsd,
        grandTotalUsd: grandTotalUsd
      }
    };

    try {
      const result = await submitOrder(orderPayload);
      setConfirmedOrder(result);
      setStep(3);
      setLoading(false);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if blocked
      }
    } catch (err) {
      setLoading(false);
      alert("Order could not be submitted. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-content checkout-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        {/* Progress Header */}
        <div className="checkout-progress-bar">
          <div className={`step-node ${step >= 1 ? "active" : ""}`}>
            <span className="step-num">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-node ${step >= 2 ? "active" : ""}`}>
            <span className="step-num">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-node ${step === 3 ? "active" : ""}`}>
            <span className="step-num">3</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        {/* Step 1: Shipping Info */}
        {step === 1 && (
          <form onSubmit={handleGoToPayment} className="checkout-step-body">
            <div className="checkout-step-header">
              <h3>Shipping Information</h3>
              <p>Where should we deliver your luxury botanical ritual?</p>
            </div>

            <div className="checkout-form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="e.g. Maya"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="e.g. Lin"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Email Address (For order tracking) *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Delivery Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="House / Apt / Suite, Street address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Lahore / Karachi / Islamabad"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="e.g. 54000"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Summary preview */}
            <div className="checkout-summary-mini">
              <span>Order Total ({cart.length} items):</span>
              <strong>{formatPrice(grandTotalUsd)}</strong>
            </div>

            <div className="checkout-step-footer">
              <button
                type="button"
                className="btn-text-secondary"
                onClick={handleClose}
              >
                Return to Bag
              </button>
              <button type="submit" className="btn-primary-filled">
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="checkout-step-body">
            <div className="checkout-step-header">
              <h3>Payment & Confirmation</h3>
              <p>All transactions are 256-bit encrypted and secure.</p>
            </div>

            <div className="payment-options-list">
              {/* Cash On Delivery */}
              <label
                className={`payment-option-card ${
                  paymentMethod === "cod" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div className="payment-opt-info">
                  <Truck size={20} className="payment-opt-icon" />
                  <div>
                    <strong>Cash / Card on Delivery</strong>
                    <p>Pay comfortably when your parcel arrives at your door.</p>
                  </div>
                </div>
              </label>

              {/* Credit / Debit Card */}
              <label
                className={`payment-option-card ${
                  paymentMethod === "card" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <div className="payment-opt-info">
                  <CreditCard size={20} className="payment-opt-icon" />
                  <div>
                    <strong>Credit / Debit Card (Visa, Mastercard, Amex)</strong>
                    <p>Instant secure card processing.</p>
                  </div>
                </div>
              </label>

              {paymentMethod === "card" && (
                <div className="card-mock-form">
                  <div className="form-group full-width">
                    <label>Card Number</label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4242"
                      disabled
                      className="mock-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="12 / 28"
                      disabled
                      className="mock-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Security Code (CVC)</label>
                    <input
                      type="text"
                      defaultValue="888"
                      disabled
                      className="mock-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Totals Review */}
            <div className="checkout-totals-breakdown">
              <div className="checkout-breakdown-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotalUsd)}</span>
              </div>
              {discountAmountUsd > 0 && (
                <div className="checkout-breakdown-row discount">
                  <span>Promo Discount ({appliedPromo.code})</span>
                  <span>-{formatPrice(discountAmountUsd)}</span>
                </div>
              )}
              <div className="checkout-breakdown-row">
                <span>Shipping</span>
                <span>
                  {shippingUsd === 0 ? "FREE" : formatPrice(shippingUsd)}
                </span>
              </div>
              <div className="checkout-breakdown-row grand-total">
                <strong>Total Amount:</strong>
                <strong>{formatPrice(grandTotalUsd)}</strong>
              </div>
            </div>

            <div className="checkout-security-badge">
              <Lock size={14} />
              <span>Guaranteed Safe & Secure Checkout</span>
            </div>

            <div className="checkout-step-footer">
              <button
                type="button"
                className="btn-text-secondary"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} />
                <span>Back to Shipping</span>
              </button>
              <button
                type="button"
                className="btn-primary-filled"
                disabled={loading}
                onClick={handlePlaceOrder}
              >
                {loading ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Place Order • {formatPrice(grandTotalUsd)}</span>
                    <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && confirmedOrder && (
          <div className="checkout-step-body confirmation-step">
            <div className="confirmation-badge">
              <CheckCircle2 size={48} className="confetti-check" />
            </div>

            <h2 className="confirmation-title">Thank you for your order!</h2>
            <p className="confirmation-subtitle">
              Your botanical ritual is being lovingly packaged. A confirmation
              email has been sent to <strong>{confirmedOrder.customer.email}</strong>.
            </p>

            <div className="order-receipt-card" id="printable-receipt">
              <div className="receipt-header">
                <div>
                  <span className="receipt-label">Order Number</span>
                  <h3>{confirmedOrder.orderId}</h3>
                </div>
                <div className="receipt-date">
                  <span className="receipt-label">Order Date</span>
                  <p>{confirmedOrder.orderDate}</p>
                </div>
              </div>

              <div className="receipt-delivery">
                <Truck size={18} />
                <span>
                  Estimated Delivery: <strong>{confirmedOrder.estimatedDelivery}</strong>
                </span>
              </div>

              <div className="receipt-items-list">
                <h4>Items Ordered ({confirmedOrder.items.length})</h4>
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="receipt-item-row">
                    <span>
                      {item.name} <small>x{item.quantity}</small>
                    </span>
                    <span>{formatPrice(item.priceUsd * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-totals">
                <div className="receipt-row total">
                  <strong>Total Paid / Due:</strong>
                  <strong>{formatPrice(confirmedOrder.totals.grandTotalUsd)}</strong>
                </div>
                <p className="receipt-pay-method">
                  Payment Method: <em>{confirmedOrder.paymentMethod}</em>
                </p>
                <p className="receipt-address">
                  Ship To: <em>{confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}</em>
                </p>
              </div>
            </div>

            <div className="confirmation-actions">
              <button
                className="btn-secondary-outlined print-btn"
                onClick={() => window.print()}
              >
                <Printer size={16} />
                <span>Print Receipt</span>
              </button>
              <button className="btn-primary-filled" onClick={handleClose}>
                <ShoppingBag size={16} />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
