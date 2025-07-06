
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Leaf, Users, HandHeart, Scale } from 'lucide-react';

const CoreValues = () => {
  const values = [
    {
      title: "Dignity of Human Person",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-600"
    },
    {
      title: "Environmental Justice",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-600"
    },
    {
      title: "Gender Equality and Social Justice",
      icon: Scale,
      color: "text-blue-600",
      bgColor: "bg-blue-600"
    },
    {
      title: "Love, Compassion and Reconciliation",
      icon: HandHeart,
      color: "text-pink-600",
      bgColor: "bg-pink-600"
    },
    {
      title: "Peace, Justice and Integrity",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-600"
    }
  ];

  return (
    <section className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The fundamental principles that guide our mission and service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-12 h-12 ${value.bgColor} rounded-full flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-semibold text-lg ${value.color} mb-2`}>
                    {value.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
