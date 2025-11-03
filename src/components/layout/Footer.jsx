import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-montserrat font-bold text-xl text-[#AF8D64] mb-4">MUSK.MH</h3>
            <p className="font-montserrat text-gray-400 text-sm">
              Luxury fragrances crafted for those who appreciate elegance
            </p>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 font-montserrat text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-[#AF8D64]">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-[#AF8D64]">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-[#AF8D64]">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold mb-4">Support</h4>
            <ul className="space-y-2 font-montserrat text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#AF8D64]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#AF8D64]">Shipping</a></li>
              <li><a href="#" className="hover:text-[#AF8D64]">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 font-montserrat text-sm text-gray-400">
              <li>contact@musk.mh</li>
              <li>+1 (800) 555-1234</li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="font-montserrat text-sm text-gray-400">
            &copy; {currentYear} MUSK.MH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
