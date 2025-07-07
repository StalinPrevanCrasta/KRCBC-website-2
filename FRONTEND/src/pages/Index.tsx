import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>KRCBC - Kerala Region of Catholic Bishops Conference</title>
        <meta name="description" content="Welcome to the Kerala Region of Catholic Bishops Conference (KRCBC). Discover our mission, vision, and commitment to serving the Catholic community in Kerala through faith, education, and social services." />
        <meta name="keywords" content="KRCBC, Kerala Catholic Bishops, Catholic Church Kerala, Catholic Conference, Kerala Region, Catholic Faith, Catholic Community" />
        <meta property="og:title" content="KRCBC - Kerala Region of Catholic Bishops Conference" />
        <meta property="og:description" content="Welcome to the Kerala Region of Catholic Bishops Conference (KRCBC). Discover our mission, vision, and commitment to serving the Catholic community in Kerala." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KRCBC - Kerala Region of Catholic Bishops Conference" />
        <meta name="twitter:description" content="Welcome to the Kerala Region of Catholic Bishops Conference (KRCBC). Discover our mission, vision, and commitment to serving the Catholic community in Kerala." />
        <link rel="canonical" href="https://krcbc.in" />
      </Helmet>
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
