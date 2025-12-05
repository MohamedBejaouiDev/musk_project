import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Tag, Search, X, Package, Filter, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { productsApi } from '../services/api.js';
import Sidebar from '../components/Sidebar.jsx';

const CATEGORY_OPTIONS = [
  { id: 1, name: 'Floral' },
  { id: 2, name: 'Woody' },
  { id: 3, name: 'Fresh' },
  { id: 4, name: 'Oriental' },
  { id: 5, name: 'Gourmand' },
  { id: 6, name: 'Citrus' }
];

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState('all');

  const load = async (searchTerm = search) => {
    setError('');
    try {
      setLoading(true);
      const res = await productsApi.list({ search: searchTerm, limit: 100 });
      setProducts(res.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const timer = setTimeout(() => load(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const remove = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsApi.remove(id);
      showToast('Product deleted successfully', 'success');
      await load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'out-of-stock') return product.stock === 0;
    if (filter === 'low-stock') return product.stock > 0 && product.stock <= 10;
    if (filter === 'with-discount') return product.discount > 0;
    return true;
  });

  const stats = {
    total: products.length,
    outOfStock: products.filter(p => p.stock === 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
    onDiscount: products.filter(p => p.discount > 0).length
  };

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#AF8D64] to-[#9a7a50] rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                  <p className="text-gray-600 mt-1">Manage your perfume inventory efficiently</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#AF8D64] to-[#9a7a50] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold shadow-md"
              >
                <Plus size={20} /> Add New Product
              </button>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Products" 
              value={stats.total} 
              icon={Package} 
              color="blue"
              gradient="from-blue-500 to-blue-600"
            />
            <StatCard 
              title="Out of Stock" 
              value={stats.outOfStock} 
              icon={X} 
              color="red"
              gradient="from-red-500 to-red-600"
            />
            <StatCard 
              title="Low Stock" 
              value={stats.lowStock} 
              icon={AlertTriangle} 
              color="orange"
              gradient="from-orange-500 to-orange-600"
            />
            <StatCard 
              title="On Discount" 
              value={stats.onDiscount} 
              icon={TrendingUp} 
              color="green"
              gradient="from-green-500 to-green-600"
            />
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                {/* Search Box */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products by name, brand..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 bg-gray-50"
                  />
                </div>
                
                {/* Filter Dropdown */}
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 bg-gray-50 appearance-none"
                  >
                    <option value="all">All Products</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="low-stock">Low Stock (≤10)</option>
                    <option value="with-discount">With Discount</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-3">
              <X size={20} />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AF8D64] mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product Info</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Brand</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pricing</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Stock Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Promotions</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-16 text-center">
                            <div className="max-w-md mx-auto">
                              <Package className="mx-auto mb-4 text-gray-300" size={64} />
                              <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                              <button 
                                onClick={() => setShowAddModal(true)} 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#AF8D64] text-white rounded-xl hover:bg-[#9a7a50] transition font-semibold shadow-sm"
                              >
                                <Plus size={16} /> Add Your First Product
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product) => (
                          <TableRow 
                            key={product.id} 
                            product={product} 
                            onEdit={() => { setCurrentProduct(product); setShowEditModal(true); }}
                            onPromo={() => { setCurrentProduct(product); setShowPromoModal(true); }}
                            onDelete={() => remove(product.id)}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Table Footer */}
                {filteredProducts.length > 0 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <p className="text-sm text-gray-600 font-medium">
                        Showing <span className="font-bold">{filteredProducts.length}</span> of <span className="font-bold">{products.length}</span> products
                      </p>
                      {filter !== 'all' && (
                        <button 
                          onClick={() => setFilter('all')}
                          className="text-sm text-[#AF8D64] hover:text-[#9a7a50] font-semibold flex items-center gap-2"
                        >
                          <X size={16} /> Clear filter
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <ProductModal 
            onClose={() => setShowAddModal(false)} 
            onSave={() => { load(); showToast('Product created successfully', 'success'); }} 
            showToast={showToast} 
          />
        )}
        {showEditModal && (
          <ProductModal 
            product={currentProduct} 
            onClose={() => { setShowEditModal(false); setCurrentProduct(null); }} 
            onSave={() => { load(); showToast('Product updated successfully', 'success'); }} 
            showToast={showToast} 
          />
        )}
        {showPromoModal && (
          <PromoModal 
            product={currentProduct} 
            onClose={() => { setShowPromoModal(false); setCurrentProduct(null); }} 
            onSave={() => { load(); showToast('Promotion updated successfully', 'success'); }} 
            showToast={showToast} 
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color, gradient }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    orange: 'bg-orange-100 text-orange-600',
    green: 'bg-green-100 text-green-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

// Table Row Component
function TableRow({ product, onEdit, onPromo, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {product.images?.[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="text-gray-400" size={24} />
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <span className="absolute -top-1 -right-1 bg-[#AF8D64] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {product.images.length}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-0 truncate">{product.title}</h3>
            <p className="text-[11px] text-gray-500 line-clamp-1">{product.description}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          {product.brand}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-gray-900 text-sm">DT {product.price}</span>
          {product.discount > 0 && (
            <span className="text-[11px] text-red-600 font-semibold">
              -{product.discount}% OFF
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            product.stock === 0 
              ? 'bg-red-100 text-red-800' 
              : product.stock <= 10 
              ? 'bg-orange-100 text-orange-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {product.stock} units
          </span>
          {product.stock <= 10 && product.stock > 0 && (
            <span className="text-[11px] text-orange-600 font-medium">Low stock</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
              {product.discount}% Discount
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <ActionButton 
            icon={Tag} 
            color="yellow" 
            onClick={onPromo}
            tooltip="Set Promotion"
          />
          <ActionButton 
            icon={Edit} 
            color="blue" 
            onClick={onEdit}
            tooltip="Edit Product"
          />
          <ActionButton 
            icon={Trash2} 
            color="red" 
            onClick={onDelete}
            tooltip="Delete Product"
          />
        </div>
      </td>
    </tr>
  );
}

// Action Button Component
function ActionButton({ icon: Icon, color, onClick, tooltip }) {
  const colorClasses = {
    yellow: 'text-yellow-600 hover:bg-yellow-50 hover:border-yellow-200',
    blue: 'text-blue-600 hover:bg-blue-50 hover:border-blue-200',
    red: 'text-red-600 hover:bg-red-50 hover:border-red-200'
  };

  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 border border-transparent hover:shadow-sm ${colorClasses[color]}`}
      title={tooltip}
    >
      <Icon size={16} />
    </button>
  );
}

// Toast Component
function Toast({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg text-white font-semibold flex items-center gap-3 min-w-[300px] ${
        type === 'success' 
          ? 'bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-700' 
          : 'bg-gradient-to-r from-red-500 to-red-600 border-l-4 border-red-700'
      }`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}>
        {type === 'success' ? '✓' : '✕'}
      </div>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <X size={16} />
      </button>
    </motion.div>
  );
}

// Enhanced ProductModal
function ProductModal({ product, onClose, onSave, showToast }) {
  const [formData, setFormData] = useState(product || {
    title: '', brand: '', category_id: CATEGORY_OPTIONS[0].id, price: '', discount: 0, badge: '', stock: 0,
    images: [''], description: '', 
    specs: { topNotes: [''], heartNotes: [''], baseNotes: [''], sizeMl: 50, concentration: 'EDP' }
  });

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    if (formData.images.length <= 1) return;
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const updateImageField = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const price = Number(formData.price);
      const stock = Number(formData.stock);
      const discount = formData.discount === '' ? 0 : Number(formData.discount);
      if (!Number.isFinite(price) || price <= 0) {
        showToast('Price must be greater than 0', 'error');
        return;
      }
      if (!Number.isFinite(stock) || stock < 0) {
        showToast('Stock must be zero or more', 'error');
        return;
      }
      if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
        showToast('Discount must be between 0 and 100', 'error');
        return;
      }

      const cleanNotes = (notes) => (notes || []).map((n) => n.trim()).filter(Boolean);

      const basePayload = {
        title: formData.title,
        brand: formData.brand,
        category_id: formData.category_id,
        price,
        stock,
        discount,
        badge: formData.badge || null,
        images: formData.images.filter(Boolean),
        description: formData.description,
        specs: {
          topNotes: cleanNotes(formData.specs?.topNotes),
          heartNotes: cleanNotes(formData.specs?.heartNotes),
          baseNotes: cleanNotes(formData.specs?.baseNotes),
          sizeMl: Number(formData.specs?.sizeMl) || 50,
          concentration: formData.specs?.concentration || 'EDP'
        }
      };

      if (product) {
        await productsApi.update(product.id, basePayload);
      } else {
        await productsApi.create(basePayload);
      }
      onSave();
      onClose();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <Modal onClose={onClose} title={product ? 'Edit Product' : 'Add New Product'} icon={Package}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Product Title"
            type="text"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
            placeholder="Enter product name"
          />
          <FormField
            label="Brand"
            type="text"
            value={formData.brand}
            onChange={(value) => setFormData({ ...formData, brand: value })}
            required
            placeholder="Enter brand name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Price (DT)"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: value })}
            required
            placeholder="0.00"
          />
          <FormField
            label="Stock Quantity"
            type="number"
            value={formData.stock}
            onChange={(value) => setFormData({ ...formData, stock: value })}
            required
            placeholder="0"
          />
          <FormField
            label="Discount %"
            type="number"
            value={formData.discount}
            onChange={(value) => setFormData({ ...formData, discount: value })}
            placeholder="0"
            min="0"
            max="100"
          />
        </div>

        {/* Multiple Image URLs Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-gray-700">Product Images</label>
            <button
              type="button"
              onClick={addImageField}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#AF8D64] text-white rounded-lg hover:bg-[#9a7a50] transition-colors duration-200"
            >
              <Plus size={16} /> Add Image
            </button>
          </div>
          <div className="space-y-3">
            {formData.images.map((img, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => updateImageField(index, e.target.value)}
                    placeholder={`Image URL ${index + 1}`}
                    required={index === 0}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 bg-gray-50"
                  />
                  {img && (
                    <div className="mt-2">
                      <img src={img} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded-lg border border-gray-200" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-transparent hover:border-red-200"
                    title="Remove image"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 bg-gray-50" 
            rows="3" 
            required 
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Promotional Badge"
            type="text"
            value={formData.badge}
            onChange={(value) => setFormData({ ...formData, badge: value })}
            placeholder="e.g. Best Seller, New Arrival"
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 bg-gray-50 appearance-none"
              required
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#AF8D64] to-[#9a7a50] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold shadow-md"
          >
            {product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Form Field Component
function FormField({ label, type, value, onChange, required, placeholder, min, max }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 bg-gray-50"
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={type === 'number' ? '0.01' : undefined}
      />
    </div>
  );
}

// Enhanced PromoModal
function PromoModal({ product, onClose, onSave, showToast }) {
  const [badge, setBadge] = useState(product?.badge || '');
  const [discount, setDiscount] = useState(product?.discount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productsApi.promo(product.id, { badge, discount: Number(discount) });
      onSave();
      onClose();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <Modal onClose={onClose} title="Set Promotion" icon={Tag}>
      {product && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <Package className="text-gray-400" size={24} />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{product.title}</p>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="text-sm font-medium text-gray-900">DT {product.price}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Promotional Badge"
          type="text"
          value={badge}
          onChange={setBadge}
          placeholder="e.g. Best Seller, New Arrival, Limited Edition"
        />
        
        <FormField
          label="Discount Percentage"
          type="number"
          value={discount}
          onChange={setDiscount}
          min="0"
          max="100"
          placeholder="0"
        />

        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#AF8D64] to-[#9a7a50] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold shadow-md"
          >
            Save Promotion
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Modal Container Component
function Modal({ onClose, title, icon: Icon, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" style={{ fontFamily: 'Montserrat' }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#AF8D64] rounded-lg flex items-center justify-center">
              <Icon className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}