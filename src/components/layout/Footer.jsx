export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-montserrat text-lg font-bold mb-4 text-[#AF8D64]">MUSK.MH</h3>
            <p className="font-montserrat text-gray-600">Discover your signature scent with our curated collection of luxury perfumes.</p>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4 text-black">Categories</h4>
            <ul className="space-y-2 font-montserrat text-gray-600">
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Floral</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Woody</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Fresh</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Oriental</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4 text-black">Support</h4>
            <ul className="space-y-2 font-montserrat text-gray-600">
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Contact Us</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Shipping Info</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Returns</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Size Guide</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4 text-black">Connect</h4>
            <ul className="space-y-2 font-montserrat text-gray-600">
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Newsletter</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Facebook</li>
              <li className="hover:text-[#AF8D64] transition-colors cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="font-montserrat text-gray-600">&copy; 2024 MUSK.MH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};