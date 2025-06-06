import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useCategories } from '@/hooks/useSupabaseData';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  categoryId: string;
  imageUrl: string;
  images: string[];
  dimensions: string;
  material: string;
  color: string;
  weight: string;
  stockQuantity: string;
  featured: boolean;
  inStock: boolean;
  specifications: {
    features: string[];
    warranty: string;
    assembly: string;
  };
}

const AdminAddProduct = () => {
  const queryClient = useQueryClient();
  const { data: categories } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    categoryId: '',
    imageUrl: '',
    images: [],
    dimensions: '',
    material: '',
    color: '',
    weight: '',
    stockQuantity: '0',
    featured: false,
    inStock: true,
    specifications: {
      features: [],
      warranty: '',
      assembly: ''
    }
  });

  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificationChange = (field: keyof ProductForm['specifications'], value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      }
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          features: [...prev.specifications.features, newFeature.trim()]
        }
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        features: prev.specifications.features.filter((_, i) => i !== index)
      }
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Valid price is required');
      return false;
    }
    if (!formData.categoryId) {
      toast.error('Category is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    console.log('Submitting product with data:', formData);

    try {
      // Prepare the product data with correct field mapping
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
        original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        category_id: formData.categoryId,
        image_url: formData.imageUrl.trim() || null,
        images: formData.images.length > 0 ? formData.images : null,
        dimensions: formData.dimensions.trim() || null,
        material: formData.material.trim() || null,
        color: formData.color.trim() || null,
        weight: formData.weight.trim() || null,
        stock_quantity: parseInt(formData.stockQuantity) || 0,
        featured: formData.featured,
        in_stock: formData.inStock,
        specifications: formData.specifications.features.length > 0 || 
                       formData.specifications.warranty.trim() || 
                       formData.specifications.assembly.trim() ? {
          features: formData.specifications.features,
          warranty: formData.specifications.warranty.trim() || null,
          assembly: formData.specifications.assembly.trim() || null
        } : null,
        rating: 4.5, // Default rating
        review_count: 0 // Default review count
      };

      console.log('Final product data being inserted:', productData);

      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select(`
          *,
          categories:category_id (
            id,
            name,
            description,
            image_url
          )
        `);

      if (error) {
        console.error('Supabase insert error:', error);
        toast.error(`Failed to add product: ${error.message}`);
        return;
      }

      console.log('Product created successfully:', data);
      
      // Invalidate and refetch queries to update the UI
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['products', 'category'] }),
        queryClient.refetchQueries({ queryKey: ['products'] })
      ]);
      
      toast.success('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        categoryId: '',
        imageUrl: '',
        images: [],
        dimensions: '',
        material: '',
        color: '',
        weight: '',
        stockQuantity: '0',
        featured: false,
        inStock: true,
        specifications: {
          features: [],
          warranty: '',
          assembly: ''
        }
      });
      
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(`Failed to add product: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Images and Media */}
          <Card>
            <CardHeader>
              <CardTitle>Images and Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Main Image URL *</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">This will be the primary product image</p>
              </div>

              <div>
                <Label>Additional Images</Label>
                <div className="flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Enter image URL"
                  />
                  <Button type="button" onClick={addImage} variant="outline">
                    Add
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm truncate">{image}</span>
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          variant="ghost"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder="L x W x H"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="10 kg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => handleInputChange('material', e.target.value)}
                    placeholder="Wood, Metal, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Brown, White, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Enter a feature"
                  />
                  <Button type="button" onClick={addFeature} variant="outline">
                    Add
                  </Button>
                </div>
                {formData.specifications.features.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.specifications.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{feature}</span>
                        <Button
                          type="button"
                          onClick={() => removeFeature(index)}
                          variant="ghost"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="warranty">Warranty</Label>
                <Input
                  id="warranty"
                  value={formData.specifications.warranty}
                  onChange={(e) => handleSpecificationChange('warranty', e.target.value)}
                  placeholder="1 year warranty"
                />
              </div>

              <div>
                <Label htmlFor="assembly">Assembly</Label>
                <Input
                  id="assembly"
                  value={formData.specifications.assembly}
                  onChange={(e) => handleSpecificationChange('assembly', e.target.value)}
                  placeholder="Assembly required/included"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Product</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="inStock">In Stock</Label>
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
