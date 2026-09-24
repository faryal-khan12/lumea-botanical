import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Globe,
  ChevronDown
} from "lucide-react";

function Header() {
  const {
    cartTotalCount,
    wishlist,
    currency,
    setCurrency,
    currencies,
    setIsSearchOpen
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
  }, [location.pathname]);

  // Header elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>
            Complimentary Botanical Gift with orders over $50 • Enjoy <strong>20% OFF</strong> with code <span className="promo-pill">LUMEA20</span>
          </span>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className={`luxury-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo with Natural Green Tones & Accented É */}
          <Link to="/" className="luxury-logo">
            <span className="logo-main">
              LUM<span className="logo-accent-e">É</span>A
            </span>
            <span className="logo-sub">BOTANICAL APOTHECARY</span>
          </Link>

          {/* Desktop Nav Links: Home, Collection, About */}
          <nav className="desktop-nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`nav-link ${location.pathname === "/shop" ? "active" : ""}`}
            >
              Collection
            </Link>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
            >
              About
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="header-actions">
            {/* Minimalist Live Search Trigger */}
            <button
              className="action-icon-btn search-trigger"
              onClick={() => setIsSearchOpen(true)}
              title="Search collection"
              aria-label="Search collection"
            >
              <Search size={20} />
            </button>

            {/* Currency Switcher */}
            <div className="currency-selector-wrapper">
              <button
                className="currency-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                aria-expanded={currencyDropdownOpen}
                aria-label="Select Currency"
              >
                <Globe size={15} />
                <span>{currency}</span>
                <ChevronDown size={13} />
              </button>

              {currencyDropdownOpen && (
                <div className="currency-dropdown-menu">
                  {Object.keys(currencies).map((currCode) => (
                    <button
                      key={currCode}
                      className={`currency-opt-item ${currency === currCode ? "selected" : ""}`}
                      onClick={() => {
                        setCurrency(currCode);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      <span>{currencies[currCode].label}</span>
                      {currency === currCode && <span className="curr-dot">●</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to="/shop?filter=wishlist"
              className="action-icon-btn wishlist-btn"
              title="Saved Favorites"
              aria-label="View Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="badge-count wishlist-badge">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart Link with Animated Badge */}
            <Link
              to="/cart"
              className="action-icon-btn cart-btn-header"
              title="Shopping Bag"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              <span className={`badge-count cart-badge ${cartTotalCount > 0 ? "has-items" : ""}`}>
                {cartTotalCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-brand">
                <span className="logo-main">
                  LUM<span className="logo-accent-e">É</span>A
                </span>
                <span className="logo-sub">BOTANICAL APOTHECARY</span>
              </div>
              <button
                className="drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-search-box">
              <button
                className="drawer-search-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                <Search size={18} />
                <span>Search collection...</span>
              </button>
            </div>

            <nav className="drawer-nav">
              <Link to="/" className="drawer-link">
                Home
              </Link>
              <Link to="/shop" className="drawer-link">
                Shop Collection
              </Link>
              <Link to="/about" className="drawer-link">
                Our Story & Philosophy
              </Link>
              <Link to="/cart" className="drawer-link">
                Shopping Bag ({cartTotalCount})
              </Link>
            </nav>

            <div className="drawer-categories-section">
              <p className="drawer-section-title">CATEGORIES</p>
              <div className="drawer-cat-tags">
                <Link to="/shop?category=Cleansers" className="cat-chip">Cleansers</Link>
                <Link to="/shop?category=Serums" className="cat-chip">Serums</Link>
                <Link to="/shop?category=Moisturizers" className="cat-chip">Moisturizers</Link>
                <Link to="/shop?category=Face+Oils" className="cat-chip">Face Oils</Link>
              </div>
            </div>

            <div className="drawer-footer">
              <p className="drawer-section-title">CURRENCY</p>
              <div className="drawer-currency-grid">
                {Object.keys(currencies).map((currCode) => (
                  <button
                    key={currCode}
                    className={`drawer-curr-btn ${currency === currCode ? "active" : ""}`}
                    onClick={() => setCurrency(currCode)}
                  >
                    {currencies[currCode].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;