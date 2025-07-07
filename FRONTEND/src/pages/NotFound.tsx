
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Page Not Found - KRCBC</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved. Visit the Kerala Region of Catholic Bishops Conference (KRCBC) homepage to explore our content." />
        <meta name="keywords" content="404 Error, Page Not Found, KRCBC, Kerala Catholic Bishops" />
        <meta property="og:title" content="Page Not Found - KRCBC" />
        <meta property="og:description" content="The page you're looking for doesn't exist or has been moved. Visit the Kerala Region of Catholic Bishops Conference (KRCBC) homepage to explore our content." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found - KRCBC" />
        <meta name="twitter:description" content="The page you're looking for doesn't exist or has been moved. Visit the Kerala Region of Catholic Bishops Conference (KRCBC) homepage to explore our content." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl font-bold text-blue-600">404</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h1>
            
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
