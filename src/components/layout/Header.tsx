import React from "react";
import { Link } from "react-router-dom";
import { Bus } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Bus className="h-6 w-6 text-blue-500" />
            <span className="font-semibold text-xl text-gray-800">
              Selise Bus
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 hover:text-blue-600 transition-colors"
            >
              Book Seat
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors"
            >
              Admin Panel
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
