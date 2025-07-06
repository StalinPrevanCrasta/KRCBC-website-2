
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, Star, Calendar, MapPin, Quote } from 'lucide-react';

const YouthMinistry = () => {
  const programs = [
    {
      title: "Youth Leadership Training",
      description: "Developing young leaders for tomorrow's Church",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
      participants: "150+ youth"
    },
    {
      title: "Summer Faith Camps",
      description: "Annual residential camps combining fun, friendship, and faith",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=250&fit=crop",
      participants: "300+ campers"
    },
    {
      title: "Career Guidance & Counseling",
      description: "Helping youth make informed decisions about their future",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      participants: "200+ students"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Joseph",
      age: 19,
      parish: "St. Mary's, Bangalore",
      quote: "The youth ministry has been instrumental in strengthening my faith and helping me find my purpose in serving others.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9a8c169?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Rohan D'Souza",
      age: 21,
      parish: "Sacred Heart, Mangalore",
      quote: "Through the leadership programs, I've learned to be a voice for positive change in my community.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Priya Thomas",
      age: 18,
      parish: "St. Francis, Mysore",
      quote: "The youth ministry gave me lifelong friendships and a deeper understanding of my Catholic faith.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const upcomingEvents = [
    {
      title: "Youth Sunday Celebration",
      date: "January 15, 2024",
      location: "Cathedral of St. Joseph, Bangalore",
      type: "Liturgical"
    },
    {
      title: "Career Fair & Expo",
      date: "February 3-4, 2024",
      location: "Don Bosco Hall, Bangalore",
      type: "Educational"
    },
    {
      title: "Regional Youth Rally",
      date: "March 10, 2024",
      location: "Lourdes Matha Church, Bangalore",
      type: "Gathering"
    }
  ];

  return (
    <section id="youth-ministry" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Youth Ministry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Empowering young Catholics to live their faith boldly, serve others joyfully, 
            and lead with purpose in their communities and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Join Our Community
            </Button>
            <Button size="lg" variant="outline">
              Become a Volunteer
            </Button>
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">Our Programs</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.title} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${program.image})`}}></div>
                <CardHeader>
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{program.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-medium">{program.participants}</span>
                    <Button size="sm">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials (Removed) */}
        {/* The section previously containing Youth Voices testimonials has been removed. */}

        {/* Upcoming Events */}
        <div className="grid lg:grid-cols-2 gap-8 items-start"> {/* Removed pt-16 as the preceding section's mb-16 should suffice */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full mt-4">View All Events</Button>
          </div>

          {/* Get Involved Section */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="mb-6 opacity-90">
                Ready to be part of something bigger? Join our vibrant community of young Catholics 
                making a difference in Karnataka.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span>Connect with 500+ active youth members</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5" />
                  <span>Participate in community service projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5" />
                  <span>Develop leadership and life skills</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  Register Now
                </Button>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                  Contact Youth Coordinator
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default YouthMinistry;
