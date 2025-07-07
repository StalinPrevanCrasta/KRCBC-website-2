import React from 'react';
import { Helmet } from 'react-helmet-async';
import Programs from '@/components/sections/Programs';

const ProgramsPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Programs - KRCBC</title>
        <meta name="description" content="Explore the various programs and initiatives of the Kerala Region of Catholic Bishops Conference (KRCBC), including educational, social, and spiritual programs." />
        <meta name="keywords" content="KRCBC Programs, Kerala Catholic Programs, Catholic Education, Social Programs, Spiritual Programs, Church Initiatives" />
        <meta property="og:title" content="Programs - KRCBC" />
        <meta property="og:description" content="Explore the various programs and initiatives of the Kerala Region of Catholic Bishops Conference (KRCBC), including educational, social, and spiritual programs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/programs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programs - KRCBC" />
        <meta name="twitter:description" content="Explore the various programs and initiatives of the Kerala Region of Catholic Bishops Conference (KRCBC), including educational, social, and spiritual programs." />
        <link rel="canonical" href="https://krcbc.in/programs" />
      </Helmet>
      <main>
        <Programs />
      </main>
    </div>
  );
};

export default ProgramsPage;
