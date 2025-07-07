import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Privacy Policy - KRCBC</title>
        <meta name="description" content="Read the privacy policy of the Kerala Region of Catholic Bishops Conference (KRCBC). Learn how we collect, use, and protect your personal information." />
        <meta name="keywords" content="KRCBC Privacy Policy, Kerala Catholic Privacy, Data Protection, Privacy Statement, Information Security" />
        <meta property="og:title" content="Privacy Policy - KRCBC" />
        <meta property="og:description" content="Read the privacy policy of the Kerala Region of Catholic Bishops Conference (KRCBC). Learn how we collect, use, and protect your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/privacy-policy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - KRCBC" />
        <meta name="twitter:description" content="Read the privacy policy of the Kerala Region of Catholic Bishops Conference (KRCBC). Learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://krcbc.in/privacy-policy" />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
          <div className="bg-white/80 rounded-lg shadow-lg p-8 max-w-none text-gray-700">
            <h2 className="font-bold text-xl mb-2">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Personal information you provide (such as name, email, phone) when contacting us or submitting forms.</li>
              <li>Usage data such as pages visited, browser type, and device information.</li>
            </ul>

            <h2 className="font-bold text-xl mb-2">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>To respond to your inquiries and provide requested services.</li>
              <li>To improve our website and services.</li>
              <li>To communicate important updates and information.</li>
            </ul>

            <h2 className="font-bold text-xl mb-2">Information Sharing</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>We do not sell or rent your personal information.</li>
              <li>We may share information with trusted partners who assist us in operating our website and services, provided they agree to keep it confidential.</li>
              <li>We may disclose information if required by law.</li>
            </ul>

            <h2 className="font-bold text-xl mb-2">Cookies</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Our website may use cookies to enhance your experience.</li>
              <li>You can disable cookies in your browser settings.</li>
            </ul>

            <h2 className="font-bold text-xl mb-2">Data Security</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>We implement reasonable measures to protect your information from unauthorized access or disclosure.</li>
            </ul>

            <h2 className="font-bold text-xl mb-2">Changes to This Policy</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>We may update this Privacy Policy from time to time.</li>
              <li>Changes will be posted on this page.</li>
            </ul>

            <h2 className="font-bold text-xl mb-2">Contact Us</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:krcbcbangalore@gmail.com" className="underline text-blue-700">krcbcbangalore@gmail.com</a>.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;