import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[90vh] bg-gradient-to-br from-gray-50 to-indigo-50 px-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
        Welcome to <span className="text-indigo-600">ShopEase</span>
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Your one-stop destination for the best products at unbeatable prices.
        Shop smart, live better, and join our <span className="font-semibold text-indigo-600">10,000+ happy customers</span>.
      </p>

      <div className="flex gap-4 mb-10">
        <Link to="/products">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition">
            Shop Now
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full max-w-4xl">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600">🚚 Free Shipping</h3>
          <p className="text-gray-500 mt-2">On all orders above $50</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600">🔒 Secure Payments</h3>
          <p className="text-gray-500 mt-2">100% safe and trusted checkout</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600">💬 24/7 Support</h3>
          <p className="text-gray-500 mt-2">We’re here whenever you need</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
