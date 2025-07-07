import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '@/components/sections/Contact';

const ContactPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Contact Us - KRCBC</title>
        <meta name="description" content="Get in touch with the Kerala Region of Catholic Bishops Conference (KRCBC). Find our contact information, office address, and ways to reach us." />
        <meta name="keywords" content="Contact KRCBC, Kerala Catholic Bishops Contact, KRCBC Office, Catholic Church Contact Kerala" />
        <meta property="og:title" content="Contact Us - KRCBC" />
        <meta property="og:description" content="Get in touch with the Kerala Region of Catholic Bishops Conference (KRCBC). Find our contact information, office address, and ways to reach us." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - KRCBC" />
        <meta name="twitter:description" content="Get in touch with the Kerala Region of Catholic Bishops Conference (KRCBC). Find our contact information, office address, and ways to reach us." />
        <link rel="canonical" href="https://krcbc.in/contact" />
      </Helmet>
      <main>
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;
