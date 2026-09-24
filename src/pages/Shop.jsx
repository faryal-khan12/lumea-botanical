import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../services/api";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Leaf,
  Heart
} from "lucide-react";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, formatPrice } = useStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [maxPriceUsd, setMaxPriceUsd] = useState(150);
  const [sortBy, setSortBy] = useState("featured");
  const [onlyWishlist, setOnlyWishlist] = useState(
    searchParams.get("filter") === "wishlist"
  );

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

  // Sync category param
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    if (searchParams.get("filter") === "wishlist") {
      setOnlyWishlist(true);
    }
  }, [searchParams]);

  const categories = [
    "All",
    "Cleansers",
    "Serums",
    "Moisturizers",
    "Face Oils",
    "Toners & Mists",
    "Masks & Treatments",
    "Perfumes & Fragrances"
  ];

  const skinTypes = [
    "All",
    "All Skin Types",
    "Dry & Dehydrated",
    "Dry & Sensitive",
    "Oily & Blemish-Prone",
    "Mature & Dehydrated"
  ];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Wishlist only filter
      if (onlyWishlist && !wishlist.some((w) => w.id === item.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // Skin type filter
      if (selectedSkinType !== "All" && item.skinType !== selectedSkinType) {
        return false;
      }

      // Max price filter
      if (item.priceUsd > maxPriceUsd) {
        return false;
      }

      // Search keyword
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesIng = item.keyIngredients?.some((ing) =>
          ing.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesCat && !matchesDesc && !matchesIng) {
          return false;
        }
      }

      return true;
    });
  }, [
    products,
    onlyWishlist,
    wishlist,
    selectedCategory,
    selectedSkinType,
    maxPriceUsd,
    searchTerm
  ]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      return list.sort((a, b) => a.priceUsd - b.priceUsd);
    }
    if (sortBy === "price-high") {
      return list.sort((a, b) => b.priceUsd - a.priceUsd);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "name") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "featured" default
    return list;
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedSkinType("All");
    setMaxPriceUsd(150);
    setSearchTerm("");
    setSortBy("featured");
    setOnlyWishlist(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedSkinType !== "All" ||
    maxPriceUsd < 150 ||
    searchTerm.trim() !== "" ||
    onlyWishlist;

  return (
    <main className="shop-page-wrapper">
      {/* Header Banner */}
      <section className="shop-hero-banner">
        <div className="shop-hero-inner">
          <span className="section-overhead-tag">LUMÉA BOTANICAL FORMULARY</span>
          <h1>
            {onlyWishlist
              ? "Your Saved Favorites"
              : selectedCategory === "All"
              ? "The Skincare Collection"
              : selectedCategory}
          </h1>
          <p>
            {onlyWishlist
              ? `You have ${wishlist.length} item(s) saved to your wishlist.`
              : "Cold-pressed plant essences, clinical bio-ferments, and barrier restoratives."}
          </p>

          {onlyWishlist && (
            <button
              onClick={() => {
                setOnlyWishlist(false);
                setSearchParams({});
              }}
              className="view-all-wishlist-toggle"
            >
              ← Back to All Products
            </button>
          )}
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <section className="shop-content-container">
        {/* Search Bar & Primary Category Tabs */}
        <div className="shop-toolbar-top">
          <div className="shop-search-box">
            <Search size={18} className="shop-search-icon" />
            <input
              type="text"
              placeholder="Search by ingredient, formula, or concern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="shop-sort-box">
            <label htmlFor="sort-select">Sort By:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Curated & Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated (★)</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="category-pills-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setOnlyWishlist(false);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar: Skin Type & Price Range */}
        <div className="secondary-filters-bar">
          <div className="filter-group">
            <span className="filter-label">Skin Type:</span>
            <select
              value={selectedSkinType}
              onChange={(e) => setSelectedSkinType(e.target.value)}
              className="filter-select"
            >
              {skinTypes.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group price-slider-group">
            <span className="filter-label">
              Max Price: <strong>{formatPrice(maxPriceUsd)}</strong>
            </span>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={maxPriceUsd}
              onChange={(e) => setMaxPriceUsd(Number(e.target.value))}
              className="price-range-slider"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="reset-filters-btn"
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Results Count & Badges */}
        <div className="results-status-bar">
          <span>
            Showing <strong>{sortedProducts.length}</strong> of{" "}
            <strong>{products.length}</strong> formulations
          </span>
          {onlyWishlist && (
            <span className="wishlist-indicator-badge">
              <Heart size={14} fill="#C97A63" color="#C97A63" />
              <span>Wishlist Only</span>
            </span>
          )}
        </div>

        {/* Products Grid */}
        <div className="shop-grid">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line price"></div>
              </div>
            ))
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products-found">
              <Search size={36} className="empty-search-icon" />
              <h3>No matching formulas found</h3>
              <p>
                Try widening your price range, searching for another botanical active,
                or clearing your active filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-primary-filled reset-empty-btn"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Shop;