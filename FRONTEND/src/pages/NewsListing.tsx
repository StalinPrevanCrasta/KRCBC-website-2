import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const NewsListing = () => {
  const [allNews, setAllNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/news-articles?populate=FeatureImage&sort=Date:desc`)
      .then(res => res.json())
      .then(data => {
        setAllNews(
          data.data.map((item: any) => {
            let image = '/placeholder.svg';
            if (item.FeatureImage?.formats?.medium?.url) {
              image = API_URL + item.FeatureImage.formats.medium.url;
            } else if (item.FeatureImage?.url) {
              image = API_URL + item.FeatureImage.url;
            }
            return {
              id: item.id,
              title: item.Name,
              excerpt: item.Description,
              date: item.Date
                ? new Date(item.Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : '',
              category: item.NewsType,
              image,
            };
          })
        );
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>All News - KRCBC</title>
        <meta name="description" content="Browse all news articles from the Kerala Region of Catholic Bishops Conference (KRCBC). Stay informed about our latest announcements, events, and community updates." />
        <meta name="keywords" content="KRCBC News, Kerala Catholic News, All News Articles, Church News, Catholic Announcements, KRCBC Updates" />
        <meta property="og:title" content="All News - KRCBC" />
        <meta property="og:description" content="Browse all news articles from the Kerala Region of Catholic Bishops Conference (KRCBC). Stay informed about our latest announcements, events, and community updates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/news-listing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All News - KRCBC" />
        <meta name="twitter:description" content="Browse all news articles from the Kerala Region of Catholic Bishops Conference (KRCBC). Stay informed about our latest announcements, events, and community updates." />
        <link rel="canonical" href="https://krcbc.in/news-listing" />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              All News & Updates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest news and updates from the Karnataka Regional Catholic Bishops' Council.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allNews.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                      <Link to={`/news/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <Link to={`/news/${article.id}`}>
                      <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NewsListing;
