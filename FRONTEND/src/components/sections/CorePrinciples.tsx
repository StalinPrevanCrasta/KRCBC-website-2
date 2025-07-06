
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users2, GitBranch, Eye, HandHeart, UserCheck } from 'lucide-react';

const CorePrinciples = () => {
  const principles = [
    {
      title: "Spirit of Synodality in all Levels",
      icon: Users2,
      color: "text-blue-600",
      bgColor: "bg-blue-600"
    },
    {
      title: "Subsidiarity and Inclusive Participation",
      icon: GitBranch,
      color: "text-green-600",
      bgColor: "bg-green-600"
    },
    {
      title: "Accountability and Transparency",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-600"
    },
    {
      title: "Collaboration and sharing",
      icon: HandHeart,
      color: "text-orange-600",
      bgColor: "bg-orange-600"
    },
    {
      title: "Preferential Option for the Excluded",
      icon: UserCheck,
      color: "text-red-600",
      bgColor: "bg-red-600"
    }
  ];

  return (
    <section className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Core Principles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The guiding principles that shape our approach and methodology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {principles.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <Card key={index} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-12 h-12 ${principle.bgColor} rounded-full flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-semibold text-lg ${principle.color} mb-2`}>
                    {principle.title}
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

export default CorePrinciples;
