import React from 'react';
import { Helmet } from 'react-helmet-async';
import Media from '@/components/sections/Media';

const MediaPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Media - KRCBC</title>
        <meta name="description" content="Explore the media gallery of the Kerala Region of Catholic Bishops Conference (KRCBC). Watch videos, view photos, and access multimedia content from our events and activities." />
        <meta name="keywords" content="KRCBC Media, Kerala Catholic Media, Church Videos, Catholic Photos, Religious Media, KRCBC Gallery" />
        <meta property="og:title" content="Media - KRCBC" />
        <meta property="og:description" content="Explore the media gallery of the Kerala Region of Catholic Bishops Conference (KRCBC). Watch videos, view photos, and access multimedia content from our events and activities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/media" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Media - KRCBC" />
        <meta name="twitter:description" content="Explore the media gallery of the Kerala Region of Catholic Bishops Conference (KRCBC). Watch videos, view photos, and access multimedia content from our events and activities." />
        <link rel="canonical" href="https://krcbc.in/media" />
      </Helmet>
      <main>
        <Media />
      </main>
    </div>
  );
};

export default MediaPage;
