import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const POPE_IMAGE =
  'https://catholicvirginian.org/wp-content/uploads/2025/05/20250510T0515-PORTRAIT-POPE-LEO-XIV-1796976-1.jpg';

const Pope = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Pope
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The spiritual father of the worldwide Catholic Church, guiding us in faith, unity, and compassion.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg border-0">
          <CardContent className="flex flex-col items-center p-8">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-blue-200 mb-4 shadow">
              <img
                src={POPE_IMAGE}
                alt="Pope Leo XIV"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Pope Leo XIV</h2>
            <p className="text-gray-600 text-center mb-2">
              Head of the Catholic Church and sovereign of the Vatican City State
              <br />
              
            </p>
            <div className="w-16 h-1 bg-blue-200 rounded-full mt-2 mb-2" />
            <p className="text-gray-500 text-sm text-center">
              "Let us protect with love all that God has given us!"
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Pope;