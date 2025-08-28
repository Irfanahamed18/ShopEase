import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
  }, []);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (qty <= 0) return prev.filter((p) => p.id !== product.id);
      if (existing) return prev.map((p) => p.id === product.id ? { ...p, quantity: qty } : p);
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const increaseQuantity = (id) => setCart((prev) => prev.map((p) => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  const decreaseQuantity = (id) => setCart((prev) => prev.map((p) => p.id === id ? { ...p, quantity: p.quantity - 1 } : p).filter((p) => p.quantity > 0));

  return (
    <Router>
      <Navbar cart={cart} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <div className="bg-gray-100 min-h-screen pt-20">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products addToCart={addToCart} />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
