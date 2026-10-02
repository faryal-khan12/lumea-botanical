import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowRight,
  Sparkles
} from "lucide-react";

function About() {
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = [
    {
      index: "01",
      title: "First Cold-Pressed Botanicals",
      desc: "Extracted without heat or harsh chemical solvents to preserve 100% of live polyphenols and vital lipid nutrients."
    },
    {
      index: "02",
      title: "Amber Glass Apothecary",
      desc: "Packaged in infinitely recyclable pharmaceutical amber glass that naturally shields delicate plant actives from UV light."
    },
    {
      index: "03",
      title: "100% Vegan & Cruelty-Free",
      desc: "Certified cruelty-free by Leaping Bunny. Never tested on animals, and formulated entirely without animal-derived lipids."
    }
  ];

  const faqs = [
    {
      q: "Are LUMÉA formulations suitable for reactive or sensitive skin?",
      a: "Yes. Every formula is dermatologist-tested on sensitive skin panels and balanced to a biocompatible 5.5 pH. We exclude artificial dyes, synthetic perfumes, sulfates, and drying alcohols."
    },
    {
      q: "Where are your botanical extracts and oils sourced?",
      a: "We work directly with certified organic, ethical smallholder farms in France, Bulgaria, and the Mediterranean to ensure pure traceability and sustainable harvesting."
    },
    {
      q: "How should I store my products to maintain botanical freshness?",
      a: "Keep your bottles in a cool, dry spot away from direct sunlight. Our heavy amber glass bottles naturally filter UV light to protect delicate botanical actives."
    },
    {
      q: "What is your 30-Day Radiant Skin Guarantee?",
      a: "If a formula isn't the perfect match for your skin, simply reach out to our concierge within 30 days of receipt for an effortless refund or product consultation."
    }
  ];

  return (
    <main className="about-page">
      {/* 1. Serene, Uncrowded Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <span className="section-overhead-tag">OUR BOTANICAL PHILOSOPHY</span>
          <h1 className="about-hero-heading">
            Honoring your skin's natural intelligence.
          </h1>
          <p className="about-hero-subheading">
            LUMÉA was founded on a simple premise: daily skincare should be a peaceful,
            restorative ritual — not an overwhelming marathon of harsh synthetic chemicals.
          </p>
        </div>
      </section>

      {/* 2. Brand Story / Formulation Standards (Clean & Decent) */}
      <section className="about-story">
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-media">
              <div className="about-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80"
                  alt="Apothecary botanicals and amber glass"
                  className="about-image"
                />
              </div>
              <p className="about-image-caption">
                Compounded weekly in small micro-batches for peak active potency.
              </p>
            </div>

            <div className="about-story-details">
              <span className="section-overhead-tag">OUR ORIGIN & CRAFT</span>
              <h2 className="about-story-title">Fewer ingredients. Profoundly higher efficacy.</h2>
              <p className="about-story-text">
                Rather than chasing fleeting 10-step trends, our laboratory formulators spend
                up to 18 months perfecting each individual formula. We pair bio-identical
                ceramides, cold-pressed seed oils, and gentle plant extracts that seamlessly
                harmonize with your biology.
              </p>
              <p className="about-story-text">
                Every bottle is crafted in small, deliberate batches. The result is lightweight,
                deep-absorbing skincare that delivers immediate comfort and lasting barrier resilience.
              </p>

              {/* Clean, Simple, Decent Standards (No Tacky AI-generated numbers) */}
              <div className="about-standards-list">
                <div className="standard-item">
                  <span className="standard-name">Biocompatible pH 5.5</span>
                  <span className="standard-desc">Calibrated precisely to fortify and nurture the skin's acid mantle.</span>
                </div>
                <div className="standard-item">
                  <span className="standard-name">Pure Cold-Pressed Oils</span>
                  <span className="standard-desc">Extracted without petroleum solvents to preserve 100% of live nutrients.</span>
                </div>
                <div className="standard-item">
                  <span className="standard-name">Zero Synthetic Fillers</span>
                  <span className="standard-desc">Free from parabens, artificial fragrances, silicones, and sulfates.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Core Commitments (Spacious & Refined) */}
      <section className="about-pillars">
        <div className="about-container">
          <div className="section-head-center">
            <span className="section-overhead-tag">OUR CORE COMMITMENTS</span>
            <h2 className="section-title">Formulation Principles</h2>
            <p className="section-desc">
              Every formula we create adheres to our strict principles of safety, purity, and environmental care.
            </p>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="about-pillar-card">
                <span className="pillar-num">{pillar.index}</span>
                <h3 className="pillar-card-title">{pillar.title}</h3>
                <p className="pillar-card-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="about-faq">
        <div className="about-container about-faq-container">
          <div className="section-head-center">
            <span className="section-overhead-tag">TRANSPARENCY & CLARITY</span>
            <h2 className="section-title">Common Questions</h2>
            <p className="section-desc">
              Everything you need to know about our ingredients, testing, and formulations.
            </p>
          </div>

          <div className="about-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`about-faq-item ${isOpen ? "active" : ""}`}>
                  <button
                    className="about-faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`faq-chevron-icon ${isOpen ? "rotated" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="about-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Bottom Invitation CTA */}
      <section className="about-cta">
        <div className="about-container">
          <div className="about-cta-card">
            <span className="section-overhead-tag">DISCOVER YOUR MATCH</span>
            <h2 className="about-cta-title">Ready for radiant, balanced skin?</h2>
            <p className="about-cta-desc">
              Explore our core botanical apothecary collection or take our 60-second skincare consultation.
            </p>
            <div className="about-cta-actions">
              <Link to="/shop" className="btn-primary-filled">
                <span>Explore Collection</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/quiz" className="btn-secondary-outlined">
                <Sparkles size={15} />
                <span>Skincare Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;