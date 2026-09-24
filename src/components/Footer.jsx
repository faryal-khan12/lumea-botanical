import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  RefreshCw,
  ArrowRight
} from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="luxury-footer">
      {/* Refined Botanical Consultation Banner */}
      <div className="footer-quiz-banner">
        <div className="footer-quiz-inner">
          <div className="footer-quiz-text">
            <span className="quiz-banner-tag">
              <Leaf size={13} /> BOTANICAL CONSULTATION
            </span>
            <h3>Discover your personalized skincare ritual</h3>
            <p>
              Answer four quick questions to find the biocompatible botanicals tailored
              precisely to your unique skin profile.
            </p>
          </div>
          <Link to="/quiz" className="btn-primary-filled footer-quiz-cta">
            <span>Begin Consultation</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Brand Trust Bar */}
      <div className="footer-trust-bar">
        <div className="trust-grid">
          <div className="trust-item">
            <Leaf size={22} className="trust-icon" />
            <div>
              <h4>100% Botanical Actives</h4>
              <p>Formulated without sulfates, parabens, or synthetic fragrance.</p>
            </div>
          </div>

          <div className="trust-item">
            <ShieldCheck size={22} className="trust-icon" />
            <div>
              <h4>Dermatologist Tested</h4>
              <p>Clinically evaluated for hypoallergenic safety on sensitive skin.</p>
            </div>
          </div>

          <div className="trust-item">
            <RefreshCw size={22} className="trust-icon" />
            <div>
              <h4>Sustainable Packaging</h4>
              <p>100% recyclable amber glass and FSC-certified cartons.</p>
            </div>
          </div>

          <div className="trust-item">
            <HeartHandshake size={22} className="trust-icon" />
            <div>
              <h4>Cruelty-Free Always</h4>
              <p>Never tested on animals. Leaping Bunny certified ethical beauty.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-main">
                LUM<span className="logo-accent-e">É</span>A
              </span>
              <span className="logo-sub">BOTANICAL APOTHECARY</span>
            </Link>
            <p className="footer-desc">
              Thoughtfully curated botanical skincare crafted to awaken natural radiance through mindful daily rituals.
            </p>
            <div className="footer-newsletter">
              <h4>Receive Our Seasonal Journal</h4>
              <p>Mindful skincare rituals, botanical discoveries, and private event invitations.</p>
              {subscribed ? (
                <div className="newsletter-success">
                  <CheckCircle2 size={16} />
                  <span>Welcome to the LUMÉA circle.</span>
                </div>
              ) : (
                <form className="footer-subscribe-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="footer-input"
                  />
                  <button type="submit" className="footer-submit-btn">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Collections</h3>
            <ul className="footer-links">
              <li><Link to="/shop">All Formulations</Link></li>
              <li><Link to="/shop?category=Cleansers">Botanical Cleansers</Link></li>
              <li><Link to="/shop?category=Serums">Active Serums</Link></li>
              <li><Link to="/shop?category=Moisturizers">Barrier Moistures</Link></li>
              <li><Link to="/shop?category=Face+Oils">Pure Plant Oils</Link></li>
              <li><Link to="/shop?category=Toners+%26+Mists">Balancing Mists</Link></li>
            </ul>
          </div>

          {/* Consultation & Learn */}
          <div className="footer-col">
            <h3>The Formulary</h3>
            <ul className="footer-links">
              <li><Link to="/quiz">Botanical Consultation</Link></li>
              <li><Link to="/about">Our Philosophy</Link></li>
              <li><Link to="/about#sustainability">Sustainability Pledge</Link></li>
              <li><Link to="/about#ingredients">Ingredient Glossary</Link></li>
              <li><Link to="/about#faq">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h3>Client Concierge</h3>
            <ul className="footer-links">
              <li><a href="#shipping">Complimentary Shipping Policy</a></li>
              <li><a href="#returns">30-Day Happiness Guarantee</a></li>
              <li><a href="#track">Track Your Package</a></li>
              <li><a href="#contact">Contact Apothecary Team</a></li>
              <li><a href="#privacy">Privacy & Ethical Standards</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Payment Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>© 2026 LUMÉA Botanical Apothecary Ltd. All rights reserved.</p>
          <div className="payment-badges-row">
            <span className="pay-tag">Visa</span>
            <span className="pay-tag">Mastercard</span>
            <span className="pay-tag">American Express</span>
            <span className="pay-tag">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
