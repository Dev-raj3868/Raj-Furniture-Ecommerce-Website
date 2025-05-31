
export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category_id: string;
  featured: boolean;
  in_stock: boolean;
  material?: string;
  dimensions?: string;
  color?: string;
  images?: string[];
  created_at?: string;
  categories?: {
    name: string;
  };
  // Required properties for ProductCard compatibility
  rating: number;
  reviewCount: number;
  features: string[];
  category: string;
  subCategory: string;
  inStock: boolean;
  // Optional properties from legacy system
  originalPrice?: number;
  discount?: number;
  // Additional properties for product variations
  colors?: string[];
  sizes?: string[];
}
