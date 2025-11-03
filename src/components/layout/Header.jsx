import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../state/CartContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);

    const handleAuthChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      setCurrentUser(updatedUser);
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/';
  };

  const handleNavClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      if (location.pathname === '/') {
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + path);
      }
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '#featured', label: 'Featured' },
    { path: '#about', label: 'About' },
    { path: '#contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-montserrat font-bold text-2xl text-[#AF8D64]">
            MUSK.MH
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="font-montserrat text-gray-700 hover:text-[#AF8D64] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="hidden lg:flex items-center gap-3">
                <span className="font-montserrat text-sm text-gray-700">Hi, {currentUser.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-montserrat text-sm text-gray-700 hover:text-[#AF8D64]"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link to="/login">
                  <button className="flex items-center gap-2 font-montserrat text-sm text-gray-700 hover:text-[#AF8D64]">
                    <LogIn size={16} />
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="flex items-center gap-2 font-montserrat text-sm bg-[#AF8D64] text-white px-4 py-2 rounded-lg hover:bg-[#9a7a50]">
                    <UserPlus size={16} />
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative">
              <ShoppingCart size={20} className="text-gray-700 hover:text-[#AF8D64]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#AF8D64] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-montserrat font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => { handleNavClick(e, item.path); setIsOpen(false); }}
                  className="font-montserrat text-gray-700 hover:text-[#AF8D64]"
                >
                  {item.label}
                </Link>
              ))}
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-left font-montserrat text-gray-700 hover:text-[#AF8D64]"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="font-montserrat text-gray-700 hover:text-[#AF8D64]">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="font-montserrat text-gray-700 hover:text-[#AF8D64]">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
