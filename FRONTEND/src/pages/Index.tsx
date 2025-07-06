import React from 'react';
import Hero from '@/components/sections/Hero';
import Bishops from '@/components/sections/Bishops';
import MissionVision from '@/components/sections/MissionVision';
import NewsEvents from '@/components/sections/NewsEvents';
import Identity from '@/components/sections/Identity';
import CoreValues from '@/components/sections/CoreValues';
import CorePrinciples from '@/components/sections/CorePrinciples';
import Mandates from '@/components/sections/Mandates';
import Pope from '@/components/sections/Pope';

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Identity />
        <MissionVision />
        <Pope />
        <Bishops />
        <CoreValues />
        <CorePrinciples />
        <Mandates />
        <NewsEvents />
      </main>
    </div>
  );
};

export default Index;
