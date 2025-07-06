
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cross } from 'lucide-react';

const Identity = () => {
  return (
    <section className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <Cross className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-purple-600">Our Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-gray-700 leading-relaxed">
                KRCBC lives and witnesses the life and message of Christ in its mission.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Identity;
