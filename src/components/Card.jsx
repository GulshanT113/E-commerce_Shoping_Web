import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.price.toString().includes(searchQuery) ||
          product.rating.rate.toString().includes(searchQuery)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategories, products]);

  const handleBuyNow = (product) => {
    navigate("/buy-now", { state: { product } });
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 gap-2 p-4">
      <div className="md:col-span-2 border border-black-900 hidden md:block">
        <Sidebar onFilter={setSelectedCategories} />
      </div>
      <div className="w-full md:col-span-10">
        <div className="flex items-center gap-2 hidden md:block">
          <Searchbar onSearch={setSearchQuery} />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Sidebar onFilter={setSelectedCategories} />
          <Searchbar onSearch={setSearchQuery} />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                className="border p-4 rounded shadow bg-white"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold line-clamp-1 overflow-hidden mb-2">
                  {product.title}
                </h3>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  {product.rating.rate} ⭐ ({product.rating.count} reviews)
                </h3>
                <h3 className="text-sm font-semibold border border-gray-200 bg-gray-200 rounded-[5px] px-2 inline-block mb-2">
                  {product.category}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 overflow-hidden mb-4">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-orange-500 mb-4">
                  ${product.price}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="text-orange-500 text-sm sm:text-base font-bold py-2 sm:py-3 rounded transition duration-300 hover:bg-orange-600 hover:text-white"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy now
                  </button>
                  <button
                    className="text-orange-500 text-sm sm:text-base font-bold py-2 sm:py-3 rounded transition duration-300 hover:bg-orange-600 hover:text-white"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-full">
              There is no product available here that matches your search.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
