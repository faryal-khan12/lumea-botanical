import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { X, Star, Heart, Check, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";

function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedImgIndex(0);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    handleClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-content quickview-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
      >
        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close product preview"
        >
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Images Column */}
          <div className="quickview-media">
            <div className="quickview-main-image">
              <img
                src={images[selectedImgIndex] || product.image}
                alt={product.name}
              />
              {product.badge && (
                <span className="product-badge-overlay">{product.badge}</span>
              )}
            </div>

            {images.length > 1 && (
              <div className="quickview-thumbnails">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImgIndex === idx ? "active" : ""}`}
                    onClick={() => setSelectedImgIndex(idx)}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="quickview-details">
            <div className="quickview-header">
              <span className="product-category-tag">{product.category}</span>
              <div className="rating-pill">
                <Star size={14} className="star-filled" />
                <span>{product.rating}</span>
                <span className="rating-count">({product.reviewCount || 45})</span>
              </div>
            </div>

            <h2 id="quickview-title" className="quickview-title">{product.name}</h2>
            
            <div className="quickview-price-row">
              <span className="quickview-price">{formatPrice(product.priceUsd)}</span>
              {product.volume && <span className="product-volume">{product.volume}</span>}
            </div>

            <p className="quickview-desc">{product.description}</p>

            {product.keyIngredients && product.keyIngredients.length > 0 && (
              <div className="quickview-ingredients">
                <h4><Sparkles size={14} /> Key Botanical Actives</h4>
                <div className="ingredients-pills">
                  {product.keyIngredients.slice(0, 4).map((ing, i) => (
                    <span key={i} className="ingredient-pill">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="quickview-actions">
              <div className="quantity-stepper">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="btn-primary-filled add-bag-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Bag</span>
              </button>

              <button
                className={`wishlist-icon-btn ${isFavorited ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={isFavorited ? "#C97A63" : "none"} color={isFavorited ? "#C97A63" : "currentColor"} />
              </button>
            </div>

            <div className="quickview-footer">
              <div className="guarantee-item">
                <ShieldCheck size={16} />
                <span>Dermatologist Tested • Cruelty-Free</span>
              </div>
              <Link
                to={`/product/${product.id}`}
                onClick={handleClose}
                className="view-full-link"
              >
                View Full Product Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
