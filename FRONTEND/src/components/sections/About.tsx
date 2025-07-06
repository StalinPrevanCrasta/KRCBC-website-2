import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MapPin, Calendar, Award, Church, Heart } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
const AnimatedCounter = ({
  end,
  suffix = "",
  icon: Icon,
  label,
  color
}: {
  end: number;
  suffix?: string;
  icon: any;
  label: string;
  color: string;
}) => {
  const {
    count,
    setIsVisible
  } = useCountUp(end);
  const {
    ref,
    isIntersecting
  } = useIntersectionObserver();
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting, setIsVisible]);
  return <div ref={ref} className={`text-center transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
    </div>;
};
const TimelineItem = ({
  item,
  index
}: {
  item: any;
  index: number;
}) => {
  const {
    ref,
    isIntersecting
  } = useIntersectionObserver();
  return <div ref={ref} className={`relative flex items-center transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} style={{
    transitionDelay: `${index * 200}ms`
  }}>
      <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
      <div className={`ml-10 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
        <Card className="hover:shadow-md transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="text-lg font-bold text-blue-600 mb-2">{item.year}</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.event}</h4>
            <p className="text-gray-600">{item.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>;
};
const About = () => {
  const timeline = [{
    year: "1952",
    event: "Formation of Ecclesiastical Province",
    description: "The Ecclesiastical Province of Bangalore was established, laying the foundation for regional coordination."
  }, {
    year: "1976",
    event: "KRCBC Constitution",
    description: "The Karnataka Regional Catholic Bishops' Council was formally constituted with its first constitution."
  }, {
    year: "1998",
    event: "Youth Commission Established",
    description: "Dedicated youth ministry commission was created to address the needs of young Catholics."
  }, {
    year: "2010",
    event: "Social Service Expansion",
    description: "Major expansion of social service programs across all dioceses in Karnataka."
  }, {
    year: "2020",
    event: "Digital Evangelization",
    description: "Launch of comprehensive digital platforms for evangelization and community connection."
  }];
  const statsData = [{
    end: 14,
    icon: MapPin,
    label: "Dioceses",
    color: "bg-blue-600"
  }, {
    end: 686,
    suffix: "+",
    icon: Users,
    label: "Parishes",
    color: "bg-green-600"
  }, {
    end: 70,
    suffix: "+",
    icon: Calendar,
    label: "Years of Service",
    color: "bg-amber-600"
  }];
  return <section id="about" className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            About KRCBC
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Karnataka Regional Catholic Bishops' Council serves as the coordinating body for the Catholic Church 
            in Karnataka, fostering unity, collaboration, and effective pastoral care across our diverse communities.
          </p>
        </div>

        {/* Detailed About Content */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-6 leading-relaxed">
                  The Karnataka Regional Catholic Bishops' Council (KRCBC) is the regional body that unites and coordinates the Catholic Church's mission across the state of Karnataka. As one of the 14 ecclesiastical regions under the Catholic Bishops' Conference of India (CBCI), KRCBC brings together 14 dioceses—10 of the Latin Rite, 3 of the Syro-Malabar Rite, and 1 of the Syro-Malankara Rite—under the pastoral leadership of the Metropolitan Archbishop of Bangalore, Most Rev. Dr. Peter Machado.
                </p>
                
                <p className="mb-6 leading-relaxed">
                  Though Catholics comprise just 1.46% of the state's population, the Church plays a vital role in shaping society through its spiritual care, educational institutions, health services, and developmental outreach, especially among the poor, marginalized, and rural communities. With 686 parishes, over 1,700 priests, and more than 4,000 religious men and women, the Church's presence extends to every corner of Karnataka, from bustling cities to remote villages.
                </p>
                
                <p className="mb-6 leading-relaxed">
                  Today, the Church in Karnataka stands at a crossroads. It faces modern challenges such as religious intolerance, socio-economic disparities, digital overexposure, and a decline in vocations. Yet, rooted in the rich legacy of faith and sacrifice left by pioneering missionaries, the Church remains strong and committed to its mission.
                </p>
                
                <p className="leading-relaxed">
                  KRCBC envisions a vibrant, inclusive, and mission-oriented Church that listens, serves, and walks with all people. Through a renewed pastoral plan and the active involvement of the laity, clergy, and religious, the Council aims to respond creatively and compassionately to the changing needs of our time, building communities of hope, justice, and faith across Karnataka.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Statistics Cards */}
        <div className="mb-16">
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

        {/* Animated Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {statsData.map((stat, index) => <AnimatedCounter key={index} end={stat.end} suffix={stat.suffix} icon={stat.icon} label={stat.label} color={stat.color} />)}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-600"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => <TimelineItem key={item.year} item={item} index={index} />)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;