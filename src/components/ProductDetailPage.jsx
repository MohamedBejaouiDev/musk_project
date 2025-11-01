import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  Crown,
  Sparkles,
  ChevronLeft,
  Share2
} from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { useCart } from '../state/CartContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const rawProduct = productsData.find(p => p.id === parseInt(id));
    addItem({ ...product, stock: rawProduct?.stock || 0, quantity });
  };

  useEffect(() => {
    const rawProduct = productsData.find(p => p.id === parseInt(id));
    if (rawProduct) {
      const category = categoriesData.find(c => c.id === rawProduct.categoryId);
      const isNew = new Date(rawProduct.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const isBestseller = rawProduct.popularity >= 95;
      
      const scentNotes = [
        ...rawProduct.specs.topNotes.map(note => ({ note, category: 'Top', description: 'Opening notes' })),
        ...rawProduct.specs.heartNotes.map(note => ({ note, category: 'Heart', description: 'Middle notes' })),
        ...rawProduct.specs.baseNotes.map(note => ({ note, category: 'Base', description: 'Lasting notes' }))
      ];

      setProduct({
        id: rawProduct.id,
        name: rawProduct.title,
        brand: rawProduct.brand,
        price: rawProduct.price,
        rating: rawProduct.rating.average,
        reviews: rawProduct.rating.count,
        images: rawProduct.images,
        scentNotes,
        size: `${rawProduct.specs.sizeMl}ml`,
        category: category?.name || 'Other',
        inStock: rawProduct.stock > 0,
        isNew,
        isBestseller,
        description: rawProduct.description,
        longDescription: rawProduct.description,
        ingredients: `Alcohol Denat., Fragrance (${[...rawProduct.specs.topNotes, ...rawProduct.specs.baseNotes].join(', ')}), Aqua, Benzyl Alcohol, Citral, Limonene, Linalool.`,
        howToUse: "Spray onto pulse points - wrists, neck, and behind ears. For longer lasting scent, apply to moisturized skin. Avoid rubbing wrists together as this can break down the fragrance molecules.",
        details: [
          { label: "Concentration", value: rawProduct.specs.concentration },
          { label: "Size", value: `${rawProduct.specs.sizeMl}ml` },
          { label: "Stock", value: rawProduct.stock > 0 ? 'In Stock' : 'Out of Stock' },
          { label: "Category", value: category?.name || 'Other' }
        ]
      });

      const related = productsData
        .filter(p => p.id !== rawProduct.id && p.categoryId === rawProduct.categoryId)
        .slice(0, 3)
        .map(p => ({ id: p.id, name: p.title, price: p.price, image: p.images[0] }));
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50/30 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#AF8D64] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const benefits = [
    { icon: Truck, title: "Free Shipping", description: "Complimentary express delivery on all orders" },
    { icon: Shield, title: "Authenticity Guaranteed", description: "100% genuine luxury fragrances" },
    { icon: RotateCcw, title: "Easy Returns", description: "30-day return policy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50/30">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 text-sm text-gray-600 font-montserrat">
            <Link to="/shop" className="hover:text-[#AF8D64] transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Back to Shop
            </Link>
            <span>/</span>
            <span className="text-[#AF8D64]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover"
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 h-24 bg-white/80 backdrop-blur-sm rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-[#AF8D64] shadow-lg' 
                      : 'border-white/30 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Brand & Badges */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-montserrat text-sm text-gray-500 uppercase tracking-wide mb-1">
                  {product.brand}
                </p>
                <div className="flex items-center gap-3">
                  <h1 className="font-montserrat text-4xl lg:text-5xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  {product.isBestseller && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-black text-white px-3 py-1 rounded-full text-sm font-montserrat font-bold uppercase tracking-wide flex items-center gap-1"
                    >
                      <Crown className="w-4 h-4" />
                      Bestseller
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-12 h-12 rounded-2xl backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-500/20 text-red-500' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-600 hover:bg-white transition-all duration-300"
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) 
                        ? "fill-[#AF8D64] text-[#AF8D64]" 
                        : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="font-montserrat text-xl font-bold text-gray-900">
                  {product.rating}
                </span>
              </div>
              <span className="font-montserrat text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="font-montserrat font-bold text-4xl text-[#AF8D64]">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="font-montserrat text-2xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="font-montserrat font-bold text-lg text-green-600">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Scent Notes */}
            <div>
              <h3 className="font-montserrat font-semibold text-gray-900 mb-3">Scent Composition</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.scentNotes.map((note, index) => (
                  <motion.div
                    key={note.note}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-montserrat font-bold text-gray-900">{note.note}</span>
                      <span className="font-montserrat text-sm text-[#AF8D64] bg-[#AF8D64]/10 px-2 py-1 rounded-full">
                        {note.category}
                      </span>
                    </div>
                    <p className="font-montserrat text-sm text-gray-600">{note.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Size & Quantity */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-montserrat font-semibold text-gray-900 block mb-3">
                  Size
                </label>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <span className="font-montserrat text-gray-900">{product.size}</span>
                </div>
              </div>

              <div>
                <label className="font-montserrat font-semibold text-gray-900 block mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-600 hover:bg-white transition-all duration-300 font-montserrat text-xl"
                  >
                    -
                  </button>
                  <span className="font-montserrat text-xl font-bold text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-600 hover:bg-white transition-all duration-300 font-montserrat text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-5 px-8 rounded-2xl font-montserrat font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                product.inStock
                  ? 'bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {product.inStock ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
            </motion.button>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <benefit.icon className="w-8 h-8 text-[#AF8D64] mx-auto mb-2" />
                  <h4 className="font-montserrat font-semibold text-gray-900 text-sm">
                    {benefit.title}
                  </h4>
                  <p className="font-montserrat text-xs text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'details', label: 'Details' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'how-to-use', label: 'How to Use' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 font-montserrat font-semibold text-lg border-b-2 transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'border-[#AF8D64] text-[#AF8D64]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="prose prose-lg max-w-none"
                >
                  <p className="font-montserrat text-gray-700 leading-relaxed text-lg">
                    {product.longDescription}
                  </p>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {product.details.map((detail, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-montserrat font-semibold text-gray-700">{detail.label}</span>
                      <span className="font-montserrat text-gray-600">{detail.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'ingredients' && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="font-montserrat text-gray-700 leading-relaxed mb-6">
                    {product.ingredients}
                  </p>
                  <div className="bg-amber-50 rounded-2xl p-6">
                    <h4 className="font-montserrat font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#AF8D64]" />
                      Natural Ingredients
                    </h4>
                    <p className="font-montserrat text-gray-600 text-sm">
                      This fragrance contains over 85% natural ingredients sourced from sustainable farms around the world.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'how-to-use' && (
                <motion.div
                  key="how-to-use"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="font-montserrat text-gray-700 leading-relaxed mb-6">
                    {product.howToUse}
                  </p>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <h4 className="font-montserrat font-bold text-gray-900 mb-4">Tips for Best Results</h4>
                    <ul className="font-montserrat text-gray-600 space-y-2">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#AF8D64] rounded-full"></div>
                        Apply to pulse points where blood vessels are closest to the skin
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#AF8D64] rounded-full"></div>
                        Store in a cool, dark place away from direct sunlight
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#AF8D64] rounded-full"></div>
                        The scent may evolve differently based on your skin chemistry
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-3xl transition-all duration-500"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-montserrat font-bold text-xl text-[#AF8D64]">
                      ${relatedProduct.price}
                    </span>
                    <Link to={`/product/${relatedProduct.id}`}>
                      <button className="bg-black text-white px-4 py-2 rounded-2xl font-montserrat font-semibold text-sm hover:bg-[#AF8D64] transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};