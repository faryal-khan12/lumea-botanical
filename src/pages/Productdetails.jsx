import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getAllProducts } from "../services/api";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Leaf,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsCheckoutOpen,
    showToast
  } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState("ingredients");
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Reviews state
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  useEffect(() => {
    setLoading(true);
    getProductById(id).then((data) => {
      setProduct(data);
      setReviewsList(data.reviews || []);
      setLoading(false);
    });

    getAllProducts().then((all) => {
      const others = all.filter((p) => String(p.id) !== String(id)).slice(0, 3);
      setRelatedProducts(others);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <main className="product-details-skeleton">
        <div className="skeleton-media"></div>
        <div className="skeleton-info-block">
          <div className="skeleton-line short"></div>
          <div className="skeleton-line title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line price"></div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="not-found">
        <h1>Botanical Formula Not Found</h1>
        <p>The ritual you are seeking may have retired or moved.</p>
        <Link to="/shop" className="btn-primary-filled">
          Return to Collection
        </Link>
      </main>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleAccordionToggle = (key) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      alert("Please provide your name and comments.");
      return;
    }
    const createdReview = {
      id: Date.now(),
      author: newReview.name,
      rating: Number(newReview.rating),
      date: "Just now",
      comment: newReview.comment,
      verified: true
    };
    setReviewsList([createdReview, ...reviewsList]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setReviewFormOpen(false);
    showToast("Review Published!", "Thank you for sharing your experience.", "success");
  };

  return (
    <main className="product-details-page">
      {/* Breadcrumbs */}
      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Collection</Link>
        <span>/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span className="current-crumb">{product.name}</span>
      </nav>

      {/* Primary Layout Grid */}
      <section className="pdp-main-grid">
        {/* Gallery */}
        <div className="pdp-gallery-column">
          <div className="pdp-main-image-frame">
            <img
              src={images[selectedImgIndex] || product.image}
              alt={product.name}
              className="pdp-hero-image"
            />
            {product.badge && (
              <span className="pdp-badge-tag">{product.badge}</span>
            )}
          </div>

          {images.length > 1 && (
            <div className="pdp-thumbnails-strip">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`pdp-thumb-item ${selectedImgIndex === idx ? "active" : ""}`}
                  onClick={() => setSelectedImgIndex(idx)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        {/* Product Information - Clean, Refined, Uncrowded */}
        <div className="pdp-info-column">
          <div className="pdp-meta-row">
            <span className="pdp-category-pill">{product.category}</span>
            <div className="pdp-rating-badge">
              <Star size={13} className="star-filled" />
              <span>{product.rating}</span>
              <a href="#reviews-section" className="review-count-link">
                ({reviewsList.length} reviews)
              </a>
            </div>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-pricing-box">
            <span className="pdp-price">{formatPrice(product.priceUsd)}</span>
            {product.volume && (
              <span className="pdp-volume">• {product.volume}</span>
            )}
          </div>

          <p className="pdp-description">{product.description}</p>

          {/* Skin Type */}
          {product.skinType && (
            <div className="pdp-skintype-box">
              <Leaf size={14} />
              <span>Ideal for: <strong>{product.skinType}</strong></span>
            </div>
          )}

          {/* Quantity and Primary Action */}
          <div className="pdp-actions-wrapper">
            <div className="pdp-quantity-stepper">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-primary-filled pdp-add-btn"
            >
              <ShoppingBag size={17} />
              <span>Add to Bag • {formatPrice(product.priceUsd * quantity)}</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`pdp-wishlist-btn ${isFavorited ? "active" : ""}`}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={18}
                fill={isFavorited ? "#C2985B" : "none"}
                color={isFavorited ? "#C2985B" : "currentColor"}
              />
            </button>
          </div>

          {/* Concise Value Line */}
          <div className="pdp-perks-strip">
            <div className="perk-item">
              <Truck size={15} />
              <span>Free shipping over $50</span>
            </div>
            <div className="perk-item">
              <ShieldCheck size={15} />
              <span>30-Day guarantee</span>
            </div>
          </div>

          {/* Interactive Accordions */}
          <div className="pdp-accordions-group">
            {/* 1. Key Ingredients */}
            <div className="accordion-card">
              <button
                className="accordion-header"
                onClick={() => handleAccordionToggle("ingredients")}
              >
                <span><Leaf size={16} /> Botanical Actives & Key Ingredients</span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${
                    activeAccordion === "ingredients" ? "open" : ""
                  }`}
                />
              </button>
              {activeAccordion === "ingredients" && (
                <div className="accordion-body">
                  <div className="ingredient-tags-grid">
                    {product.keyIngredients?.map((ing, i) => (
                      <span key={i} className="ingredient-badge">
                        {ing}
                      </span>
                    ))}
                  </div>
                  <p className="clean-beauty-note">
                    100% Free of parabens, phthalates, synthetic colorants, sulfates,
                    and mineral oils. Vegan and Leaping Bunny Certified.
                  </p>
                </div>
              )}
            </div>

            {/* 2. Application Ritual */}
            <div className="accordion-card">
              <button
                className="accordion-header"
                onClick={() => handleAccordionToggle("ritual")}
              >
                <span>The Application Ritual</span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${
                    activeAccordion === "ritual" ? "open" : ""
                  }`}
                />
              </button>
              {activeAccordion === "ritual" && (
                <div className="accordion-body">
                  <p>{product.ritual}</p>
                </div>
              )}
            </div>

            {/* 3. Clinical & Consumer Results */}
            <div className="accordion-card">
              <button
                className="accordion-header"
                onClick={() => handleAccordionToggle("clinical")}
              >
                <span>Clinical & Safety Results</span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${
                    activeAccordion === "clinical" ? "open" : ""
                  }`}
                />
              </button>
              {activeAccordion === "clinical" && (
                <div className="accordion-body">
                  <p>{product.clinicalResults}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="pdp-reviews-section" id="reviews-section">
        <div className="reviews-header-row">
          <div>
            <span className="section-overhead-tag">PATRON EXPERIENCES</span>
            <h2>Client Reviews & Reflections</h2>
            <div className="review-summary-score">
              <div className="stars-row">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="star-filled" />
                ))}
              </div>
              <span>
                <strong>{product.rating}</strong> out of 5 ({reviewsList.length} verified reviews)
              </span>
            </div>
          </div>

          <button
            className="btn-secondary-outlined write-review-toggle"
            onClick={() => setReviewFormOpen(!reviewFormOpen)}
          >
            {reviewFormOpen ? "Cancel Review" : "Write a Reflection"}
          </button>
        </div>

        {/* Interactive Review Form */}
        {reviewFormOpen && (
          <form onSubmit={handleReviewSubmit} className="write-review-form">
            <h3>Share Your Experience with {product.name}</h3>

            <div className="review-form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saira M."
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Rating (1 to 5 Stars)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                >
                  <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                  <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                  <option value={2}>★★☆☆☆ (2 Stars - Below Expectations)</option>
                  <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Your Thoughts & Results *</label>
              <textarea
                required
                rows={4}
                placeholder="How did this formula feel on your skin? When did you notice results?"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn-primary-filled submit-review-btn">
              <span>Submit Verified Review</span>
              <CheckCircle2 size={16} />
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="reviews-cards-list">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="customer-review-card">
              <div className="review-card-top">
                <div className="rev-stars">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={14} className="star-filled" />
                  ))}
                </div>
                <span className="rev-date">{rev.date}</span>
              </div>
              <p className="rev-comment">"{rev.comment}"</p>
              <div className="rev-author-bar">
                <strong>{rev.author}</strong>
                {rev.verified && (
                  <span className="verified-badge">
                    <CheckCircle2 size={12} /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Pairings */}
      {relatedProducts.length > 0 && (
        <section className="pdp-related-section">
          <div className="section-head-center">
            <span className="section-overhead-tag">COMPLETE YOUR RITUAL</span>
            <h2 className="section-title">Harmonious Botanical Pairings</h2>
          </div>
          <div className="featured-products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetails;