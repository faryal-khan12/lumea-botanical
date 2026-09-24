import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Heart, Check } from "lucide-react";

function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [addedAnim, setAddedAnim] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1400);
  };

  return (
    <article className="luxury-product-card" aria-label={product.name}>
      {/* Product Image Area */}
      <div className="card-media-wrapper">
        <Link to={`/product/${product.id}`} className="card-image-link" tabIndex={-1}>
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
          />
        </Link>

        {/* Top-Left Badge: ONLY on 2 or 3 Best Sellers */}
        {product.badge && (
          <span className="card-floating-badge">{product.badge}</span>
        )}

        {/* Top-Right Favorite Heart: Appears ONLY on hover (or if favorited) */}
        <button
          type="button"
          className={`card-heart-btn ${isFavorited ? "favorited" : ""}`}
          onClick={handleWishlist}
          aria-label={isFavorited ? "Remove from favorites" : "Save to favorites"}
          title={isFavorited ? "Saved to favorites" : "Save to favorites"}
        >
          <Heart
            size={18}
            fill={isFavorited ? "#C69A5A" : "none"}
            color={isFavorited ? "#C69A5A" : "#3B4734"}
          />
        </button>
      </div>

      {/* Clean, Neat, Uncluttered Product Info Below Image */}
      <div className="card-details">
        <span className="card-category-label">{product.category}</span>

        <h3 className="card-product-title">
          <Link to={`/product/${product.id}`} className="card-title-link">
            {product.name}
          </Link>
        </h3>

        <div className="card-pricing-row">
          <span className="card-price-value">{formatPrice(product.priceUsd)}</span>
          {product.volume && (
            <span className="card-volume-text">{product.volume}</span>
          )}
        </div>

        <div className="card-actions-bottom">
          <button
            type="button"
            className={`card-add-button ${addedAnim ? "added" : ""}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to bag`}
          >
            {addedAnim ? (
              <>
                <Check size={14} />
                <span>Added to Bag</span>
              </>
            ) : (
              <span>Add to Bag</span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;