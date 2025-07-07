import React from 'react';
import { Helmet } from 'react-helmet-async';
import Resources from '@/components/sections/Resources';

const ResourcesPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Resources - KRCBC</title>
        <meta name="description" content="Access resources from the Kerala Region of Catholic Bishops Conference (KRCBC), including documents, publications, guidelines, and educational materials." />
        <meta name="keywords" content="KRCBC Resources, Catholic Resources, Church Documents, Catholic Publications, Religious Education Resources, Kerala Catholic Resources" />
        <meta property="og:title" content="Resources - KRCBC" />
        <meta property="og:description" content="Access resources from the Kerala Region of Catholic Bishops Conference (KRCBC), including documents, publications, guidelines, and educational materials." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/resources" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resources - KRCBC" />
        <meta name="twitter:description" content="Access resources from the Kerala Region of Catholic Bishops Conference (KRCBC), including documents, publications, guidelines, and educational materials." />
        <link rel="canonical" href="https://krcbc.in/resources" />
      </Helmet>
      <main>
        <Resources />
      </main>
    </div>
  );
};

export default ResourcesPage;
