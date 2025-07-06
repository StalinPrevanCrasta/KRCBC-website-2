import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const NewsEvents = () => {
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/news-articles?populate=FeatureImage&sort=Date:desc&pagination[limit]=3`)
      .then(res => res.json())
      .then(data => {
        setNews(
          data.data.map((item: any) => {
            // Get the best available image format or fallback
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
              date: new Date(item.Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              category: item.NewsType,
              image,
            };
          }))
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/events?sort=DateAndTime:desc&pagination[limit]=4`)
      .then(res => res.json())
      .then(data => {
        setEvents(
          data.data.map((item: any) => {
            // Extract first link from RSVPLink rich text
            let rsvpLink = '';
            if (Array.isArray(item.RSVPLink)) {
              for (const block of item.RSVPLink) {
                if (block.children) {
                  for (const child of block.children) {
                    if (child.type === 'link' && child.url) {
                      rsvpLink = child.url;
                      break;
                    }
                  }
                }
                if (rsvpLink) break;
              }
            } else if (typeof item.RSVPLink === 'string') {
              rsvpLink = item.RSVPLink;
            }
            return {
              id: item.id,
              title: item.Name,
              date: new Date(item.DateAndTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              time: new Date(item.DateAndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: item.Location,
              type: 'Event',
              rsvpLink,
            };
          }))
      });
  }, []);

  return (
    <section className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              News & Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay connected with the latest happenings and upcoming events in our Catholic community across Karnataka.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Latest News</h3>
              <Link to="/news-listing">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All News
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {news.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-1/3 md:h-64 flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500">{article.date}</span>
                      </div>
                      <Link to={`/news/${article.id}`}>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
                          {article.title}
                        </h4>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    </div>
                    <Link to={`/news/${article.id}`}>
                      <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Events Sidebar */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Upcoming Events</h3>
            </div>

            <div className="space-y-5">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 rounded-lg p-2 min-w-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-800 mb-1 leading-tight">
                          {event.title}
                        </h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                        {event.rsvpLink ? (
                          <a
                            href={event.rsvpLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button
                              size="sm"
                              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              RSVP
                            </Button>
                          </a>
                        ) : (
                          <Button
                            size="sm"
                            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled
                          >
                            RSVP
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Link to="/calendar">
              <Button className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white">
                View Full Calendar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
