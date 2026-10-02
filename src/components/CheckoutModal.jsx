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
  Lock,
  Clock,
  Sparkles
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

  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" | "card"
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
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.address.trim() || !formData.phone.trim()) {
      alert("Please fill in all required shipping fields.");
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

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      setLoading(false);
      alert("Order could not be submitted. Please try again.");
    }
  };

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div
        className="checkout-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-heading"
      >
        {/* Close Button */}
        <button
          className="checkout-close-btn"
          onClick={handleClose}
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        {/* Step Progress Bar */}
        <div className="checkout-stepper-header">
          <div className={`checkout-step-item ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
            <span className="step-circle">{step > 1 ? <CheckCircle2 size={16} /> : "1"}</span>
            <span className="step-text">Shipping</span>
          </div>
          <div className={`step-connector ${step >= 2 ? "active" : ""}`}></div>
          <div className={`checkout-step-item ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
            <span className="step-circle">{step > 2 ? <CheckCircle2 size={16} /> : "2"}</span>
            <span className="step-text">Payment</span>
          </div>
          <div className={`step-connector ${step === 3 ? "active" : ""}`}></div>
          <div className={`checkout-step-item ${step === 3 ? "active completed" : ""}`}>
            <span className="step-circle">3</span>
            <span className="step-text">Confirmation</span>
          </div>
        </div>

        {/* STEP 1: Shipping Details */}
        {step === 1 && (
          <form onSubmit={handleGoToPayment} className="checkout-body">
            <div className="checkout-section-intro">
              <h2 id="checkout-heading" className="checkout-title">
                Delivery Details
              </h2>
              <p className="checkout-subtitle">
                Enter your shipping address where your fresh botanical formulations will be delivered.
              </p>
            </div>

            <div className="checkout-fields-grid">
              <div className="checkout-form-field">
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  required
                  placeholder="e.g. Maya"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="e.g. Lin"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-field full-width">
                <label htmlFor="email">Email Address * (For order dispatch updates)</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-field full-width">
                <label htmlFor="phone">Phone Number * (For courier contact)</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-field full-width">
                <label htmlFor="address">Street Address * (Apartment, Suite, Unit, Street)</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. House 42, Street 12, Phase 5"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-field">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Karachi / Lahore / Islamabad"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-field">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  placeholder="e.g. 74200"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Mini Order Summary */}
            <div className="checkout-order-mini-bar">
              <div className="mini-bar-left">
                <ShoppingBag size={16} />
                <span>
                  <strong>{cart.length} {cart.length === 1 ? "Product" : "Products"}</strong> in bag
                </span>
              </div>
              <div className="mini-bar-right">
                <span>Total Due:</span>
                <strong>{formatPrice(grandTotalUsd)}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="checkout-actions-row">
              <button
                type="button"
                className="checkout-cancel-btn"
                onClick={handleClose}
              >
                Back to Bag
              </button>
              <button type="submit" className="btn-primary-filled checkout-submit-btn">
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment & Review */}
        {step === 2 && (
          <div className="checkout-body">
            <div className="checkout-section-intro">
              <h2 className="checkout-title">Payment Method</h2>
              <p className="checkout-subtitle">
                Select your preferred payment option. All transactions are securely processed.
              </p>
            </div>

            <div className="checkout-payment-methods">
              {/* Cash On Delivery Option */}
              <label
                className={`checkout-payment-card ${
                  paymentMethod === "cod" ? "active" : ""
                }`}
              >
                <div className="payment-radio-wrap">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                </div>
                <div className="payment-card-body">
                  <div className="payment-card-title-row">
                    <Truck size={18} className="payment-icon" />
                    <strong>Cash or Card on Delivery</strong>
                    <span className="payment-badge-pill">Most Popular</span>
                  </div>
                  <p className="payment-card-desc">
                    Pay safely with cash or mobile card machine when your parcel is delivered to your doorstep.
                  </p>
                </div>
              </label>

              {/* Card Payment Option */}
              <label
                className={`checkout-payment-card ${
                  paymentMethod === "card" ? "active" : ""
                }`}
              >
                <div className="payment-radio-wrap">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                </div>
                <div className="payment-card-body">
                  <div className="payment-card-title-row">
                    <CreditCard size={18} className="payment-icon" />
                    <strong>Credit / Debit Card</strong>
                    <span className="payment-badge-pill">Instant Dispatch</span>
                  </div>
                  <p className="payment-card-desc">
                    Encrypted card checkout supporting Visa, Mastercard, and UnionPay.
                  </p>
                </div>
              </label>

              {paymentMethod === "card" && (
                <div className="checkout-card-preview-box">
                  <div className="checkout-form-field full-width">
                    <label>Card Number</label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      disabled
                      className="card-disabled-input"
                    />
                  </div>
                  <div className="card-fields-split">
                    <div className="checkout-form-field">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        defaultValue="12 / 28"
                        disabled
                        className="card-disabled-input"
                      />
                    </div>
                    <div className="checkout-form-field">
                      <label>Security Code</label>
                      <input
                        type="text"
                        defaultValue="888"
                        disabled
                        className="card-disabled-input"
                      />
                    </div>
                  </div>
                  <div className="mock-card-note">
                    <Lock size={12} />
                    <span>Test mode active: Demo card preloaded for seamless testing</span>
                  </div>
                </div>
              )}
            </div>

            {/* Breakdown Card */}
            <div className="checkout-recap-card">
              <div className="recap-row">
                <span>Subtotal ({cart.length} items)</span>
                <span>{formatPrice(cartSubtotalUsd)}</span>
              </div>
              {discountAmountUsd > 0 && (
                <div className="recap-row discount">
                  <span>Special Discount ({appliedPromo?.code})</span>
                  <span>-{formatPrice(discountAmountUsd)}</span>
                </div>
              )}
              <div className="recap-row">
                <span>Shipping Delivery</span>
                <span>{shippingUsd === 0 ? "FREE" : formatPrice(shippingUsd)}</span>
              </div>
              <div className="recap-row total">
                <strong>Total Due</strong>
                <strong className="recap-total-val">{formatPrice(grandTotalUsd)}</strong>
              </div>
            </div>

            <div className="checkout-trust-guarantee">
              <ShieldCheck size={15} />
              <span>Backed by LUMÉA 30-Day Happiness Guarantee & 256-Bit SSL Protection</span>
            </div>

            {/* Actions */}
            <div className="checkout-actions-row">
              <button
                type="button"
                className="checkout-cancel-btn"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={15} />
                <span>Back to Shipping</span>
              </button>
              <button
                type="button"
                className="btn-primary-filled checkout-submit-btn"
                disabled={loading}
                onClick={handlePlaceOrder}
              >
                {loading ? (
                  <span>Processing Ritual Order...</span>
                ) : (
                  <>
                    <span>Confirm Order • {formatPrice(grandTotalUsd)}</span>
                    <CheckCircle2 size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 3 && confirmedOrder && (
          <div className="checkout-body checkout-confirmation-body">
            <div className="confirmation-header">
              <div className="confirmation-success-icon">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="confirmation-title">Your Order is Confirmed!</h2>
              <p className="confirmation-subtitle">
                Thank you for choosing LUMÉA. We have sent a detailed order confirmation and receipt
                to <strong>{confirmedOrder.customer.email}</strong>.
              </p>
            </div>

            <div className="confirmation-receipt-box" id="printable-receipt">
              <div className="receipt-meta-grid">
                <div className="receipt-meta-item">
                  <span className="receipt-meta-label">Order Reference</span>
                  <strong className="receipt-order-id">{confirmedOrder.orderId}</strong>
                </div>
                <div className="receipt-meta-item">
                  <span className="receipt-meta-label">Order Date</span>
                  <span>{confirmedOrder.orderDate}</span>
                </div>
                <div className="receipt-meta-item">
                  <span className="receipt-meta-label">Payment Method</span>
                  <span>{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="receipt-meta-item">
                  <span className="receipt-meta-label">Estimated Delivery</span>
                  <span>{confirmedOrder.estimatedDelivery}</span>
                </div>
              </div>

              <div className="receipt-delivery-info">
                <Truck size={16} />
                <span>
                  Shipping to: <strong>{confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}</strong>
                </span>
              </div>

              <div className="receipt-items-table">
                <div className="receipt-table-header">
                  <span>Ordered Item</span>
                  <span>Total</span>
                </div>
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="receipt-item-line">
                    <span className="receipt-item-title">
                      {item.name} <small>× {item.quantity}</small>
                    </span>
                    <span className="receipt-item-price">
                      {formatPrice(item.priceUsd * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="receipt-final-total">
                <span>Total Amount:</span>
                <strong>{formatPrice(confirmedOrder.totals.grandTotalUsd)}</strong>
              </div>
            </div>

            <div className="confirmation-actions">
              <button
                className="btn-secondary-outlined print-receipt-btn"
                onClick={() => window.print()}
              >
                <Printer size={15} />
                <span>Print Receipt</span>
              </button>
              <button
                className="btn-primary-filled continue-btn"
                onClick={handleClose}
              >
                <ShoppingBag size={15} />
                <span>Return to Store</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
