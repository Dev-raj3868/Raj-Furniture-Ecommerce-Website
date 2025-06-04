
import React from 'react';
import { Truck, Shield, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping on orders above ₹999"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "1-year warranty on all products"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Expert customer service"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 bg-blue-50">
              <CardContent className="pt-6">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
