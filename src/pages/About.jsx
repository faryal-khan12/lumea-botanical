import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Leaf,
  ShieldCheck,
  RefreshCw,
  HeartHandshake,
  ChevronDown,
  ArrowRight
} from "lucide-react";

function About() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "Are LUMÉA formulations safe for reactive or sensitive skin?",
      a: "Yes. Every single product is formulated at the skin's biocompatible 5.5 pH balance and dermatologist-tested on sensitive skin panels. We strictly exclude artificial dyes, chemical fragrances, sulfates, and drying alcohols."
    },
    {
      q: "Where are your botanical extracts sourced?",
      a: "We work directly with certified organic, ethical smallholder farms in France, Bulgaria, and the Mediterranean. Our oils are first-cold-pressed and unrefined to preserve active polyphenols and vital lipid nutrients."
    },
    {
      q: "How should I store my products to maintain freshness?",
      a: "Because we prioritize clean preservative systems, keep your products in a cool, dry place away from direct sunlight. Our amber glass bottles naturally filter harmful UV light to safeguard botanical potency."
    },
    {
      q: "What is your 30-Day Radiant Skin Guarantee?",
      a: "We want you to love your skincare ritual. If a formula isn't the perfect match for your skin, simply reach out to our client concierge within 30 days of receipt for an effortless refund or consultation exchange."
    }
  ];

  return (
    <main className="about-page-wrapper">
      {/* 1. Hero */}
      <section className="about-hero-section">
        <div className="about-hero-inner">
          <span className="section-overhead-tag">OUR ORIGIN & VALUES</span>
          <h1>Beauty in simplicity. Powered by pure botanicals.</h1>
          <p>
            LUMÉA was founded with a singular conviction: your daily skincare ritual
            should not be a stressful chemical marathon. It should be a quiet, restorative
            moment that honors your skin's biological intelligence.
          </p>
        </div>
      </section>

      {/* 2. Visual Storytelling Grid */}
      <section className="about-story-section">
        <div className="about-story-grid">
          <div className="about-story-img-frame">
            <img
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan Botanicals"
              className="about-story-img"
            />
          </div>

          <div className="about-story-content">
            <span className="section-overhead-tag">THE LUMÉA STANDARD</span>
            <h2>Less, but profoundly better.</h2>
            <p>
              Instead of rushing 50-step trends to market, our apothecary formulators
              spend up to 18 months perfecting individual formulations. We curate
              potent active botanicals, skin-identical ceramides, and fermented
              bio-actives that work in deep synergy with your cells.
            </p>
            <p>
              Every bottle is consciously crafted in small batches, guaranteeing
              uncompromised freshness, maximum nutrient density, and remarkable tactile
              luxury.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Four Pillars of LUMÉA */}
      <section className="about-pillars-section">
        <div className="section-head-center">
          <span className="section-overhead-tag">OUR COMMITMENTS</span>
          <h2 className="section-title">The Four Botanical Pillars</h2>
        </div>

        <div className="four-pillars-grid">
          <div className="pillar-box">
            <Leaf size={28} className="pillar-ico" />
            <h3>Wildcrafted & Cold-Pressed</h3>
            <p>
              We harvest unrefined seeds and botanicals using gentle cold-press
              extraction to maintain active vitamins and natural omega profiles.
            </p>
          </div>

          <div className="pillar-box">
            <ShieldCheck size={28} className="pillar-ico" />
            <h3>Biocompatible Science</h3>
            <p>
              Formulated to match your acid mantle’s natural 5.5 pH, reinforcing
              resilience without clogging pores or triggering rebound oiliness.
            </p>
          </div>

          <div className="pillar-box">
            <RefreshCw size={28} className="pillar-ico" />
            <h3>Circular Amber Glass</h3>
            <p>
              Housed in infinitely recyclable, pharmaceutical-grade amber glass
              that shields delicate botanical actives from light degradation.
            </p>
          </div>

          <div className="pillar-box">
            <HeartHandshake size={28} className="pillar-ico" />
            <h3>Cruelty-Free Ethics</h3>
            <p>
              Proudly Leaping Bunny certified. We never test on animals, nor do
              we source from suppliers who do. 100% vegan formulations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Interactive FAQ Accordion */}
      <section className="about-faq-section" id="faq">
        <div className="section-head-center">
          <span className="section-overhead-tag">QUESTIONS & ANSWERS</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-list-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item-card">
              <button
                className="faq-question-btn"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`faq-chevron ${openFaq === index ? "open" : ""}`}
                />
              </button>
              {openFaq === index && (
                <div className="faq-answer-body">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="about-cta-section">
        <div className="about-cta-box">
          <span className="section-overhead-tag">BEGIN YOUR JOURNEY</span>
          <h2>Experience the difference of biocompatible skincare.</h2>
          <p>Explore our signature collection or take our 60-second skincare consultation.</p>
          <div className="about-cta-buttons">
            <Link to="/shop" className="btn-primary-filled">
              <span>Shop Collection</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/quiz" className="btn-secondary-outlined">
              <Sparkles size={16} />
              <span>Take Consultation Quiz</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;