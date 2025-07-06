import React, { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom'; // Aliased to avoid conflict if Link is used elsewhere
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Radio, Calendar, Clock, Users, Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const Media = () => {
  const [streams, setStreams] = useState<any[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<any[]>([]);
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/streams?populate=thumbnail&sort=DateAndTime:desc&pagination[limit]=3
`)
      .then(res => res.json())
      .then(data => {
        setStreams(
          data.data.map((item: any) => {
            // Extract first link from url rich text
            let streamUrl = '';
            if (Array.isArray(item.url)) {
              for (const block of item.url) {
                if (block.children) {
                  for (const child of block.children) {
                    if (child.type === 'link' && child.url) {
                      streamUrl = child.url;
                      break;
                    }
                  }
                }
                if (streamUrl) break;
              }
            }
            // Prefer API thumbnail if present
            let thumbnail = '';
            if (item.thumbnail?.formats?.medium?.url) {
              thumbnail = API_URL + item.thumbnail.formats.medium.url;
            } else if (item.thumbnail?.url) {
              thumbnail = API_URL + item.thumbnail.url;
            } else if (streamUrl && streamUrl.includes('youtube.com/embed/')) {
              const match = streamUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
              if (match && match[1]) {
                thumbnail = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
              }
            }
            return {
              id: item.id,
              title: item.title,
              time: item.DateAndTime
                ? new Date(item.DateAndTime).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '',
              status: item.isLive ? 'live' : 'upcoming',
              url: streamUrl,
              thumbnail,
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/featuredvideos?sort=createdAt:desc&pagination[limit]=3
`)
      .then(res => res.json())
      .then(data => {
        setFeaturedVideos(
          data.data.map((item: any) => {
            // Extract YouTube embed URL
            let ytUrl = '';
            if (Array.isArray(item.thumbnail_url)) {
              for (const block of item.thumbnail_url) {
                if (block.children) {
                  for (const child of block.children) {
                    if (child.type === 'link' && child.url) {
                      ytUrl = child.url;
                      break;
                    }
                  }
                }
                if (ytUrl) break;
              }
            }
            // Extract video ID for thumbnail
            let ytThumb = '';
            const match = ytUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
              ytThumb = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
            }
            return {
              id: item.id,
              title: item.title,
              ytUrl,
              thumbnail: ytThumb,
            };
          })
        );
      });
  }, [API_URL]);

  useEffect(() => {
    fetch(`${API_URL}/api/podcasts?sort=createdAt:desc`)
      .then(res => res.json())
      .then(data => {
        setPodcasts(
          data.data.map((item: any) => {
            // Extract podcast link
            let podcastUrl = '';
            if (Array.isArray(item.link)) {
              for (const block of item.link) {
                if (block.children) {
                  for (const child of block.children) {
                    if (child.type === 'link' && child.url) {
                      podcastUrl = child.url;
                      break;
                    }
                  }
                }
                if (podcastUrl) break;
              }
            }
            return {
              id: item.id,
              title: item.title,
              episode: item.episode,
              duration: item.duration,
              date: item.DateAndTime
                ? new Date(item.DateAndTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : '',
              url: podcastUrl,
            };
          })
        );
      });
  }, [API_URL]);

  return (
    <section id="media" className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4 relative bg-gradient-to-br to-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Media & Live Streaming
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay connected with the KRCBC community through our media content, live streams, 
            and spiritual resources available anytime, anywhere.
          </p>
        </div>

        {/* Live Streaming Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Live & Upcoming Streams</h3>
            <Link to="/media-calendar">
              <Button variant="outline">View Schedule</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {streams.map((stream) => {
              // Extract YouTube video ID from embed URL
              let ytThumb = '';
              if (stream.url && stream.url.includes('youtube.com/embed/')) {
                const match = stream.url.match(/embed\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                  ytThumb = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
                }
              }
              return (
                <Card key={stream.id} className="relative overflow-hidden flex flex-col h-full">
                  {stream.status === 'live' && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-red-600 text-white animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        LIVE
                      </Badge>
                    </div>
                  )}
                  <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative">
                    {stream.thumbnail ? (
                      <img
                        src={stream.thumbnail}
                        alt={stream.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Play className="w-16 h-16 text-white opacity-80" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-80" />
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <h4 className="font-semibold mb-2">{stream.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {stream.time}
                      </div>
                    </div>
                    <div className="mt-auto">
                      {stream.url ? (
                        <a href={stream.url} target="_blank" rel="noopener noreferrer">
                          <Button 
                            className={`w-full ${stream.status === 'live' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                          >
                            {stream.status === 'live' ? 'Watch Live' : 'Watch Stream'}
                          </Button>
                        </a>
                      ) : (
                        <Button className="w-full" disabled>
                          No Stream Link
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Videos */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Featured Videos</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">{video.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <a href={video.ytUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost">Watch Now</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <RouterLink to="/all-videos">
              <Button size="lg" variant="outline">View All Videos</Button>
            </RouterLink>
          </div>
        </div>

        {/* Podcasts Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Recent Podcasts</h3>
            <div className="space-y-4">
              {podcasts.map((podcast) => (
                <Card key={podcast.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                        <Radio className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{podcast.title}</h4>
                        <p className="text-gray-600 mb-1">{podcast.episode}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{podcast.duration}</span>
                          <span>{podcast.date}</span>
                        </div>
                      </div>
                      {podcast.url ? (
                        <a href={podcast.url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Play
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" disabled>
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Media Statistics (Removed) */}
          <div>
            {/* The Card component for Media Statistics was previously here. It has been removed. */}

            <Card className="mt-6"> {/* Ensure this card (Subscribe & Follow) doesn't get an erroneous mt-0 if the one above was the only one */}
              <CardHeader>
                <CardTitle>Subscribe & Follow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with our latest content and live streams.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Subscribe on YouTube
                  </Button>
                  <Button className="w-full" variant="outline">
                    Follow on Social Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;
