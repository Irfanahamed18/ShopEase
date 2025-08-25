import { useEffect, useState } from "react";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

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

    if (order === "asc") {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });

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
        {sortedProducts.length > 0 ? (
          sortedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={p.thumbnail}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {p.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-indigo-600">
                    ${p.price}
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
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
    </div>
  );
};

export default Products;
