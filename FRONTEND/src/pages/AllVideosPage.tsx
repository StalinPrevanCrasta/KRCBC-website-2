import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const AllVideosPage = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/featuredvideos?sort=createdAt:desc`)
      .then(res => res.json())
      .then(data => {
        const processed = data.data.map((item: any) => {
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
          let duration = '';
          const match = ytUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
          if (match && match[1]) {
            ytThumb = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
          return {
            id: item.id,
            title: item.title,
            thumbnail: ytThumb,
            ytUrl,
            duration, // If you have duration in API, set it here
            category: item.category || 'Featured',
            views: item.views || '',
          };
        });
        setVideos(processed);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Helmet>
        <title>All Videos - KRCBC</title>
        <meta name="description" content="Watch all videos from the Kerala Region of Catholic Bishops Conference (KRCBC). Access our complete video library including masses, sermons, and religious content." />
        <meta name="keywords" content="KRCBC Videos, Kerala Catholic Videos, Church Videos, Religious Videos, Catholic Media, Mass Videos" />
        <meta property="og:title" content="All Videos - KRCBC" />
        <meta property="og:description" content="Watch all videos from the Kerala Region of Catholic Bishops Conference (KRCBC). Access our complete video library including masses, sermons, and religious content." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/all-videos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Videos - KRCBC" />
        <meta name="twitter:description" content="Watch all videos from the Kerala Region of Catholic Bishops Conference (KRCBC). Access our complete video library including masses, sermons, and religious content." />
        <link rel="canonical" href="https://krcbc.in/all-videos" />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              All Videos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our collection of talks, events, homilies, and more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
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
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">{video.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2 h-12">{video.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{video.views ? `${video.views} views` : ''}</span>
                    {video.ytUrl ? (
                      <a href={video.ytUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost">Watch Now</Button>
                      </a>
                    ) : (
                      <Button size="sm" variant="ghost" disabled>Watch Now</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {!loading && videos.length === 0 && (
            <div className="text-center py-12">
              <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No videos found</h3>
              <p className="text-gray-500">Check back later for more video content.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllVideosPage;
