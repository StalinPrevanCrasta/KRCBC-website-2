import React from 'react';
import { Helmet } from 'react-helmet-async';
import Faith from '@/components/sections/Faith';

const FaithPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Faith - KRCBC</title>
        <meta name="description" content="Explore the Catholic faith with the Kerala Region of Catholic Bishops Conference (KRCBC). Find resources, teachings, and spiritual guidance for your faith journey." />
        <meta name="keywords" content="Catholic Faith, KRCBC Faith, Religious Education, Spiritual Guidance, Catholic Teachings, Kerala Catholic Faith" />
        <meta property="og:title" content="Faith - KRCBC" />
        <meta property="og:description" content="Explore the Catholic faith with the Kerala Region of Catholic Bishops Conference (KRCBC). Find resources, teachings, and spiritual guidance for your faith journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/faith" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Faith - KRCBC" />
        <meta name="twitter:description" content="Explore the Catholic faith with the Kerala Region of Catholic Bishops Conference (KRCBC). Find resources, teachings, and spiritual guidance for your faith journey." />
        <link rel="canonical" href="https://krcbc.in/faith" />
      </Helmet>
      <main>
        <Faith />
      </main>
    </div>
  );
};

export default FaithPage;
