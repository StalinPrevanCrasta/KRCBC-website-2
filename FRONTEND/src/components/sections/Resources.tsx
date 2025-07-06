import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Video, BookOpen, Users, Calendar, Heart, Cross } from 'lucide-react';

const Resources = () => {
  const resourceCategories = [
    {
      icon: FileText,
      title: "Official Documents",
      description: "Pastoral letters, encyclicals, and official statements from KRCBC",
      items: ["Pastoral Letters", "Annual Reports", "Policy Documents", "Guidelines"],
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: BookOpen,
      title: "Educational Materials",
      description: "Catechism resources, study guides, and educational content",
      items: ["Catechism Guides", "Bible Study", "Formation Materials", "Liturgical Texts"],
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Heart,
      title: "Faith & Prayer",
      description: "Daily prayers, spiritual resources, and liturgical materials",
      items: ["Daily Prayers", "Prayer Books", "Spiritual Readings", "Devotions"],
      color: "bg-red-50 text-red-600"
    },
    {
      icon: Cross,
      title: "Sacramental Resources",
      description: "Materials for sacramental preparation and celebration",
      items: ["Baptism Preparation", "Marriage Prep", "Confirmation", "First Communion"],
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: Video,
      title: "Media Resources",
      description: "Audio-visual content for parishes and community use",
      items: ["Homily Videos", "Training Videos", "Podcasts", "Audio Resources"],
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Users,
      title: "Youth Resources",
      description: "Special content designed for young Catholics and youth ministry",
      items: ["Youth Programs", "Activity Guides", "Retreat Materials", "Leadership Training"],
      color: "bg-amber-50 text-amber-600"
    }
  ];

  // State for links from Strapi
  const [links, setLinks] = useState<{ [title: string]: string }>({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/resources`) // or your resource-links endpoint
      .then(res => res.json())
      .then(data => {
        const linkMap: { [title: string]: string } = {};
        data.data.forEach((item: any) => {
          // If link is a string:
          // linkMap[item.attributes.title] = item.attributes.link;

          // If link is a rich text array (as in your previous example):
          let url = '';
          if (item && Array.isArray(item.link)) {
            for (const block of item.link) {
              if (block.children) {
                for (const child of block.children) {
                  if (child.type === 'link' && child.url) {
                    url = child.url;
                    break;
                  }
                }
              }
              if (url) break;
            }
          }
          linkMap[item.title] = url;
        });
        setLinks(linkMap);
      });
  }, []);

  return (
    <section id="resources" className="py-16 bg-gradient-to-br from-orange-50/50 to-amber-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Resources & Faith Materials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access important documents, educational materials, prayers, and spiritual resources to support 
            your faith journey and ministry work.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resourceCategories.map((category) => {
                const IconComponent = category.icon;
                const browseLink = links[category.title] || "#";
                return (
                  <Card key={category.title} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {category.items.map((item) => (
                          <li key={item} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {browseLink && browseLink !== "#" ? (
                        <a href={browseLink} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full" variant="outline">
                            Browse {category.title}
                          </Button>
                        </a>
                      ) : (
                        <Button className="w-full" variant="outline" disabled>
                          Browse {category.title}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
