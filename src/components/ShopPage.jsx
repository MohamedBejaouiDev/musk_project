import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { useCart } from '../state/CartContext';

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { addItem } = useCart();

  useEffect(() => {
    const transformed = productsData.map(p => {
      const category = categoriesData.find(c => c.id === p.categoryId);
      return {
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price,
        rating: p.rating.average,
        image: p.images[0],
        category: category?.name || 'Other',
        stock: p.stock,
        inStock: p.stock > 0,
        badge: p.badge,
        discount: p.discount
      };
    });
    setProducts(transformed);
    setFilteredProducts(transformed);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    filtered = filtered.filter(p => p.rating >= ratingRange[0] && p.rating <= ratingRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, ratingRange, sortBy, products]);

  const handleAddToCart = (product) => {
    addItem({ ...product, stock: product.stock });
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-montserrat text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8"
        >
          Shop
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar Filters */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-lg shadow p-4 lg:p-6 lg:sticky lg:top-24">
              <h2 className="font-montserrat font-bold text-base lg:text-lg text-gray-900 mb-3 lg:mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-4 lg:mb-6">
                <label className="font-montserrat font-semibold text-xs lg:text-sm text-gray-700 block mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-4 lg:mb-6">
                <label className="font-montserrat font-semibold text-xs lg:text-sm text-gray-700 block mb-2">Category</label>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="text-[#AF8D64] focus:ring-[#AF8D64]"
                    />
                    <span className="font-montserrat text-xs lg:text-sm text-gray-700">All</span>
                  </label>
                  {categoriesData.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.name}
                        onChange={() => setSelectedCategory(cat.name)}
                        className="text-[#AF8D64] focus:ring-[#AF8D64]"
                      />
                      <span className="font-montserrat text-xs lg:text-sm text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-4 lg:mb-6">
                <label className="font-montserrat font-semibold text-xs lg:text-sm text-gray-700 block mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between font-montserrat text-xs text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-4 lg:mb-6">
                <label className="font-montserrat font-semibold text-xs lg:text-sm text-gray-700 block mb-2">Rating</label>
                <div className="grid grid-cols-1 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingRange[0] === 0 && ratingRange[1] === 5}
                      onChange={() => setRatingRange([0, 5])}
                      className="text-[#AF8D64] focus:ring-[#AF8D64]"
                    />
                    <span className="font-montserrat text-xs lg:text-sm text-gray-700">All</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingRange[0] === 4 && ratingRange[1] === 5}
                      onChange={() => setRatingRange([4, 5])}
                      className="text-[#AF8D64] focus:ring-[#AF8D64]"
                    />
                    <span className="font-montserrat text-xs text-gray-700">Between 4-5 ⭐</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingRange[0] === 3 && ratingRange[1] === 4}
                      onChange={() => setRatingRange([3, 4])}
                      className="text-[#AF8D64] focus:ring-[#AF8D64]"
                    />
                    <span className="font-montserrat text-xs text-gray-700">Between 3-4 ⭐</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingRange[0] === 2 && ratingRange[1] === 3}
                      onChange={() => setRatingRange([2, 3])}
                      className="text-[#AF8D64] focus:ring-[#AF8D64]"
                    />
                    <span className="font-montserrat text-xs text-gray-700">Between 2-3 ⭐</span>
                  </label>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="font-montserrat font-semibold text-xs lg:text-sm text-gray-700 block mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {currentProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${product.id}`} className="relative">
                <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-t-lg" />
                {product.badge && (
                  <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-montserrat font-bold rounded ${
                    product.badge === 'New' ? 'bg-green-500 text-white' : 'bg-[#AF8D64] text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-montserrat font-bold rounded">
                    -{product.discount}%
                  </span>
                )}
              </Link>
              
              <div className="p-4">
                <p className="font-montserrat text-xs text-gray-500 uppercase">{product.brand}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-montserrat font-semibold text-gray-900 hover:text-[#AF8D64] mb-2">
                    {product.title}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? "fill-[#AF8D64] text-[#AF8D64]" : "text-gray-300"}
                    />
                  ))}
                  <span className="font-montserrat text-xs text-gray-600 ml-1">({product.rating})</span>
                </div>
                
                <div className="mb-3">
                  {product.discount ? (
                    <div className="flex items-center gap-2">
                      <p className="font-montserrat font-bold text-lg text-red-500">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </p>
                      <p className="font-montserrat text-sm text-gray-500 line-through">${product.price}</p>
                    </div>
                  ) : (
                    <p className="font-montserrat font-bold text-lg text-[#AF8D64]">${product.price}</p>
                  )}
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded-lg font-montserrat text-sm font-semibold flex items-center justify-center gap-2 ${
                    product.inStock
                      ? 'bg-black text-white hover:bg-[#AF8D64]'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={16} />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 lg:gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg font-montserrat text-sm disabled:opacity-50"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 lg:px-4 py-2 rounded-lg font-montserrat text-sm ${
                  currentPage === i + 1
                    ? 'bg-[#AF8D64] text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg font-montserrat text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};
