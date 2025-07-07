import React from 'react';
import { Helmet } from 'react-helmet-async';
import SocialServices from '@/components/sections/SocialServices';

const SocialServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Social Services - KRCBC</title>
        <meta name="description" content="Discover the social services and community outreach programs of the Kerala Region of Catholic Bishops Conference (KRCBC). Learn about our charitable works and community support initiatives." />
        <meta name="keywords" content="KRCBC Social Services, Kerala Catholic Charity, Community Outreach, Social Work, Catholic Social Services, Charitable Programs" />
        <meta property="og:title" content="Social Services - KRCBC" />
        <meta property="og:description" content="Discover the social services and community outreach programs of the Kerala Region of Catholic Bishops Conference (KRCBC). Learn about our charitable works and community support initiatives." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/social-services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Social Services - KRCBC" />
        <meta name="twitter:description" content="Discover the social services and community outreach programs of the Kerala Region of Catholic Bishops Conference (KRCBC). Learn about our charitable works and community support initiatives." />
        <link rel="canonical" href="https://krcbc.in/social-services" />
      </Helmet>
      <main>
        <SocialServices />
      </main>
    </div>
  );
};

export default SocialServicesPage;
