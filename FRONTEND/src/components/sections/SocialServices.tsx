
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Home, GraduationCap, Utensils, HandHeart } from 'lucide-react';

const SocialServices = () => {
  const services = [
    {
      icon: Heart,
      title: "Healthcare Initiatives",
      description: "Providing medical care and health education to underserved communities",
      projects: ["Mobile Health Clinics", "Free Medical Camps", "Mental Health Support", "HIV/AIDS Care"],
      beneficiaries: "15,000+ people",
      color: "bg-red-50 text-red-600 border-red-200"
    },
    {
      icon: GraduationCap,
      title: "Education Support",
      description: "Ensuring quality education reaches every child regardless of background",
      projects: ["Scholarship Programs", "School Infrastructure", "Adult Literacy", "Skill Development"],
      beneficiaries: "8,500+ students",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: Home,
      title: "Housing & Shelter",
      description: "Providing safe shelter and housing assistance for the homeless and displaced",
      projects: ["Emergency Shelters", "Low-cost Housing", "Disaster Relief", "Rehabilitation Centers"],
      beneficiaries: "3,200+ families",
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      icon: Utensils,
      title: "Food Security",
      description: "Addressing hunger and malnutrition through sustainable food programs",
      projects: ["Community Kitchens", "Nutritional Support", "Food Distribution", "Agricultural Training"],
      beneficiaries: "25,000+ meals/month",
      color: "bg-amber-50 text-amber-600 border-amber-200"
    }
  ];

  const currentProjects = [
    {
      title: "Mobile Health Unit for Rural Areas",
      description: "Bringing healthcare to remote villages in Karnataka",
      progress: 75,
      goal: "₹50,00,000",
      raised: "₹37,50,000",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop"
    },
    {
      title: "Education Center for Street Children",
      description: "Providing education and vocational training for underprivileged children",
      progress: 60,
      goal: "₹30,00,000",
      raised: "₹18,00,000",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop"
    },
    {
      title: "Elderly Care Facility",
      description: "Building a comprehensive care facility for senior citizens",
      progress: 40,
      goal: "₹75,00,000",
      raised: "₹30,00,000",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop"
    }
  ];

  const volunteerOpportunities = [
    {
      title: "Community Health Volunteer",
      commitment: "4 hours/week",
      location: "Various locations",
      requirements: "Basic health training provided"
    },
    {
      title: "Education Mentor",
      commitment: "6 hours/week",
      location: "Learning centers",
      requirements: "Graduate degree preferred"
    },
    {
      title: "Food Distribution Coordinator",
      commitment: "8 hours/week",
      location: "Community kitchens",
      requirements: "Leadership skills needed"
    }
  ];

  return (
    <section id="social-services" className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Social Services & Outreach
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Living the Gospel through action - our comprehensive social service programs 
            reach out to the most vulnerable in our communities with love, dignity, and hope.
          </p>
        </div>

        {/* Service Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.title} className={`border-2 hover:shadow-lg transition-all ${service.color}`}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full ${service.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {service.projects.map((project) => (
                      <div key={project} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-current rounded-full mr-2"></div>
                        {project}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg text-blue-600">{service.beneficiaries}</div>
                    <div className="text-xs text-gray-500">served annually</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Current Projects */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">Current Charitable Projects</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {currentProjects.map((project) => (
              <Card key={project.title} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Raised: {project.raised}</span>
                    <span>Goal: {project.goal}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Donate Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Volunteer Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Volunteer Opportunities</h3>
            <p className="text-gray-600 mb-6">
              Join our mission of service and make a tangible difference in the lives of those in need. 
              Every act of service, no matter how small, contributes to building a more just and compassionate society.
            </p>
            
            <div className="space-y-4">
              {volunteerOpportunities.map((opportunity) => (
                <Card key={opportunity.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{opportunity.title}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Commitment:</span> {opportunity.commitment}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {opportunity.location}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Requirements:</span> {opportunity.requirements}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button size="lg" className="w-full mt-6">
              Apply to Volunteer
            </Button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="text-center mb-6">
              <HandHeart className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">Make a Difference Today</h3>
              <p className="opacity-90">
                Your support helps us continue our mission of serving the most vulnerable in our communities.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
                <span>Monthly donors</span>
                <span className="font-bold">500+</span>
              </div>
              <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
                <span>Active volunteers</span>
                <span className="font-bold">200+</span>
              </div>
              <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
                <span>Lives impacted</span>
                <span className="font-bold">50,000+</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                Support Our Mission
              </Button>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                Partner with Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialServices;
