
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const Mandates = () => {
  const mandates = [
    "Promote Participation, Communion, and Mission in Living Our Faith.",
    "Develop and implement approaches that reflect and address the unique mission, adapting to local realities.",
    "Actively realize the teachings of Vatican II, Catholic Social Teachings, and Post Conciliar Magisterium within diverse contexts.",
    "Foster an environment of inclusion and diversity, while embracing and incorporating Asian spiritual values into our regional practices.",
    "Encourage a culture of discernment, collaboration, and networking at all levels."
  ];

  return (
    <section className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Mandates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The specific commitments that define our pastoral and organizational responsibilities
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-2 border-gray-100">
            <CardContent className="p-8">
              <div className="space-y-6">
                {mandates.map((mandate, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {mandate}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Mandates;
