import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProduct, getProducts, getCategories } from '../services/products';
import { useCart } from '../state/CartContext';
import { FeaturedProducts } from './FeaturedProducts';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [rawProduct, allProducts, categories] = await Promise.all([
          getProduct(id),
          getProducts(),
          getCategories()
        ]);
        
        if (rawProduct) {
          const category = categories.find(c => c.id === rawProduct.categoryId);
          const images = rawProduct.images.length >= 3 
            ? rawProduct.images.slice(0, 3)
            : [...rawProduct.images, ...Array(3 - rawProduct.images.length).fill(rawProduct.images[0])];

          setProduct({
            id: rawProduct.id,
            title: rawProduct.title,
            brand: rawProduct.brand,
            price: rawProduct.price,
            rating: rawProduct.rating.average,
            reviews: rawProduct.rating.count,
            images: images,
            description: rawProduct.description,
            stock: rawProduct.stock,
            inStock: rawProduct.stock > 0,
            category: category?.name || 'Other',
            specs: rawProduct.specs,
            badge: rawProduct.badge,
            discount: rawProduct.discount
          });

          // Get 4 similar products (same category)
          const similar = allProducts
            .filter(p => p.categoryId === rawProduct.categoryId && p.id !== rawProduct.id)
            .slice(0, 4);
          setSimilarProducts(similar);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({ ...product, quantity });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#AF8D64]" />
        <span className="ml-2 font-montserrat text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="font-montserrat text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/shop" className="inline-flex items-center gap-2 font-montserrat text-gray-600 hover:text-[#AF8D64] mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img src={product.images[selectedImage]} alt={product.title} className="w-full h-auto rounded-lg mb-4" />
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImage === index ? 'border-[#AF8D64]' : 'border-gray-200'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-montserrat text-sm text-gray-500 uppercase mb-2">{product.brand}</p>
              <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

              {product.badge && (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-montserrat font-semibold mb-4 ${
                  product.badge === 'New' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {product.badge}
                </span>
              )}

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? "fill-[#AF8D64] text-[#AF8D64]" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="font-montserrat text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                {product.discount ? (
                  <div className="flex items-center gap-3">
                    <p className="font-montserrat text-4xl font-bold text-red-600">
                      DT {(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </p>
                    <p className="font-montserrat text-2xl text-gray-400 line-through">
                      DT {product.price}
                    </p>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-montserrat font-semibold">
                      -{product.discount}%
                    </span>
                  </div>
                ) : (
                  <p className="font-montserrat text-4xl font-bold text-[#AF8D64]">
                    DT {product.price}
                  </p>
                )}
              </div>

              <p className="font-montserrat text-gray-700 mb-6">{product.description}</p>

              {/* Specs */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-montserrat font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="space-y-2 font-montserrat text-sm">
                  <p><span className="font-semibold">Size:</span> {product.specs.sizeMl}ml</p>
                  <p><span className="font-semibold">Type:</span> {product.specs.concentration}</p>
                  <p><span className="font-semibold">Category:</span> {product.category}</p>
                  <p><span className="font-semibold">Stock:</span> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <h3 className="font-montserrat font-semibold text-gray-900 mb-3">Fragrance Notes</h3>
                <div className="space-y-2 font-montserrat text-sm">
                  <p><span className="font-semibold">Top:</span> {product.specs.topNotes.join(', ')}</p>
                  <p><span className="font-semibold">Heart:</span> {product.specs.heartNotes.join(', ')}</p>
                  <p><span className="font-semibold">Base:</span> {product.specs.baseNotes.join(', ')}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <label className="font-montserrat font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-montserrat font-bold text-lg w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-lg font-montserrat font-semibold text-lg flex items-center justify-center gap-3 ${
                  product.inStock
                    ? 'bg-[#AF8D64] text-white hover:bg-[#9a7a50]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {product.inStock ? `Add to Cart - DT ${((product.discount ? product.price * (1 - product.discount / 100) : product.price) * quantity).toFixed(2)}` : 'Out of Stock'}
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <FeaturedProducts filter="similar" title="Similar Products" />
          </div>
        )}
      </div>
    </div>
  );
};
