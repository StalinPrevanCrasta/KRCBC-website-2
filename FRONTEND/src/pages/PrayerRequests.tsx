import React from 'react';
import { Helmet } from 'react-helmet-async';
import PrayerRequests from '@/components/sections/PrayerRequests';

const PrayerRequestsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Prayer Requests - KRCBC</title>
        <meta name="description" content="Submit your prayer requests to the Kerala Region of Catholic Bishops Conference (KRCBC). Share your intentions and let our community pray for you." />
        <meta name="keywords" content="Prayer Requests, KRCBC Prayers, Catholic Prayer, Prayer Intentions, Kerala Catholic Prayer" />
        <meta property="og:title" content="Prayer Requests - KRCBC" />
        <meta property="og:description" content="Submit your prayer requests to the Kerala Region of Catholic Bishops Conference (KRCBC). Share your intentions and let our community pray for you." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/prayer-requests" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prayer Requests - KRCBC" />
        <meta name="twitter:description" content="Submit your prayer requests to the Kerala Region of Catholic Bishops Conference (KRCBC). Share your intentions and let our community pray for you." />
        <link rel="canonical" href="https://krcbc.in/prayer-requests" />
      </Helmet>
      <main>
        <PrayerRequests />
      </main>
    </div>
  );
};

export default PrayerRequestsPage;
