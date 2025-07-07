import React from 'react';
import { Helmet } from 'react-helmet-async';
import YouthMinistry from '@/components/sections/YouthMinistry';

const YouthMinistryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Youth Ministry - KRCBC</title>
        <meta name="description" content="Discover the youth ministry programs of the Kerala Region of Catholic Bishops Conference (KRCBC). Join our youth activities, events, and spiritual formation programs." />
        <meta name="keywords" content="KRCBC Youth Ministry, Kerala Catholic Youth, Youth Programs, Catholic Youth Activities, Youth Formation, Young Catholics" />
        <meta property="og:title" content="Youth Ministry - KRCBC" />
        <meta property="og:description" content="Discover the youth ministry programs of the Kerala Region of Catholic Bishops Conference (KRCBC). Join our youth activities, events, and spiritual formation programs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/youth-ministry" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Youth Ministry - KRCBC" />
        <meta name="twitter:description" content="Discover the youth ministry programs of the Kerala Region of Catholic Bishops Conference (KRCBC). Join our youth activities, events, and spiritual formation programs." />
        <link rel="canonical" href="https://krcbc.in/youth-ministry" />
      </Helmet>
      <main>
        <YouthMinistry />
      </main>
    </div>
  );
};

export default YouthMinistryPage;
