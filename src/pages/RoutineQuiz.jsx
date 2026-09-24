import React, { useState } from "react";
import { Link } from "react-router-dom";
import { matchRoutineQuiz } from "../services/api";
import { useStore } from "../context/StoreContext";
import confetti from "canvas-confetti";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  RotateCcw,
  Leaf,
  ShieldCheck,
  Star
} from "lucide-react";

function RoutineQuiz() {
  const { addToCart, formatPrice, showToast } = useStore();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    skinType: "",
    concern: "",
    routineStyle: ""
  });
  const [result, setResult] = useState(null);

  const skinTypeOptions = [
    {
      id: "dry",
      title: "Dry & Dehydrated",
      desc: "Feels tight after cleansing, prone to flakiness or dullness."
    },
    {
      id: "oily",
      title: "Oily & Blemish-Prone",
      desc: "Prone to shine throughout midday, visible pores or occasional breakouts."
    },
    {
      id: "combination",
      title: "Combination Skin",
      desc: "Oily T-zone (forehead, nose) with drier or normal cheeks."
    },
    {
      id: "sensitive",
      title: "Sensitive & Reactive",
      desc: "Flushes easily, prone to redness, stinging, or ingredient reactions."
    },
    {
      id: "normal",
      title: "Balanced / Normal",
      desc: "Generally comfortable with minimal oiliness or dry patches."
    }
  ];

  const concernOptions = [
    {
      id: "hydration",
      title: "Deep Cellular Hydration",
      desc: "Plumpness, bounce, and eliminating parched dullness."
    },
    {
      id: "anti-aging",
      title: "Firmness & Youthful Elasticity",
      desc: "Smoothing fine lines, supporting collagen, and evening skin tone."
    },
    {
      id: "blemish",
      title: "Pore Refining & Clarity",
      desc: "Balancing excess sebum and smoothing texture."
    },
    {
      id: "glow",
      title: "Lit-From-Within Radiance",
      desc: "Awakening tired complexions with natural antioxidant glow."
    }
  ];

  const routineStyleOptions = [
    {
      id: "minimal",
      title: "Mindful Minimalist (2-Step)",
      desc: "Essential Cleanse + Nourishing Barrier. Quick and effortless for busy mornings."
    },
    {
      id: "balanced",
      title: "Balanced Daily Ritual (3-Step)",
      desc: "Cleanse + Targeted Serum + Barrier Cream. The quintessential dermatologist standard."
    },
    {
      id: "luxury",
      title: "Complete Apothecary Luxury (4-Step)",
      desc: "Cleanse + Botanical Hydrosol + Active Serum + Elixir Oil. Maximum transformative indulgence."
    }
  ];

  const handleSelectSkinType = (val) => {
    setAnswers((prev) => ({ ...prev, skinType: val }));
    setStep(2);
  };

  const handleSelectConcern = (val) => {
    setAnswers((prev) => ({ ...prev, concern: val }));
    setStep(3);
  };

  const handleSelectStyle = (val) => {
    const finalAnswers = { ...answers, routineStyle: val };
    setAnswers(finalAnswers);
    const matched = matchRoutineQuiz(finalAnswers);
    setResult(matched);
    setStep(4);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleAddBundleToBag = () => {
    if (!result || !result.steps) return;
    result.steps.forEach((s) => {
      addToCart(s.product, 1);
    });
    showToast(
      "Personalized Ritual Added!",
      `All ${result.steps.length} formulas added to your bag.`,
      "success"
    );
  };

  const handleRetake = () => {
    setStep(1);
    setAnswers({ skinType: "", concern: "", routineStyle: "" });
    setResult(null);
  };

  return (
    <main className="quiz-page-wrapper">
      <div className="quiz-container">
        {step < 4 ? (
          <>
            {/* Header */}
            <div className="quiz-header">
              <span className="section-overhead-tag">
                <Sparkles size={14} /> BOTANICAL CONSULTATION
              </span>
              <h1>Find Your Ideal Skincare Ritual</h1>
              <p>
                Answer 3 quick questions to receive a scientifically paired regimen tailored to your skin’s biological profile.
              </p>

              {/* Progress Indicator */}
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
              <span className="quiz-step-count">Step {step} of 3</span>
            </div>

            {/* Step 1: Skin Type */}
            {step === 1 && (
              <div className="quiz-step-card animate-fade-in">
                <h2>What best describes your skin’s current state?</h2>
                <div className="quiz-options-grid">
                  {skinTypeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-option-btn ${
                        answers.skinType === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectSkinType(opt.id)}
                    >
                      <div className="option-title-row">
                        <h3>{opt.title}</h3>
                        <ArrowRight size={16} className="opt-arrow" />
                      </div>
                      <p>{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Main Concern */}
            {step === 2 && (
              <div className="quiz-step-card animate-fade-in">
                <h2>What is your primary skincare goal?</h2>
                <div className="quiz-options-grid">
                  {concernOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-option-btn ${
                        answers.concern === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectConcern(opt.id)}
                    >
                      <div className="option-title-row">
                        <h3>{opt.title}</h3>
                        <ArrowRight size={16} className="opt-arrow" />
                      </div>
                      <p>{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <button className="quiz-back-btn" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} />
                  <span>Back to Step 1</span>
                </button>
              </div>
            )}

            {/* Step 3: Routine Style */}
            {step === 3 && (
              <div className="quiz-step-card animate-fade-in">
                <h2>How many ritual steps feel right for your daily lifestyle?</h2>
                <div className="quiz-options-grid">
                  {routineStyleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-option-btn ${
                        answers.routineStyle === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectStyle(opt.id)}
                    >
                      <div className="option-title-row">
                        <h3>{opt.title}</h3>
                        <ArrowRight size={16} className="opt-arrow" />
                      </div>
                      <p>{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <button className="quiz-back-btn" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} />
                  <span>Back to Step 2</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Step 4: Personalized Results Screen */
          <div className="quiz-results-card animate-fade-in">
            <div className="results-celebration-head">
              <span className="section-overhead-tag">
                <Sparkles size={14} /> YOUR CUSTOM BOTANICAL PRESCRIPTION
              </span>
              <h1>Your Harmonized Skincare Ritual</h1>
              <p>
                Based on your skin profile, our apothecary formulators recommend this synergistic regimen to target{" "}
                <strong>{answers.concern}</strong> while maintaining <strong>{answers.skinType}</strong> barrier health.
              </p>
            </div>

            {/* Steps Timeline / Cards */}
            <div className="matched-steps-grid">
              {result.steps.map((s, index) => (
                <div key={index} className="matched-step-card">
                  <div className="matched-step-header">
                    <span className="step-badge">STEP {s.stepNumber}</span>
                    <h4>{s.stepName}</h4>
                  </div>

                  <div className="matched-product-body">
                    <img
                      src={s.product.image}
                      alt={s.product.name}
                      className="matched-prod-img"
                    />
                    <div className="matched-prod-info">
                      <span className="matched-cat">{s.product.category}</span>
                      <h3>
                        <Link to={`/product/${s.product.id}`}>{s.product.name}</Link>
                      </h3>
                      <p className="matched-desc">{s.description}</p>
                      <div className="matched-pricing">
                        <strong>{formatPrice(s.product.priceUsd)}</strong>
                        <span className="rating-mini">
                          <Star size={12} className="star-filled" />
                          {s.product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Offer Summary Banner */}
            <div className="bundle-offer-card">
              <div className="bundle-offer-text">
                <span className="bundle-tag">EXCLUSIVE RITUAL BUNDLE</span>
                <h3>Order Your Complete {result.steps.length}-Step Regimen</h3>
                <p>
                  Receive an immediate <strong>15% bundle privilege discount</strong> plus complimentary express shipping.
                </p>
                <div className="bundle-price-row">
                  <span className="bundle-original-price">
                    {formatPrice(result.totalOriginalUsd)}
                  </span>
                  <span className="bundle-discounted-price">
                    {formatPrice(result.bundleUsd)}
                  </span>
                  <span className="savings-badge">
                    Save {formatPrice(result.savingsUsd)} (15% OFF)
                  </span>
                </div>
              </div>

              <div className="bundle-action-box">
                <button
                  onClick={handleAddBundleToBag}
                  className="btn-primary-filled add-bundle-btn"
                >
                  <ShoppingBag size={18} />
                  <span>Add Entire Ritual to Bag</span>
                </button>
                <Link to="/cart" className="view-cart-bundle-link">
                  Proceed to Bag & Checkout →
                </Link>
              </div>
            </div>

            <div className="results-footer-bar">
              <button onClick={handleRetake} className="btn-secondary-outlined retake-btn">
                <RotateCcw size={16} />
                <span>Retake Consultation</span>
              </button>
              <div className="guarantee-mini">
                <ShieldCheck size={16} />
                <span>Protected by our 30-Day Radiant Skin Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default RoutineQuiz;
