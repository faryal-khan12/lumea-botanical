import React from "react";
import { Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import QuickViewModal from "./components/QuickViewModal";
import SearchModal from "./components/SearchModal";
import CheckoutModal from "./components/CheckoutModal";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/Productdetails";
import Cart from "./pages/Cart";
import RoutineQuiz from "./pages/RoutineQuiz";
import About from "./pages/About";

function App() {
  return (
    <StoreProvider>
      <div className="app-shell">
        <Header />

        <div className="main-content-flow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/quiz" element={<RoutineQuiz />} />
            <Route path="/about" element={<About />} />
            {/* Catch-all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <Footer />

        {/* Global Interactive Overlays */}
        <QuickViewModal />
        <SearchModal />
        <CheckoutModal />
        <Toast />
      </div>
    </StoreProvider>
  );
}

export default App;