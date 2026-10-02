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
  Star,
  Droplets,
  Sun,
  Flame,
  Scale,
  Heart
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
      id: "normal",
      icon: <Scale size={20} className="quiz-opt-icon" />,
      title: "Balanced & Comfortable",
      desc: "Smooth texture, neither overly oily nor tight throughout the day."
    },
    {
      id: "dry",
      icon: <Droplets size={20} className="quiz-opt-icon" />,
      title: "Dry & Thirsty",
      desc: "Skin feels tight or parched after washing, craves rich nourishing hydration."
    },
    {
      id: "oily",
      icon: <Sun size={20} className="quiz-opt-icon" />,
      title: "Oily & Shine-Prone",
      desc: "Midday shine, enlarged pores, or occasional oil-related congestion."
    },
    {
      id: "combination",
      icon: <Leaf size={20} className="quiz-opt-icon" />,
      title: "Combination Skin",
      desc: "Oily T-zone (forehead, nose, chin) paired with normal or drier cheeks."
    },
    {
      id: "sensitive",
      icon: <Heart size={20} className="quiz-opt-icon" />,
      title: "Sensitive & Reactive",
      desc: "Easily flushes red, stings with strong actives, requires calming care."
    }
  ];

  const concernOptions = [
    {
      id: "hydration",
      icon: <Droplets size={20} className="quiz-opt-icon" />,
      title: "Deep Moisture & Plumpness",
      desc: "Eliminate dry tightness for supple, bouncy, all-day cellular moisture."
    },
    {
      id: "glow",
      icon: <Sparkles size={20} className="quiz-opt-icon" />,
      title: "Radiance & Healthy Glow",
      desc: "Awaken dull complexions and restore a natural, lit-from-within luminosity."
    },
    {
      id: "blemish",
      icon: <ShieldCheck size={20} className="quiz-opt-icon" />,
      title: "Pore Clarity & Oil Control",
      desc: "Smooth uneven texture, balance sebum production, and soothe breakouts."
    },
    {
      id: "anti-aging",
      icon: <Leaf size={20} className="quiz-opt-icon" />,
      title: "Firmness & Youthful Elasticity",
      desc: "Fortify collagen resilience, soften fine lines, and protect against free radicals."
    }
  ];

  const routineStyleOptions = [
    {
      id: "minimal",
      badge: "2 Steps",
      title: "Mindful Minimalist",
      desc: "Cleanse + Deep Moisture Barrier. Fast, effortless, and effective for busy mornings."
    },
    {
      id: "balanced",
      badge: "3 Steps",
      title: "Balanced Daily Standard",
      desc: "Cleanse + Targeted Active Serum + Barrier Cream. The quintessential dermatologist regimen."
    },
    {
      id: "luxury",
      badge: "4 Steps",
      title: "Complete Apothecary Luxury",
      desc: "Cleanse + Botanical Hydrosol + Active Serum + Elixir Oil. Maximum transformative care."
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
      "Personalized Regimen Added!",
      `All ${result.steps.length} botanical formulas added to your bag.`,
      "success"
    );
  };

  const handleRetake = () => {
    setStep(1);
    setAnswers({ skinType: "", concern: "", routineStyle: "" });
    setResult(null);
  };

  return (
    <main className="quiz-page">
      <div className="quiz-wrapper">
        {step < 4 ? (
          <div className="quiz-card-box">
            {/* Header */}
            <div className="quiz-header-area">
              <span className="section-overhead-tag">
                <Sparkles size={14} /> SKINCARE CONSULTATION
              </span>
              <h1 className="quiz-main-title">Find Your Personalized Ritual</h1>
              <p className="quiz-main-subtitle">
                Answer 3 simple questions to let our botanical algorithm identify your skin's ideal daily regimen.
              </p>

              {/* Progress Bar */}
              <div className="quiz-progress-track">
                <div
                  className="quiz-progress-indicator"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
              <div className="quiz-step-label">
                <span>Step {step} of 3</span>
                <span className="step-topic">
                  {step === 1 && "Skin Profile"}
                  {step === 2 && "Primary Goal"}
                  {step === 3 && "Ritual Preference"}
                </span>
              </div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="quiz-step-content">
                <h2 className="quiz-question-heading">
                  How does your skin typically feel throughout the day?
                </h2>
                <div className="quiz-options-container">
                  {skinTypeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-card-option ${
                        answers.skinType === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectSkinType(opt.id)}
                    >
                      <div className="option-icon-box">{opt.icon}</div>
                      <div className="option-text-group">
                        <strong className="option-title">{opt.title}</strong>
                        <p className="option-desc">{opt.desc}</p>
                      </div>
                      <ArrowRight size={16} className="option-chevron" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="quiz-step-content">
                <h2 className="quiz-question-heading">
                  What is your primary skincare focus right now?
                </h2>
                <div className="quiz-options-container">
                  {concernOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-card-option ${
                        answers.concern === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectConcern(opt.id)}
                    >
                      <div className="option-icon-box">{opt.icon}</div>
                      <div className="option-text-group">
                        <strong className="option-title">{opt.title}</strong>
                        <p className="option-desc">{opt.desc}</p>
                      </div>
                      <ArrowRight size={16} className="option-chevron" />
                    </button>
                  ))}
                </div>

                <div className="quiz-nav-footer">
                  <button className="quiz-back-button" onClick={() => setStep(1)}>
                    <ArrowLeft size={15} />
                    <span>Back to Skin Type</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="quiz-step-content">
                <h2 className="quiz-question-heading">
                  How many steps do you prefer in your daily ritual?
                </h2>
                <div className="quiz-options-container">
                  {routineStyleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-card-option ${
                        answers.routineStyle === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectStyle(opt.id)}
                    >
                      <div className="option-badge-wrap">
                        <span className="routine-badge">{opt.badge}</span>
                      </div>
                      <div className="option-text-group">
                        <strong className="option-title">{opt.title}</strong>
                        <p className="option-desc">{opt.desc}</p>
                      </div>
                      <ArrowRight size={16} className="option-chevron" />
                    </button>
                  ))}
                </div>

                <div className="quiz-nav-footer">
                  <button className="quiz-back-button" onClick={() => setStep(2)}>
                    <ArrowLeft size={15} />
                    <span>Back to Goals</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* STEP 4: Beautiful Results */
          <div className="quiz-results-container">
            <div className="results-hero">
              <span className="section-overhead-tag">
                <Sparkles size={14} /> YOUR CUSTOM PRESCRIPTION
              </span>
              <h1 className="results-heading">Your Synergistic Botanical Ritual</h1>
              <p className="results-subheading">
                Based on your selections, our apothecary formulators matched these harmonious formulas
                to nurture your skin barrier and deliver noticeable radiant balance.
              </p>

              <div className="results-tags-summary">
                <span className="result-pill">Skin Type: {answers.skinType}</span>
                <span className="result-pill">Primary Goal: {answers.concern}</span>
                <span className="result-pill">Routine Style: {answers.routineStyle}</span>
              </div>
            </div>

            {/* Matched Steps Cards */}
            <div className="results-steps-grid">
              {result.steps.map((s, index) => (
                <div key={index} className="result-step-card">
                  <div className="step-card-header">
                    <span className="step-counter">STEP 0{s.stepNumber}</span>
                    <h3 className="step-category-name">{s.stepName}</h3>
                  </div>

                  <div className="step-card-body">
                    <div className="step-img-wrap">
                      <img
                        src={s.product.image}
                        alt={s.product.name}
                        className="step-product-img"
                      />
                    </div>
                    <div className="step-product-details">
                      <span className="step-product-cat">{s.product.category}</span>
                      <h4 className="step-product-title">
                        <Link to={`/product/${s.product.id}`}>{s.product.name}</Link>
                      </h4>
                      <p className="step-product-desc">{s.description}</p>
                      <div className="step-product-meta">
                        <strong className="step-product-price">
                          {formatPrice(s.product.priceUsd)}
                        </strong>
                        <span className="step-rating">
                          <Star size={13} className="star-icon-filled" />
                          {s.product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Offer Banner */}
            <div className="results-bundle-banner">
              <div className="bundle-banner-content">
                <span className="bundle-pill">EXCLUSIVE PRIVILEGE BUNDLE</span>
                <h3 className="bundle-title">
                  Complete {result.steps.length}-Step Ritual Set
                </h3>
                <p className="bundle-desc">
                  Enjoy an automatic <strong>15% bundle savings</strong> plus complimentary express delivery
                  when ordering your complete personalized regimen together.
                </p>
                <div className="bundle-pricing-row">
                  <span className="bundle-strikethrough">
                    {formatPrice(result.totalOriginalUsd)}
                  </span>
                  <strong className="bundle-current-price">
                    {formatPrice(result.bundleUsd)}
                  </strong>
                  <span className="bundle-savings-badge">
                    You Save {formatPrice(result.savingsUsd)} (15% OFF)
                  </span>
                </div>
              </div>

              <div className="bundle-banner-action">
                <button
                  onClick={handleAddBundleToBag}
                  className="btn-primary-filled add-bundle-btn"
                >
                  <ShoppingBag size={17} />
                  <span>Add Entire Ritual to Bag</span>
                </button>
                <Link to="/cart" className="view-cart-text-link">
                  View Shopping Bag →
                </Link>
              </div>
            </div>

            {/* Results Footer Actions */}
            <div className="results-bottom-bar">
              <button onClick={handleRetake} className="btn-secondary-outlined retake-quiz-btn">
                <RotateCcw size={15} />
                <span>Retake Consultation</span>
              </button>
              <div className="results-guarantee-note">
                <ShieldCheck size={16} />
                <span>Backed by our 30-Day Radiant Skin Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default RoutineQuiz;
