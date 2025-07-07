import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Church, Users, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<{ src: string; alt: string }[]>([]);
  const [carouselImages, setCarouselImages] = useState<{ src: string; alt: string; position: number }[]>([]);

  // // Fetch hero images (existing logic)
  // useEffect(() => {
  //   fetch(`${API_URL}/api/heroimages?populate=*`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setHeroImages(
  //         data.data.map((item: any) => ({
  //           src: item.attributes.image.data
  //             ? API_URL + item.attributes.image.data.attributes.url
  //             : "",
  //           alt: item.attributes.altText || "Hero Image"
  //         }))
  //       );
  //     });
  // }, []);

  // Fetch carousel images from API
  useEffect(() => {
    fetch(`${API_URL}/api/carousals?populate=*`)
      .then(res => res.json())
      .then(data => {
        setCarouselImages(
          data.data
            .filter((item: any) => item.HeroImage && (item.HeroImage.formats?.medium?.url || item.HeroImage.url))
            .map((item: any) => {
              let imgUrl = item.HeroImage.formats?.medium?.url
                ? API_URL + item.HeroImage.formats.medium.url
                : item.HeroImage.url
                  ? API_URL + item.HeroImage.url
                  : "";
              return {
                src: imgUrl,
                alt: item.AltText || "Carousel Image",
                position: item.Position || 0
              };
            })
            .sort((a, b) => a.position - b.position)
        );
      });
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages]);

  return (
    <section className="relative bg-gradient-to-br to-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Building
              <span className="text-blue-600"> Spirit-filled</span>
              <br />
              Communities of
              <span className="text-amber-500"> Faith</span>
            </h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                The Karnataka Regional Catholic Bishops' Council (KRCBC) is the regional body that unites and coordinates the Catholic Church's mission across the state of Karnataka. As one of the 14 ecclesiastical regions under the Catholic Bishops' Conference of India (CBCI), KRCBC brings together 14 dioceses—10 of the Latin Rite, 3 of the Syro-Malabar Rite, and 1 of the Syro-Malankara Rite—under the pastoral leadership of the Metropolitan Archbishop of Bangalore.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Though Catholics comprise just 1.46% of the state's population, the Church plays a vital role in shaping society through its spiritual care, educational institutions, health services, and developmental outreach, especially among the poor, marginalized, and rural communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More About Us
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-amber-50 rounded-lg overflow-hidden shadow-lg relative">
              {carouselImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats */}
            {/* <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">14</div>
                <div className="text-sm text-gray-600">Dioceses</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">686</div>
                <div className="text-sm text-gray-600">Parishes</div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Key Statistics Cards */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Key Statistics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center border-2 border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Church className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">14 Dioceses</h3>
                <p className="text-gray-600 text-sm">United under KRCBC across different rites</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">686 Parishes</h3>
                <p className="text-gray-600 text-sm">Serving communities across Karnataka</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-red-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">5,000+ At Services</h3>
                <p className="text-gray-600 text-sm">Priests and religious dedicated to service</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">2M+ Catholics</h3>
                <p className="text-gray-600 text-sm">Faithful served across Karnataka</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
