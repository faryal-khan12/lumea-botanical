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
  ChevronDown,
  ChevronRight,
  Sparkles
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
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [currencyExpanded, setCurrencyExpanded] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scrolling while mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
          {/* Mobile Menu Button ("Three-Line Bar") */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              <Search size={19} />
            </button>

            {/* Currency Switcher (Hidden on mobile where it's cleanly available in drawer) */}
            <div className="currency-selector-wrapper header-currency-desktop">
              <button
                className="currency-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                aria-expanded={currencyDropdownOpen}
                aria-label="Select Currency"
              >
                <Globe size={14} />
                <span>{currency}</span>
                <ChevronDown size={12} />
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
              <Heart size={19} />
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
              <ShoppingBag size={19} />
              <span className={`badge-count cart-badge ${cartTotalCount > 0 ? "has-items" : ""}`}>
                {cartTotalCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Navigation Drawer (Simplified & Defined Row Form) */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            {/* Header: Brand Logo & Close Button */}
            <div className="drawer-header">
              <Link
                to="/"
                className="drawer-brand"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="logo-main">
                  LUM<span className="logo-accent-e">É</span>A
                </span>
                <span className="logo-sub">BOTANICAL APOTHECARY</span>
              </Link>
              <button
                className="drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Container with Simplified, Defined Rows */}
            <div className="drawer-scroll-body simple-drawer-body">
              <p className="drawer-section-heading">EXPLORE LUMÉA</p>

              <div className="drawer-menu-rows">
                {/* 1. Home */}
                <Link
                  to="/"
                  className={`drawer-row-item ${location.pathname === "/" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="drawer-row-label">Home</span>
                  <ChevronRight size={15} className="drawer-row-arrow" />
                </Link>

                {/* 2. Collection */}
                <Link
                  to="/shop"
                  className={`drawer-row-item ${location.pathname === "/shop" && !location.search ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="drawer-row-label">Collection</span>
                  <ChevronRight size={15} className="drawer-row-arrow" />
                </Link>

                {/* 3. Categories (Clean Accordion Row) */}
                <div className="drawer-accordion-block">
                  <button
                    type="button"
                    className={`drawer-row-item drawer-accordion-btn ${categoriesExpanded ? "open" : ""}`}
                    onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                    aria-expanded={categoriesExpanded}
                  >
                    <span className="drawer-row-label">Categories</span>
                    <ChevronDown
                      size={15}
                      className={`drawer-chevron ${categoriesExpanded ? "rotate" : ""}`}
                    />
                  </button>

                  {categoriesExpanded && (
                    <div className="drawer-sub-categories-list">
                      <Link
                        to="/shop?category=Cleansers"
                        className="drawer-sub-row-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>Cleansers</span>
                        <ChevronRight size={13} className="sub-arrow" />
                      </Link>
                      <Link
                        to="/shop?category=Serums"
                        className="drawer-sub-row-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>Serums</span>
                        <ChevronRight size={13} className="sub-arrow" />
                      </Link>
                      <Link
                        to="/shop?category=Moisturizers"
                        className="drawer-sub-row-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>Moisturizers</span>
                        <ChevronRight size={13} className="sub-arrow" />
                      </Link>
                      <Link
                        to="/shop?category=Face+Oils"
                        className="drawer-sub-row-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>Face Oils</span>
                        <ChevronRight size={13} className="sub-arrow" />
                      </Link>
                      <Link
                        to="/shop?category=Toners+%26+Mists"
                        className="drawer-sub-row-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>Toners & Mists</span>
                        <ChevronRight size={13} className="sub-arrow" />
                      </Link>
                      <Link
                        to="/shop?category=Masks+%26+Treatments"
                        className="drawer-sub-row-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>Treatments</span>
                        <ChevronRight size={13} className="sub-arrow" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* 4. About */}
                <Link
                  to="/about"
                  className={`drawer-row-item ${location.pathname === "/about" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="drawer-row-label">About</span>
                  <ChevronRight size={15} className="drawer-row-arrow" />
                </Link>

                {/* 5. Currency (Accordion Row Included in Sections) */}
                <div className="drawer-accordion-block">
                  <button
                    type="button"
                    className={`drawer-row-item drawer-accordion-btn ${currencyExpanded ? "open" : ""}`}
                    onClick={() => setCurrencyExpanded(!currencyExpanded)}
                    aria-expanded={currencyExpanded}
                  >
                    <span className="drawer-row-label">
                      Currency <span className="drawer-row-active-curr">({currencies[currency]?.symbol || "$"} {currency})</span>
                    </span>
                    <ChevronDown
                      size={15}
                      className={`drawer-chevron ${currencyExpanded ? "rotate" : ""}`}
                    />
                  </button>

                  {currencyExpanded && (
                    <div className="drawer-sub-currency-list">
                      {Object.keys(currencies).map((currCode) => (
                        <button
                          key={currCode}
                          type="button"
                          className={`drawer-sub-curr-item ${currency === currCode ? "active" : ""}`}
                          onClick={() => {
                            setCurrency(currCode);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <span className="sub-curr-label">{currencies[currCode].label}</span>
                          <span className="sub-curr-code-pill">
                            {currency === currCode ? "Active ✓" : `${currencies[currCode].symbol} ${currCode}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;