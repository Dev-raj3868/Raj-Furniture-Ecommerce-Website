
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      text: "Amazing quality furniture at great prices. The delivery was quick and the customer service was excellent!",
      customer: "Customer 1"
    },
    {
      id: 2,
      text: "Love the modern designs and comfortable pieces. Highly recommend Raj Furniture!",
      customer: "Customer 2"
    },
    {
      id: 3,
      text: "Outstanding service and beautiful furniture. Will definitely shop here again!",
      customer: "Customer 3"
    }
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "{testimonial.text}"
                </p>
                <div className="font-semibold text-gray-800">{testimonial.customer}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
