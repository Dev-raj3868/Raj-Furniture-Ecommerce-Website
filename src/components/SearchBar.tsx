
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useSupabaseData';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length > 1) {
      const productSuggestions = products?.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5) || [];

      const categorySuggestions = categories?.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 3) || [];

      setSuggestions([
        ...categorySuggestions.map(cat => ({ ...cat, type: 'category' })),
        ...productSuggestions.map(prod => ({ ...prod, type: 'product' }))
      ]);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm, products, categories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'category') {
      navigate(`/category/${suggestion.name.toLowerCase()}`);
    } else {
      navigate(`/product/${suggestion.id}`);
    }
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // You can implement a dedicated search results page here
      console.log('Searching for:', searchTerm);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search furniture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 1 && setIsOpen(true)}
            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.id}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                {suggestion.type === 'category' ? (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">CAT</span>
                  </div>
                ) : (
                  <img
                    src={suggestion.image_url || '/placeholder.svg'}
                    alt={suggestion.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{suggestion.name}</p>
                  <p className="text-sm text-gray-500">
                    {suggestion.type === 'category' ? 'Category' : `₹${suggestion.price?.toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
