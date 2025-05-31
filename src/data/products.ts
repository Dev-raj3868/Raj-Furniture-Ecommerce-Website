
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  category: string;
  subCategory: string;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  fastDelivery?: boolean;
  freeDelivery?: boolean;
}

export const categories = [
  { id: 'sofas', name: 'Sofas', icon: '🛋️' },
  { id: 'chairs', name: 'Chairs', icon: '🪑' },
  { id: 'tables', name: 'Tables', icon: '🪑' },
  { id: 'beds', name: 'Beds', icon: '🛏️' },
  { id: 'storage', name: 'Storage', icon: '🗄️' },
  { id: 'decor', name: 'Decor', icon: '🏺' },
  { id: 'lighting', name: 'Lighting', icon: '💡' },
  { id: 'outdoor', name: 'Outdoor', icon: '🌿' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Modern L-Shape Sofa Set',
    price: 45999,
    originalPrice: 65999,
    discount: 30,
    rating: 4.5,
    reviewCount: 234,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    description: 'Premium L-shaped sofa set with comfortable cushioning and modern design. Perfect for contemporary living spaces.',
    features: ['Premium Fabric', 'Wooden Frame', 'Comfortable Seating', '5 Year Warranty'],
    category: 'sofas',
    subCategory: 'sectional',
    colors: ['Gray', 'Navy Blue', 'Beige', 'Brown'],
    inStock: true,
    fastDelivery: true,
    freeDelivery: true
  },
  {
    id: '2',
    name: 'Executive Office Chair',
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    rating: 4.3,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    description: 'Ergonomic office chair with lumbar support and adjustable height. Perfect for long working hours.',
    features: ['Ergonomic Design', 'Lumbar Support', 'Height Adjustable', '360° Rotation'],
    category: 'chairs',
    subCategory: 'office',
    colors: ['Black', 'Brown', 'White'],
    inStock: true,
    fastDelivery: true
  },
  {
    id: '3',
    name: 'Dining Table Set for 6',
    price: 28999,
    originalPrice: 39999,
    discount: 28,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    description: 'Elegant dining table set with 6 chairs. Made from solid wood with a beautiful finish.',
    features: ['Solid Wood', 'Seats 6 People', 'Elegant Design', 'Easy Assembly'],
    category: 'tables',
    subCategory: 'dining',
    colors: ['Natural Wood', 'Dark Walnut', 'White'],
    inStock: true,
    freeDelivery: true
  },
  {
    id: '4',
    name: 'King Size Platform Bed',
    price: 22999,
    originalPrice: 32999,
    discount: 30,
    rating: 4.4,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    description: 'Modern platform bed with built-in storage. No box spring required.',
    features: ['Built-in Storage', 'No Box Spring Needed', 'Modern Design', 'Easy Assembly'],
    category: 'beds',
    subCategory: 'platform',
    colors: ['White', 'Gray', 'Natural Wood'],
    sizes: ['Queen', 'King'],
    inStock: true,
    fastDelivery: true
  },
  {
    id: '5',
    name: 'Modular Wardrobe System',
    price: 35999,
    originalPrice: 49999,
    discount: 28,
    rating: 4.2,
    reviewCount: 198,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    description: 'Spacious modular wardrobe with multiple compartments and hanging space.',
    features: ['Modular Design', 'Multiple Compartments', 'Sliding Doors', 'Customizable'],
    category: 'storage',
    subCategory: 'wardrobe',
    colors: ['White', 'Brown', 'Gray'],
    sizes: ['2-Door', '3-Door', '4-Door'],
    inStock: true,
    freeDelivery: true
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (productId: string, category: string) => {
  return products.filter(product => 
    product.category === category && product.id !== productId
  ).slice(0, 4);
};
