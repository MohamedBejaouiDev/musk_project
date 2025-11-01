import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  Star, 
  Heart, 
  ShoppingCart,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { useCart } from '../state/CartContext';

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedScents, setSelectedScents] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const brands = [...new Set(productsData.map(p => p.brand))].sort();
  const scentCategories = categoriesData.map(c => c.name);
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  useEffect(() => {
    const transformedProducts = productsData.map(p => {
      const category = categoriesData.find(c => c.id === p.categoryId);
      const isNew = new Date(p.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const isBestseller = p.popularity >= 95;
      return {
        id: p.id,
        name: p.title,
        brand: p.brand,
        price: p.price,
        rating: p.rating.average,
        reviews: p.rating.count,
        image: p.images[0],
        scentNotes: [...p.specs.topNotes.slice(0, 2), ...p.specs.baseNotes.slice(0, 1)],
        size: `${p.specs.sizeMl}ml`,
        category: category?.name || 'Other',
        inStock: p.stock > 0,
        isNew,
        isBestseller
      };
    });
    setProducts(transformedProducts);
    setFilteredProducts(transformedProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    filterProducts();
    setCurrentPage(1);
  }, [searchTerm, selectedBrands, priceRange, selectedScents, sortBy, products]);

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.scentNotes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedScents.length > 0) {
      filtered = filtered.filter(product => selectedScents.includes(product.category));
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    setFilteredProducts(filtered);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleScent = (scent) => {
    setSelectedScents(prev =>
      prev.includes(scent) ? prev.filter(s => s !== scent) : [...prev, scent]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setSelectedScents([]);
    setSearchTerm('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50/30 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#AF8D64] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="font-montserrat text-gray-600">Loading luxury scents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div>
              <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-2">
                Discover Your Scent
              </h1>
              <p className="font-montserrat text-gray-600">
                {filteredProducts.length} exquisite fragrances waiting to be discovered
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search fragrances, notes, brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#AF8D64] transition-all duration-300 font-montserrat"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 pr-10 font-montserrat focus:outline-none focus:border-[#AF8D64] transition-all duration-300"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden bg-[#AF8D64] text-white px-6 py-3 rounded-2xl font-montserrat font-semibold flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-80 flex-shrink-0"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-6 sticky top-32">
              {/* Filters Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-montserrat text-xl font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#AF8D64]" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="font-montserrat text-sm text-[#AF8D64] hover:text-[#9a7a50] transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 font-montserrat">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 font-montserrat text-gray-700 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-gray-300 text-[#AF8D64] focus:ring-[#AF8D64]"
                      />
                      <span className="group-hover:text-[#AF8D64] transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Scent Categories */}
              <div className="mb-8">
                <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Scent Family</h3>
                <div className="space-y-2">
                  {scentCategories.map(scent => (
                    <label key={scent} className="flex items-center gap-3 font-montserrat text-gray-700 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedScents.includes(scent)}
                        onChange={() => toggleScent(scent)}
                        className="rounded border-gray-300 text-[#AF8D64] focus:ring-[#AF8D64]"
                      />
                      <span className="group-hover:text-[#AF8D64] transition-colors">{scent}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBrands.length > 0 || selectedScents.length > 0 || priceRange[1] < 500) && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-montserrat font-semibold text-gray-900 mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrands.map(brand => (
                      <span key={brand} className="bg-[#AF8D64] text-white px-3 py-1 rounded-full text-sm font-montserrat flex items-center gap-1">
                        {brand}
                        <button onClick={() => toggleBrand(brand)} className="hover:text-gray-200">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedScents.map(scent => (
                      <span key={scent} className="bg-[#AF8D64] text-white px-3 py-1 rounded-full text-sm font-montserrat flex items-center gap-1">
                        {scent}
                        <button onClick={() => toggleScent(scent)} className="hover:text-gray-200">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {priceRange[1] < 500 && (
                      <span className="bg-[#AF8D64] text-white px-3 py-1 rounded-full text-sm font-montserrat flex items-center gap-1">
                        Under ${priceRange[1]}
                        <button onClick={() => setPriceRange([0, 500])} className="hover:text-gray-200">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">
                    No fragrances found
                  </h3>
                  <p className="font-montserrat text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-[#AF8D64] text-white px-8 py-3 rounded-2xl font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    key={sortBy + searchTerm + currentPage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                  >
                    {currentProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 mt-12"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className={`p-3 rounded-xl font-montserrat font-semibold transition-all ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-[#AF8D64] hover:text-white shadow-md'
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>

                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <motion.button
                              key={page}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCurrentPage(page)}
                              className={`w-12 h-12 rounded-xl font-montserrat font-semibold transition-all ${
                                currentPage === page
                                  ? 'bg-[#AF8D64] text-white shadow-lg'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                              }`}
                            >
                              {page}
                            </motion.button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="text-gray-400 px-2">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className={`p-3 rounded-xl font-montserrat font-semibold transition-all ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-[#AF8D64] hover:text-white shadow-md'
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-montserrat text-xl font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Filter Content - Same as desktop but stacked */}
                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 font-montserrat">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Brands</h3>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 font-montserrat text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="rounded border-gray-300 text-[#AF8D64] focus:ring-[#AF8D64]"
                          />
                          {brand}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Scent Categories */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Scent Family</h3>
                    <div className="space-y-2">
                      {scentCategories.map(scent => (
                        <label key={scent} className="flex items-center gap-3 font-montserrat text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedScents.includes(scent)}
                            onChange={() => toggleScent(scent)}
                            className="rounded border-gray-300 text-[#AF8D64] focus:ring-[#AF8D64]"
                          />
                          {scent}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-montserrat font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Clear All Filters
                  </button>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full bg-[#AF8D64] text-white py-3 rounded-2xl font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors"
                  >
                    Show {filteredProducts.length} Products
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    const rawProduct = productsData.find(p => p.id === product.id);
    addItem({ ...product, stock: rawProduct?.stock || 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div 
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-3xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-80">
          <Link to={`/product/${product.id}`}>
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-[#AF8D64] text-white px-3 py-1 rounded-full text-xs font-montserrat font-bold uppercase tracking-wide"
              >
                New
              </motion.span>
            )}
            {product.isBestseller && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-black text-white px-3 py-1 rounded-full text-xs font-montserrat font-bold uppercase tracking-wide flex items-center gap-1"
              >
                <Crown className="w-3 h-3" />
                Bestseller
              </motion.span>
            )}
            {!product.inStock && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-montserrat font-bold uppercase tracking-wide"
              >
                Out of Stock
              </motion.span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500/20 text-red-500' 
                  : 'bg-white/20 text-gray-600 hover:bg-white/30'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white/30 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Scent Notes Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4"
          >
            <h4 className="font-montserrat font-semibold text-white text-sm mb-2">Scent Notes</h4>
            <div className="flex flex-wrap gap-2">
              {product.scentNotes.map((note, noteIndex) => (
                <span 
                  key={noteIndex}
                  className="bg-[#AF8D64] text-white px-2 py-1 rounded-full text-xs font-montserrat"
                >
                  {note}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-2">
            <p className="font-montserrat text-sm text-gray-500 uppercase tracking-wide">
              {product.brand}
            </p>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-montserrat font-bold text-xl text-gray-900 hover:text-[#AF8D64] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) 
                    ? "fill-[#AF8D64] text-[#AF8D64]" 
                    : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="font-montserrat text-sm text-gray-600">
              ({product.rating})
            </span>
            <span className="font-montserrat text-sm text-gray-500">
              • {product.reviews} reviews
            </span>
          </div>

          {/* Price & Size */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-montserrat font-bold text-2xl text-[#AF8D64]">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="font-montserrat text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="font-montserrat text-sm text-gray-500">
              {product.size}
            </span>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!product.inStock}
            className={`w-full py-4 rounded-2xl font-montserrat font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              product.inStock
                ? 'bg-black text-white hover:bg-[#AF8D64]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            ) : (
              'Out of Stock'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};