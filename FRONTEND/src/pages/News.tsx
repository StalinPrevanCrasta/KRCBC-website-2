import React from 'react';
import { Helmet } from 'react-helmet-async';
import NewsEvents from '@/components/sections/NewsEvents';

const NewsPage = () => {
  return (
    <div className="relative bg-gradient-to-br to-white min-h-screen">
      <Helmet>
        <title>News & Events - KRCBC</title>
        <meta name="description" content="Stay updated with the latest news and events from the Kerala Region of Catholic Bishops Conference (KRCBC). Find announcements, upcoming events, and important updates." />
        <meta name="keywords" content="KRCBC News, Kerala Catholic News, Church Events, Catholic Announcements, KRCBC Updates" />
        <meta property="og:title" content="News & Events - KRCBC" />
        <meta property="og:description" content="Stay updated with the latest news and events from the Kerala Region of Catholic Bishops Conference (KRCBC). Find announcements, upcoming events, and important updates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/news" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News & Events - KRCBC" />
        <meta name="twitter:description" content="Stay updated with the latest news and events from the Kerala Region of Catholic Bishops Conference (KRCBC). Find announcements, upcoming events, and important updates." />
        <link rel="canonical" href="https://krcbc.in/news" />
      </Helmet>
      <main>
        <NewsEvents />
      </main>
    </div>
  );
};

export default NewsPage;
