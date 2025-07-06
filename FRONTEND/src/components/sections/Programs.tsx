
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, GraduationCap, Cross, TreePine, Baby, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Program {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
  link: string; // This will be updated to use the slug for navigation
  slug: string;
}

export const programs: Program[] = [
  {
    icon: Heart,
    title: "Pastoral Care",
    slug: "pastoral-care",
    description: "Comprehensive spiritual guidance and counseling services for individuals and families across all life stages.",
    features: ["Marriage Counseling", "Grief Support", "Spiritual Direction", "Family Life Programs"],
    color: "bg-red-50 text-red-600 border-red-200",
    link: "/programs/pastoral-care" // Updated link placeholder
  },
  {
    icon: Users,
    title: "Youth Ministry",
    slug: "youth-ministry",
    description: "Empowering young Catholics through faith formation, leadership development, and community engagement.",
    features: ["Youth Leadership", "Summer Camps", "Vocational Guidance", "Social Action"],
    color: "bg-blue-50 text-blue-600 border-blue-200",
    link: "/youth-ministry" // This specific one already goes to a page, maybe it becomes /programs/youth-ministry too? For consistency, let's assume yes.
  },
  {
    icon: GraduationCap,
    title: "Education",
    slug: "education",
    description: "Supporting Catholic education institutions and promoting academic excellence with Gospel values.",
    features: ["School Support", "Teacher Training", "Scholarship Programs", "Value Education"],
    color: "bg-green-50 text-green-600 border-green-200",
    link: "/programs/education" // Updated link placeholder
  },
  {
    icon: Cross,
    title: "Health Services",
    slug: "health-services",
    description: "Providing healthcare services and wellness programs to serve the most vulnerable in our communities.",
    features: ["Medical Camps", "Mental Health", "HIV/AIDS Care", "Health Education"],
    color: "bg-purple-50 text-purple-600 border-purple-200",
    link: "/programs/health-services" // Updated link placeholder
  },
  {
    icon: TreePine,
    title: "Environment",
    slug: "environment",
    description: "Promoting ecological awareness and sustainable practices as part of our stewardship responsibility.",
    features: ["Tree Plantation", "Waste Management", "Water Conservation", "Green Parishes"],
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    link: "/programs/environment" // Updated link placeholder
  },
  {
    icon: Baby,
    title: "Social Services",
    slug: "social-services",
    description: "Comprehensive care for children, elderly, and marginalized communities through various outreach programs.",
    features: ["Child Care", "Elder Care", "Disability Support", "Women Empowerment"],
    color: "bg-amber-50 text-amber-600 border-amber-200",
    link: "/social-services" // This specific one already goes to a page, let's make it /programs/social-services for consistency.
  }
];

const Programs = () => {
  return (
    <section id="programs" className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Programs & Initiatives
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Through our diverse programs, we serve the spiritual, educational, and social needs of the Catholic community 
            while reaching out to all people with Christ's love and compassion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <Card key={program.title} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 flex flex-col h-96"> {/* Adjusted height to h-96 */}
                <CardHeader className="text-center pt-6 pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full ${program.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow items-center text-center p-6">
                  <p className="text-gray-600 leading-relaxed min-h-[3.5rem] mb-4"> {/* Added description back, with min-height and margin-bottom */}
                    {program.description}
                  </p>
                  <div className="flex-grow" /> {/* This spacer pushes the button to the bottom */}
                  <Link to={`/programs/${program.slug}`} className="w-full mt-auto"> {/* Changed mt-4 to mt-auto for robustness */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Get Involved in Our Mission
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're looking to volunteer, partner with us, or learn more about our programs, 
              we welcome you to join our community of faith and service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Volunteer with Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                  Partner Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
