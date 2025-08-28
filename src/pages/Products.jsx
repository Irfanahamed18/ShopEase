import { useEffect, useState } from "react";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [cartQuantities, setCartQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 20;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/category-list");
        const data = await res.json();
        setCategories(["all", ...data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "";
        if (search.trim()) {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
            search
          )}`;
        } else if (category !== "all") {
          url = `https://dummyjson.com/products/category/${category}`;
        } else {
          url = "https://dummyjson.com/products?limit=100";
        }

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
        setCurrentPage(1); 
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category, search]);

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortBy) return 0;
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    return order === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleAdd = (product) => {
    const newQty = (cartQuantities[product.id] || 0) + 1;
    setCartQuantities((prev) => ({ ...prev, [product.id]: newQty }));
    addToCart(product, newQty);
  };

  const handleRemove = (product) => {
    const newQty = (cartQuantities[product.id] || 0) - 1;
    if (newQty <= 0) {
      const updated = { ...cartQuantities };
      delete updated[product.id];
      setCartQuantities(updated);
    } else {
      setCartQuantities((prev) => ({ ...prev, [product.id]: newQty }));
    }
    addToCart(product, newQty);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Our Products
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 text-gray-800 bg-white shadow-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="asc">Low</option>
          <option value="desc">High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={p.thumbnail || (p.images && p.images[0])} 
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {p.title}
                </h2>
                <p className="text-sm text-gray-600 ">
                  {p.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-indigo-600">
                    ${p.price}
                  </span>

                  {cartQuantities[p.id] ? (
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleRemove(p)}
                        className="bg-gray-200 px-3 py-1 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 font-semibold text-gray-800 text-center">
                        {cartQuantities[p.id]}
                      </span>
                      <button
                        onClick={() => handleAdd(p)}
                        className="bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-700"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(p)}
                      className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
