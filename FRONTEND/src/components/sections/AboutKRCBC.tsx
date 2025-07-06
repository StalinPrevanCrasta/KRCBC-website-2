import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Church, Users, Heart } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const AboutKRCBC = () => {
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/about-krcbc`)
      .then(res => res.json())
      .then(data => setAbout(data.data));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            About KRCBC
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uniting and coordinating the Catholic Church's mission across Karnataka
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-gray-700">
                {about ? (
                  <>
                    {Object.keys(about)
                      .filter((key) => key.startsWith('paragraph') && about[key])
                      .sort((a, b) => {
                        // Sort by paragraph number, e.g., paragraph1, paragraph2, ...
                        const numA = parseInt(a.replace('paragraph', ''), 10);
                        const numB = parseInt(b.replace('paragraph', ''), 10);
                        return numA - numB;
                      })
                      .map((key) => (
                        <p key={key} className="mb-6 leading-relaxed">{about[key]}</p>
                      ))}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
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
                <h3 className="font-semibold text-lg text-gray-800 mb-2">5,700+ Servants</h3>
                <p className="text-gray-600 text-sm">Priests and religious dedicated to service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutKRCBC;
