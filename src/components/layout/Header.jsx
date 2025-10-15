import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Parfum
          </Link>
        </div>
      </div>
    </header>
  );
};