import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { getAllProducts } from "../services/api";
import { Search, X, ArrowRight } from "lucide-react";

function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useStore();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Live filter
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(products.slice(0, 4)); // Show top 4 trending when empty
      return;
    }
    const q = query.toLowerCase();
    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.keyIngredients && p.keyIngredients.some((ing) => ing.toLowerCase().includes(q)))
    );
    setFiltered(matches);
  }, [query, products]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (id) => {
    setIsSearchOpen(false);
    navigate(`/product/${id}`);
  };

  const popularSearches = ["Cleanser", "Hyaluronic", "Rosehip", "Barrier", "Serum", "Oil"];

  return (
    <div className="modal-backdrop search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div
        className="modal-content search-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="search-input-wrapper">
          <Search size={22} className="search-icon-input" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search skincare ritual, ingredients, concerns..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-main-input"
          />
          {query ? (
            <button className="search-clear-btn" onClick={() => setQuery("")}>
              <X size={18} />
            </button>
          ) : (
            <kbd className="search-kbd">ESC</kbd>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="search-tags-row">
          <span className="search-tags-label">Popular:</span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              className="search-tag-pill"
              onClick={() => setQuery(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="search-results-list">
          {filtered.length > 0 ? (
            filtered.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => handleSelectProduct(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="search-item-thumb"
                />
                <div className="search-item-info">
                  <span className="search-item-cat">{product.category}</span>
                  <h4 className="search-item-title">{product.name}</h4>
                  <p className="search-item-price">{formatPrice(product.priceUsd)}</p>
                </div>
                <ArrowRight size={18} className="search-item-arrow" />
              </div>
            ))
          ) : (
            <div className="search-empty">
              <p>No botanical formulas found matching "{query}"</p>
              <span>Try searching for 'Cleanser', 'Serum', 'Moisturizer', or 'Hydrating'</span>
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <span>Press <kbd>ESC</kbd> to close or <kbd>ENTER</kbd> to view selection</span>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              navigate("/shop");
            }}
            className="browse-all-link"
          >
            Browse Full Collection →
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
