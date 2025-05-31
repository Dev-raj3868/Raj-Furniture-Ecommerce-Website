
import React, { useState } from 'react';
import { X, Gift } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 py-2 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse opacity-50"></div>
      <div className="relative flex items-center justify-center gap-2 text-sm font-medium">
        <Gift className="w-4 h-4 animate-bounce" />
        <span className="animate-pulse">
          🎉 MEGA SALE! Up to 60% OFF on all furniture! Free shipping on orders above ₹999 🎉
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
