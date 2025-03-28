import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyNow from "./components/BuyNow";
import Cart from "./components/Cart";
import ProductList from "./components/Card";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/buy-now" element={<BuyNow />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
