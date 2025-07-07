import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Book, GraduationCap, Leaf, Heart, Home } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

// Map commission titles to icons (add more as needed)
const iconMap: Record<string, any> = {
  'basic ecclesial communities': Users,
  'bible': Book,
  'faith formation': Heart,
  'education': GraduationCap,
  'environment': Leaf,
  'health': Heart,
  'family': Home,
  'inter-religious dialogue': Users,
  'justice and peace': Users,
  'labour': Users,
  'laity': Users,
  'liturgy': Book,
  'pastoral care for differently abled': Heart,
  'pastoral care of migrants and itinerants': Users,
  'proclamation': Users,
  'sc/st/bc christians': Users,
  'social communications': Users,
  'social concern and development': Heart,
  'vocation and formation – priests and religious': Users,
  'women': Users,
  'youth': Users,
};

const Commissions = () => {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [desks, setDesks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/commissions?sort=title:asc`)
      .then(res => res.json())
      .then(data => {
        setCommissions(data.data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/desks?sort=title:asc`)
      .then(res => res.json())
      .then(data => {
        setDesks(data.data || []);
      });
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Commissions - KRCBC</title>
        <meta name="description" content="Explore the various commissions of the Kerala Region of Catholic Bishops Conference (KRCBC), including Faith Formation, Education, Social Services, and more." />
        <meta name="keywords" content="KRCBC Commissions, Kerala Catholic Commissions, Church Commissions, Faith Formation, Catholic Education, Social Services" />
        <meta property="og:title" content="Commissions - KRCBC" />
        <meta property="og:description" content="Explore the various commissions of the Kerala Region of Catholic Bishops Conference (KRCBC), including Faith Formation, Education, Social Services, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/commissions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commissions - KRCBC" />
        <meta name="twitter:description" content="Explore the various commissions of the Kerala Region of Catholic Bishops Conference (KRCBC), including Faith Formation, Education, Social Services, and more." />
        <link rel="canonical" href="https://krcbc.in/commissions" />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              KRCBC Commissions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Karnataka Regional Catholic Bishops' Council operates through various commissions 
              and desks, each dedicated to specific areas of pastoral care and Church ministry.
            </p>
          </div>

          {/* Commissions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Commissions</h2>
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commissions.map((commission) => {
                  const title = commission.title || '';
                  const slug = title
                    ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                    : '';
                  // Use icon from API if present, else from iconMap, else default Users
                  let IconComponent = Users;
                  if (commission.icon) {
                    // If API provides an icon name that matches iconMap, use it
                    const iconKey = commission.icon.toLowerCase();
                    IconComponent = iconMap[iconKey] || Users;
                  } else if (iconMap[title.toLowerCase()]) {
                    IconComponent = iconMap[title.toLowerCase()];
                  }
                  return (
                    <Card key={commission.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{commission.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <p className="text-gray-600 text-sm mb-4 flex-grow">{commission.description}</p>
                        <div className="mt-auto">
                          <Link to={`/commissions/${slug}`}>
                            <Button className="w-full" variant="outline">
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Specialized Desks</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {desks.map((desk) => {
                const slug = desk.slug || (desk.title
                  ? desk.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                  : '');
                return (
                  <Card key={desk.id || desk.slug} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{desk.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                      <p className="text-gray-600 text-sm mb-4 flex-grow overflow-hidden text-ellipsis line-clamp-4">{desk.description}</p>
                      <div className="mt-auto">
                        <Link to={`/commissions/${slug}`}>
                          <Button className="w-full" variant="outline">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Commissions;
