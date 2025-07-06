import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from '@/hooks/use-toast'; // If you use a toast system

const API_URL = import.meta.env.VITE_API_URL;

function renderContent(blocks: any[]) {
  if (!blocks) return null;
  return blocks.map((block: any, idx: number) => {
    if (block.type === 'paragraph') {
      const text = block.children.map((child: any) => child.text).join('');
      return <p key={idx} className="mb-4">{text}</p>;
    }
    if (block.type === 'heading') {
      const text = block.children.map((child: any) =>
        child.bold ? <strong key={child.text}>{child.text}</strong> : child.text
      );
      // Default to h3 if no level, otherwise use the specified level (1-6)
      const HeadingTag = `h${block.level || 3}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag key={idx} className={`mb-4 font-bold text-gray-800 ${block.level === 1 ? 'text-3xl' : block.level === 2 ? 'text-2xl' : 'text-xl'}`}>
          {text}
        </HeadingTag>
      );
    }
    // Add more block types as needed
    return null;
  });
}

const NewsArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [otherArticles, setOtherArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast ? useToast() : { toast: () => {} }; // fallback if no toast

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/news-articles?populate=*&filters[id][$eq]=${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data.data[0]);
        setLoading(false);
      });
    // Fetch other articles for carousel
    fetch(`${API_URL}/api/news-articles?populate=*&filters[id][$ne]=${id}`)
      .then(res => res.json())
      .then(data => {
        setOtherArticles(data.data);
      });
  }, [id]);

  if (loading || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  const featureImage = article.FeatureImage?.url
    ? API_URL + article.FeatureImage.url
    : '/placeholder.svg';

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: article.Name,
      text: article.Description || article.Name,
      url: shareUrl
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        toast && toast({
          title: "Share cancelled",
          description: "Sharing was cancelled or failed.",
          variant: "destructive",
        });
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast && toast({
          title: "Link Copied!",
          description: "Article link copied to clipboard.",
        });
      } catch (err) {
        toast && toast({
          title: "Copy failed",
          description: "Could not copy link. Please copy manually.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link to="/news-listing">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to News
              </Button>
            </Link>
          </div>

          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={featureImage}
                alt={article.Name}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                  {article.NewsType}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {article.Date
                        ? new Date(article.Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        : ''}
                    </span>
                  </div>
                  <span>By KRCBC Communications</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {article.Name}
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {article.Description}
              </p>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {renderContent(article.Content)}
              </div>

              {/* Display all images below the content */}
              {Array.isArray(article.Images) && article.Images.length > 0 && (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {article.Images.map((img: any) => {
                    let imageUrl = img.formats?.medium?.url
                      ? API_URL + img.formats.medium.url
                      : img.formats?.thumbnail?.url
                        ? API_URL + img.formats.thumbnail.url
                        : img.url
                          ? API_URL + img.url
                          : '/placeholder.svg';
                    return (
                      <div key={img.id} className="flex flex-col items-center">
                        <img
                          src={imageUrl}
                          alt={img.name || 'News Image'}
                          className="rounded shadow w-full max-w-xl h-auto object-contain mb-3"
                          style={{ maxHeight: 400 }}
                        />
                        {img.caption && (
                          <span className="text-sm text-gray-500">{img.caption}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Published by <strong>KRCBC Communications</strong></p>
                    <p>
                      {article.Date
                        ? new Date(article.Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        : ''}
                    </p>
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleShare}
                  >
                    Share Article
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* News Carousel */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Other News Articles</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {otherArticles.map((item) => {
                  const img = item.FeatureImage?.url
                    ? API_URL + item.FeatureImage.url
                    : '/placeholder.svg';
                  return (
                    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Link to={`/news/${item.id}`}>
                          <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                            <img
                              src={img}
                              alt={item.Name}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                                  {item.NewsType}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {item.Date
                                    ? new Date(item.Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                    : ''}
                                </span>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                {item.Name}
                              </h4>
                              <p className="text-gray-600 text-sm line-clamp-3">{item.Description}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsArticle;
