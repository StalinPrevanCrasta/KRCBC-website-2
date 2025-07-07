import React from 'react';
import { Helmet } from 'react-helmet-async';
import Support from '@/components/sections/Support';

const SupportPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Support - KRCBC</title>
        <meta name="description" content="Support the Kerala Region of Catholic Bishops Conference (KRCBC) through donations and volunteer opportunities. Help us continue our mission of serving the community." />
        <meta name="keywords" content="Support KRCBC, Catholic Donations, Volunteer Kerala, Church Support, KRCBC Donations, Catholic Charity" />
        <meta property="og:title" content="Support - KRCBC" />
        <meta property="og:description" content="Support the Kerala Region of Catholic Bishops Conference (KRCBC) through donations and volunteer opportunities. Help us continue our mission of serving the community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/support" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support - KRCBC" />
        <meta name="twitter:description" content="Support the Kerala Region of Catholic Bishops Conference (KRCBC) through donations and volunteer opportunities. Help us continue our mission of serving the community." />
        <link rel="canonical" href="https://krcbc.in/support" />
      </Helmet>
      <main>
        <Support />
      </main>
    </div>
  );
};

export default SupportPage;
