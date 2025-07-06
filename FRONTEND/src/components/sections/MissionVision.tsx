import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const fallbackMission =
  "The Church in Karnataka commits to journey together with people of God who are committed to the work of evangelisation that fosters holistic development. Utilizing the available resources like spiritual, human and material, the Church would explore opportunities to deepen the faith and improve the quality of life of all people in collaboration with faith-based and like-minded organizations.";

const fallbackVision =
  "Rooted in Christ, building Spirit-filled Communion of Communities based on Reconciliation, Justice, Fraternity and Love.";

const MissionVision = () => {
  const [mission, setMission] = useState(fallbackMission);
  const [vision, setVision] = useState(fallbackVision);

  useEffect(() => {
    fetch(`${API_URL}/api/mission-and-vision`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setMission(data.data.mission || fallbackMission);
          setVision(data.data.vision || fallbackVision);
        }
      })
      .catch(() => {
        setMission(fallbackMission);
        setVision(fallbackVision);
      });
  }, []);

  return (
    <section className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Mission & Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our guiding principles that shape our commitment to serve the people of Karnataka
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-blue-600">Mission Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-center">
                {mission}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-amber-600">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-center">
                {vision}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
