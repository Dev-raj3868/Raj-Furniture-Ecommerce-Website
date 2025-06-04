
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories...');
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
      
      console.log('Categories fetched:', data);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      console.log('Fetching products...');
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            id,
            name,
            description,
            image_url
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      console.log('Products fetched:', data?.length || 0, 'items');
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProductsByCategory = (categoryName: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryName],
    queryFn: async () => {
      console.log('Fetching products for category:', categoryName);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            id,
            name,
            description,
            image_url
          )
        `)
        .eq('categories.name', categoryName.toLowerCase())
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products by category:', error);
        throw error;
      }
      
      console.log(`Products for category ${categoryName}:`, data?.length || 0, 'items');
      return data;
    },
    enabled: !!categoryName,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      console.log('Fetching product with ID:', id);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            id,
            name,
            description,
            image_url
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }
      
      console.log('Product fetched:', data);
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
