import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi"; // 🔍 modern search icon
import Loader from "../components/loader";
import ProductCard from "../components/product-card";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoaded(false);
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/products"
      );
      setProducts(response.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      setLoaded(true);
    }
  };

  // 🔥 Debounced Search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        setSearching(true);

        if (query.trim() === "") {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "/products"
          );
          setProducts(response.data);
        } else {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + `/products/search/${query}`
          );
          setProducts(response.data || []);
        }

        setSearching(false);
      } catch (err) {
        console.error(err);
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] p-4 sm:p-6 lg:p-8">

      <div className="w-full h-25 flex items-center justify-center">
      {/* 🔍 Search Bar */}
          <div className="mb-6 relative w-full max-w-2xl">

            {/* Modern Search Icon */}
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-400 rounded-xl shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:border-blue-500 transition"
            />

            {/* 🔥 Modern Loader Spinner */}
            {searching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>    

      {/* Initial Page Loader */}
      {!loaded ? (
        <Loader />
      ) : (
        <>
          {/* ❌ No Results */}
          {products.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Try searching something else</p>
            </div>
          ) : (
            /* ✅ Products Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((item) => (
                <ProductCard key={item.productId} product={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}