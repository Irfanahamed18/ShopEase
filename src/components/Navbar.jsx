import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Navbar = ({ cart }) => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/home" className="text-xl font-bold text-gray-800">
          MyShop
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-gray-900">
            Products
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.reduce((sum, p) => sum + p.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
