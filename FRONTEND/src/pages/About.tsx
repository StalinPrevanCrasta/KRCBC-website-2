import React from 'react';
import { Helmet } from 'react-helmet-async';
import About from '@/components/sections/About';

const AboutPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>About Us - KRCBC</title>
        <meta name="description" content="Learn about the Kerala Region of Catholic Bishops Conference (KRCBC), our history, mission, and commitment to serving the Catholic community in Kerala." />
        <meta name="keywords" content="About KRCBC, Kerala Catholic Bishops, Catholic Church History, KRCBC Mission, Kerala Catholic Community" />
        <meta property="og:title" content="About Us - KRCBC" />
        <meta property="og:description" content="Learn about the Kerala Region of Catholic Bishops Conference (KRCBC), our history, mission, and commitment to serving the Catholic community in Kerala." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - KRCBC" />
        <meta name="twitter:description" content="Learn about the Kerala Region of Catholic Bishops Conference (KRCBC), our history, mission, and commitment to serving the Catholic community in Kerala." />
        <link rel="canonical" href="https://krcbc.in/about" />
      </Helmet>
      <main>
        <About />
      </main>
    </div>
  );
};

export default AboutPage;
