import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Tag, Search, LogOut } from 'lucide-react';
import { Toast } from './Toast';

const API_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:6000';

export const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('adminToken') || localStorage.getItem('token');
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const user = getUser();
    if (!user || !user.isAdmin) {
      setToast({ message: 'Admin access required', type: 'error' });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    fetchProducts();
  }, [navigate]);

  const apiCall = async (endpoint, options = {}) => {
    const token = getToken();
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await apiCall(`/products?limit=100&search=${search}`);
      setProducts(data.products || []);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await apiCall(`/products/${id}`, { method: 'DELETE' });
      setToast({ message: 'Product deleted', type: 'success' });
      fetchProducts();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="font-montserrat text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchProducts()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64]"
            />
          </div>
          <button onClick={fetchProducts} className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
            Search
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-6 py-3 bg-[#AF8D64] text-white rounded-lg hover:bg-[#9a7a50]">
            <Plus size={20} /> Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Badge</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={product.images?.[0]} alt={product.title} className="w-12 h-12 object-cover rounded" />
                      <span className="font-medium text-gray-900">{product.title}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{product.brand}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">DT {product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.badge && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">{product.badge}</span>}
                      {product.discount > 0 && <span className="ml-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs">-{product.discount}%</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => { setCurrentProduct(product); setShowPromoModal(true); }} className="text-yellow-600 hover:text-yellow-800 mr-3">
                        <Tag size={18} />
                      </button>
                      <button onClick={() => { setCurrentProduct(product); setShowEditModal(true); }} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showAddModal && <ProductModal onClose={() => setShowAddModal(false)} onSave={fetchProducts} setToast={setToast} apiCall={apiCall} />}
      {showEditModal && <ProductModal product={currentProduct} onClose={() => { setShowEditModal(false); setCurrentProduct(null); }} onSave={fetchProducts} setToast={setToast} apiCall={apiCall} />}
      {showPromoModal && <PromoModal product={currentProduct} onClose={() => { setShowPromoModal(false); setCurrentProduct(null); }} onSave={fetchProducts} setToast={setToast} apiCall={apiCall} />}
    </div>
  );
};

const ProductModal = ({ product, onClose, onSave, setToast, apiCall }) => {
  const [formData, setFormData] = useState(product || {
    title: '', brand: '', category_id: 1, price: '', discount: 0, badge: '', stock: 0,
    images: [''], description: '', specs: { topNotes: [''], heartNotes: [''], baseNotes: [''], sizeMl: 50, concentration: 'EDP' }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, images: formData.images.filter(Boolean) };
      if (product) {
        await apiCall(`/products/${product.id}`, { method: 'PUT', body: JSON.stringify(payload) });
        setToast({ message: 'Product updated', type: 'success' });
      } else {
        await apiCall('/products', { method: 'POST', body: JSON.stringify(payload) });
        setToast({ message: 'Product created', type: 'success' });
      }
      onSave();
      onClose();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-lg p-6 max-w-2xl w-full my-8">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded" required />
          <input type="text" placeholder="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full px-4 py-2 border rounded" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="px-4 py-2 border rounded" required />
            <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="px-4 py-2 border rounded" required />
          </div>
          <input type="text" placeholder="Image URL" value={formData.images[0]} onChange={(e) => setFormData({ ...formData, images: [e.target.value] })} className="w-full px-4 py-2 border rounded" required />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded" rows="3" required />
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-[#AF8D64] text-white rounded hover:bg-[#9a7a50]">Save</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const PromoModal = ({ product, onClose, onSave, setToast, apiCall }) => {
  const [badge, setBadge] = useState(product.badge || '');
  const [discount, setDiscount] = useState(product.discount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiCall(`/products/${product.id}/promo`, { method: 'POST', body: JSON.stringify({ badge, discount: Number(discount) }) });
      setToast({ message: 'Promo updated', type: 'success' });
      onSave();
      onClose();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Set Promo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Badge (e.g. Best Seller, New)" value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full px-4 py-2 border rounded" />
          <input type="number" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} min="0" max="100" className="w-full px-4 py-2 border rounded" />
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-[#AF8D64] text-white rounded hover:bg-[#9a7a50]">Save</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
