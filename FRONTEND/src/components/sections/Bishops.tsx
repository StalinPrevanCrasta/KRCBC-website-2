import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const API_URL = import.meta.env.VITE_API_URL;

type Bishop = {
  id: number;
  Name: string;
  Title: string;
  Place: string;
  Image: Array<{
    url: string;
    formats?: {
      thumbnail?: { url: string };
    };
  }>;
};

const fallbackBishops: Bishop[] = [
  {
    id: 0,
    Name: "Bishop Name",
    Title: "Title",
    Place: "Location",
    Image: [
      {
        url: "/placeholder.svg",
        formats: {
          thumbnail: { url: "/placeholder.svg" }
        }
      }
    ]
  }
];

const Bishops = () => {
  const [bishops, setBishops] = useState<Bishop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/bishops?sort=Position:asc&populate=*`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          setBishops(data.data);
        } else {
          setBishops(fallbackBishops);
        }
        setLoading(false);
      })
      .catch(() => {
        setBishops(fallbackBishops);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Bishops
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the pastoral leaders who guide and shepherd the Catholic communities across Karnataka
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bishops.map((bishop) => {
              const img =
                bishop.Image?.[0]?.formats?.thumbnail?.url ||
                bishop.Image?.[0]?.url ||
                '/placeholder.svg';
              const imgSrc =  `${API_URL}${img}`;
              return (
                <Card key={bishop.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={imgSrc}
                        alt={bishop.Name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{bishop.Name}</h4>
                    <p className="text-sm text-blue-600 font-medium mb-1">{bishop.Title}</p>
                    <p className="text-sm text-gray-500 mb-3">{bishop.Place}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bishops;
