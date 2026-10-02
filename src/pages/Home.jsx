import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  Droplets,
  Star
} from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter products based on active tab — curated, compact, and uncrowded
  const getFilteredProducts = () => {
    if (activeTab === "serums") {
      return products.filter((p) => p.category === "Serums").slice(0, 4);
    }
    if (activeTab === "moisturizers") {
      return products.filter((p) => p.category === "Moisturizers").slice(0, 4);
    }
    if (activeTab === "cleansers") {
      return products.filter((p) => p.category === "Cleansers").slice(0, 4);
    }
    if (activeTab === "oils") {
      return products.filter((p) => p.category === "Face Oils").slice(0, 4);
    }
    // "all" default: 4 core daily essentials
    return products.slice(0, 4);
  };

  const displayProducts = getFilteredProducts();

  const testimonials = [
    {
      id: 1,
      quote:
        "The Pure Hyaluronic Hydrating Serum and Barrier Cream transformed my chronic dry patches in just three days. My skin has never looked this alive and supple.",
      author: "Dr. Elena Vance",
      title: "Dermatology Resident & Verified Patron",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      quote:
        "I was hesitant about oils on my combination skin, but the Rosehip Glow Oil absorbs like a dream. It gives an effortless candlelit glow without grease.",
      author: "Amina Al-Mansoor",
      title: "Beauty Editor",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      quote:
        "LUMÉA's minimalism is refreshing. Four thoughtfully crafted steps instead of an overwhelming 10-step routine that clogs pores. Truly exemplary.",
      author: "Maya Lin-Carter",
      title: "Holistic Wellness Director",
      rating: 5,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <main className="home-page-container">
      {/* 1. Hero Cover Banner Section (Full Spread with Left Fade) */}
      <section className="luxury-hero-banner">
        {/* Cover Photo Spread on All Cover */}
        <div className="hero-banner-media">
          <img
            src={`${import.meta.env.BASE_URL}images/lumea_cover_model.jpg`}
            alt="Woman applying LUMÉA Hyaluronic Serum with glass dropper bottle"
            className="hero-banner-img"
          />
          {/* Faded overlay on the left side */}
          <div className="hero-banner-gradient-overlay"></div>
        </div>

        {/* Content Container (Positioned on the Left over Faded Side) */}
        <div className="hero-banner-content-container">
          <div className="hero-text-block">
            <h1 className="hero-main-title">
              Effortless skincare.
              <br />
              <em>Naturally transcendent.</em>
            </h1>

            <p className="hero-subtext">
              Artisan botanical elixirs and biocompatible barrier repairs.
              Crafted in micro-batches with high-potency actives designed to nurture
              your skin's natural biological harmony.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop" className="btn-primary-filled hero-primary-btn">
                <span>Shop The Collection</span>
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <strong>100%</strong>
                <span>Clean Actives</span>
              </div>
              <div className="stat-separator">/</div>
              <div className="hero-stat-item">
                <strong>4.9 ★</strong>
                <span>Client Rating</span>
              </div>
              <div className="stat-separator">/</div>
              <div className="hero-stat-item">
                <strong>30-Day</strong>
                <span>Skin Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Pillars */}
      <section className="brand-pillars-bar">
        <div className="pillars-container">
          <div className="pillar-card">
            <Leaf size={22} className="pillar-icon" />
            <div>
              <h4>Ethnobotanical Sourcing</h4>
              <p>Certified organic, cold-pressed plant botanicals.</p>
            </div>
          </div>

          <div className="pillar-card">
            <ShieldCheck size={22} className="pillar-icon" />
            <div>
              <h4>Biocompatible Efficacy</h4>
              <p>Formulated at skin's natural 5.5 pH balance.</p>
            </div>
          </div>

          <div className="pillar-card">
            <Droplets size={22} className="pillar-icon" />
            <div>
              <h4>Deep Cellular Quench</h4>
              <p>Triple molecular weight hydration technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Collection Section */}
      <section className="featured-section">
        <div className="section-head-center">
          <span className="section-overhead-tag">OUR APOTHECARY</span>
          <h2 className="section-title">The Core Essentials</h2>
          <p className="section-desc">
            Discover formulas crafted with pure botanical extracts, ceramides, and vitamins.
          </p>

          {/* Clean, Refined Category Tabs */}
          <div className="collection-tabs">
            <button
              className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`tab-btn ${activeTab === "serums" ? "active" : ""}`}
              onClick={() => setActiveTab("serums")}
            >
              Serums
            </button>
            <button
              className={`tab-btn ${activeTab === "moisturizers" ? "active" : ""}`}
              onClick={() => setActiveTab("moisturizers")}
            >
              Moisturizers & Lotions
            </button>
            <button
              className={`tab-btn ${activeTab === "cleansers" ? "active" : ""}`}
              onClick={() => setActiveTab("cleansers")}
            >
              Cleansers
            </button>
            <button
              className={`tab-btn ${activeTab === "oils" ? "active" : ""}`}
              onClick={() => setActiveTab("oils")}
            >
              Face Oils
            </button>
          </div>
        </div>

        {/* Compact, Clean, Luxury 4-Product Grid */}
        <div className="featured-products-grid">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line price"></div>
              </div>
            ))
          ) : (
            displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        <div className="section-bottom-action">
          <Link to="/shop" className="btn-secondary-outlined view-all-btn">
            <span>Explore Complete Collection (8 Formulations)</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4. Editorial Philosophy Spotlight */}
      <section className="philosophy-spotlight">
        <div className="philosophy-grid">
          <div className="philosophy-visual">
            <img
              src={`${import.meta.env.BASE_URL}images/lumea_oil.jpg`}
              alt="Botanical Ingredients"
            />
          </div>
          <div className="philosophy-text">
            <span className="section-overhead-tag">OUR PHILOSOPHY</span>
            <h2>Skincare without unnecessary noise.</h2>
            <p>
              The modern beauty industry often overwhelms our skin with complicated
              multi-step routines, harsh chemical cocktails, and filler ingredients.
            </p>
            <p>
              At LUMÉA, we strip away the superfluous. Every single formulation is
              concentrated with biocompatible botanicals that speak your skin’s cellular
              language. Gentle yet profoundly transformative.
            </p>
            <div className="philosophy-bullets">
              <div className="bullet-point">
                <strong>01 / Pure Potency:</strong> Cold-pressed oils and standardized bio-actives.
              </div>
              <div className="bullet-point">
                <strong>02 / Microbiome Friendly:</strong> Supports rather than disrupts protective acid mantle.
              </div>
              <div className="bullet-point">
                <strong>03 / Radical Transparency:</strong> Every single ingredient is disclosed with its botanical purpose.
              </div>
            </div>
            <Link to="/about" className="btn-secondary-outlined philosophy-link">
              <span>Read Our Full Story</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="testimonials-section">
        <div className="section-head-center">
          <span className="section-overhead-tag">VOICES OF RADIANCE</span>
          <h2 className="section-title">Loved by Conscious Skin Advocates</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-rating">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={15} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author-row">
                <img src={t.image} alt={t.author} className="author-avatar" />
                <div>
                  <h4 className="author-name">{t.author}</h4>
                  <span className="author-title">{t.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;