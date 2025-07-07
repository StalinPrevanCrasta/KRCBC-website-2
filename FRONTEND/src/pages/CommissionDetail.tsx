import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

function renderObjectives(objectives: any[]) {
  if (!objectives) return null;
  return (
    <ul className="space-y-3">
      {objectives.map((obj, idx) => {
        if (obj.type === 'paragraph') {
          const text = obj.children.map((child: any) => child.text).join('');
          return (
            <li key={idx} className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">{text}</span>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}

function renderLinks(links: any[]) {
  if (!links) return null;
  return links.map((block, idx) => {
    if (block.type === 'paragraph') {
      return block.children.map((child: any, cidx: number) => {
        if (child.type === 'link') {
          return (
            <a
              key={cidx}
              href={child.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {child.children && child.children[0]?.text
                ? child.children[0].text
                : child.url}
            </a>
          );
        }
        return null;
      });
    }
    return null;
  });
}

const CommissionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [commission, setCommission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch both commissions and desks in parallel
    Promise.all([
      fetch(`${API_URL}/api/commissions?populate=ChairmanImage&populate=SecretaryImage`).then(res => res.json()),
      fetch(`${API_URL}/api/desks?populate=ChairmanImage&populate=SecretaryImage`).then(res => res.json())
    ]).then(([commissionsData, desksData]) => {
      // Try to find by slug in commissions
      const matchCommission = commissionsData.data.find((item: any) =>
        item.title &&
        slug &&
        item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
      );
      // If not found, try to find by slug in desks
      const matchDesk = desksData.data.find((item: any) =>
        item.title &&
        slug &&
        item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
      );
      setCommission(matchCommission || matchDesk || null);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>{commission?.name ? `${commission.name} - KRCBC Commission` : 'Commission Detail - KRCBC'}</title>
        <meta name="description" content={commission?.description ? commission.description : 'Learn about this commission of the Kerala Region of Catholic Bishops Conference (KRCBC).'} />
        <meta name="keywords" content={`KRCBC ${commission?.name || 'Commission'}, Kerala Catholic Commissions, ${commission?.name || 'Commission'}, Church Commissions, Catholic Activities`} />
        <meta property="og:title" content={commission?.name ? `${commission.name} - KRCBC Commission` : 'Commission Detail - KRCBC'} />
        <meta property="og:description" content={commission?.description ? commission.description : 'Learn about this commission of the Kerala Region of Catholic Bishops Conference (KRCBC).'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://krcbc.in/commissions/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={commission?.name ? `${commission.name} - KRCBC Commission` : 'Commission Detail - KRCBC'} />
        <meta name="twitter:description" content={commission?.description ? commission.description : 'Learn about this commission of the Kerala Region of Catholic Bishops Conference (KRCBC).'} />
        <link rel="canonical" href={`https://krcbc.in/commissions/${slug}`} />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/commissions" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Commissions
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : commission ? (
              <>
                <div className="text-center mb-12">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    {commission.title}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {commission.description}
                  </p>
                  {commission.Link && (
                    <div className="mt-4">
                      {renderLinks(commission.Link)}
                    </div>
                  )}
                </div>

                {/* Goals/Objectives Section */}
                {commission.objectives && commission.objectives.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Objectives</h2>
                    <div className="bg-blue-50 rounded-lg p-6">
                      {renderObjectives(commission.objectives)}
                    </div>
                  </div>
                )}

                {/* Leadership Cards */}
                {(commission.ChairmanName || commission.SecretaryName) && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Leadership</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Chairman Card */}
                      {commission.ChairmanName && (
                        <Card className="text-center hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                              <img
                                src={
                                  commission.ChairmanImage && commission.ChairmanImage.url
                                    ? commission.ChairmanImage.url.startsWith('/uploads')
                                      ? `${API_URL}${commission.ChairmanImage.url}`
                                      : commission.ChairmanImage.url
                                    : '/placeholder.svg'
                                }
                                alt={commission.ChairmanName || 'Chairman'}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">{commission.ChairmanName}</h4>
                            <p className="text-sm text-blue-600 font-medium mb-1">Chairman</p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Secretary Card */}
                      {commission.SecretaryName && (
                        <Card className="text-center hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                              <img
                                src={
                                  commission.SecretaryImage && commission.SecretaryImage.url
                                    ? commission.SecretaryImage.url.startsWith('/uploads')
                                      ? `${API_URL}${commission.SecretaryImage.url}`
                                      : commission.SecretaryImage.url
                                    : '/placeholder.svg'
                                }
                                alt={commission.SecretaryName || 'Secretary'}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">{commission.SecretaryName}</h4>
                            <p className="text-sm text-blue-600 font-medium mb-1">Secretary</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}

                <Card className="bg-blue-50">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Get Involved</h3>
                    <p className="text-gray-600 mb-6">
                      Interested in participating in the activities of this commission?
                      We welcome your involvement and contributions to our mission.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Commission
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Request Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center text-gray-500">
                Commission not found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommissionDetail;
