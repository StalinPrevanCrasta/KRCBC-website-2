
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Book, Heart, Cross, Users, Star } from 'lucide-react';

const Faith = () => {
  const [currentPrayer, setCurrentPrayer] = useState('morning');

  const prayers = {
    morning: {
      title: "Morning Prayer",
      content: "Loving God, as we begin this new day, we thank You for the gift of life and for Your constant presence with us. Guide our steps, bless our work, and help us to be instruments of Your peace and love. Through Christ our Lord. Amen."
    },
    evening: {
      title: "Evening Prayer",
      content: "Gracious Father, as the day comes to an end, we thank You for all the blessings You have given us. Forgive us our failings and grant us peaceful rest. Watch over our loved ones and all those in need. Through Christ our Lord. Amen."
    },
    meal: {
      title: "Meal Prayer",
      content: "Bless us, O Lord, and these Your gifts, which we are about to receive from Your bounty, through Christ our Lord. May we always be mindful of the needs of others. Amen."
    }
  };

  const sacraments = [
    {
      name: "Baptism",
      description: "The sacrament of initiation into the Christian community",
      icon: "💧",
      info: "Baptism is the gateway to life in the Spirit and the door which gives access to the other sacraments."
    },
    {
      name: "Confirmation",
      description: "Strengthening in faith through the gifts of the Holy Spirit",
      icon: "🕊️",
      info: "Confirmation perfects Baptismal grace and strengthens us to spread and defend the faith."
    },
    {
      name: "Eucharist",
      description: "The source and summit of Christian life",
      icon: "🍞",
      info: "The Eucharist is the real presence of Jesus Christ - Body, Blood, Soul, and Divinity."
    },
    {
      name: "Reconciliation",
      description: "Forgiveness and healing through God's mercy",
      icon: "✝️",
      info: "The sacrament of Penance offers pardon for sins and reconciliation with God and the Church."
    },
    {
      name: "Anointing",
      description: "Healing grace for the sick and elderly",
      icon: "🛡️",
      info: "Anointing of the Sick gives comfort, peace, courage, and forgiveness to those who are ill."
    },
    {
      name: "Holy Orders",
      description: "Ordination to serve the Church",
      icon: "👨‍💼",
      info: "Holy Orders consecrates men to serve the Church as deacons, priests, or bishops."
    },
    {
      name: "Marriage",
      description: "Sacred covenant between spouses",
      icon: "💑",
      info: "Marriage is a covenant by which a man and woman establish a partnership for life."
    }
  ];

  const liturgicalEvents = [
    {
      date: "March 29",
      event: "Good Friday",
      type: "Holy Week",
      description: "Commemoration of the Passion and Death of Jesus Christ"
    },
    {
      date: "March 31",
      event: "Easter Sunday",
      type: "Easter",
      description: "Celebration of the Resurrection of Jesus Christ"
    },
    {
      date: "May 9",
      event: "Ascension of the Lord",
      type: "Easter Season",
      description: "Jesus' ascension into heaven"
    },
    {
      date: "May 19",
      event: "Pentecost",
      type: "Easter Season",
      description: "Coming of the Holy Spirit upon the Apostles"
    }
  ];

  return (
    <section id="faith" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Faith & Spirituality
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Deepen your spiritual journey through prayer, sacraments, and liturgical celebrations. 
            Find resources for daily spiritual growth and community worship.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Daily Prayers Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-red-500" />
                  Daily Prayers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {Object.entries(prayers).map(([key, prayer]) => (
                    <button
                      key={key}
                      onClick={() => setCurrentPrayer(key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentPrayer === key
                          ? 'bg-blue-100 text-blue-600 border border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {prayer.title}
                    </button>
                  ))}
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {prayers[currentPrayer as keyof typeof prayers].title}
                  </h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    {prayers[currentPrayer as keyof typeof prayers].content}
                  </p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Book className="w-4 h-4 mr-2" />
                  Prayer Book
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="sacraments" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="sacraments" className="flex items-center gap-2">
                  <Cross className="w-4 h-4" />
                  Sacraments
                </TabsTrigger>
                <TabsTrigger value="liturgical" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Liturgical Calendar
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Resources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sacraments" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">The Seven Sacraments</h3>
                  <p className="text-gray-600">Sacred signs instituted by Christ to give grace</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {sacraments.map((sacrament) => (
                    <Card key={sacrament.name} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{sacrament.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-lg mb-2">{sacrament.name}</h4>
                            <p className="text-gray-600 mb-3">{sacrament.description}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{sacrament.info}</p>
                            <Button size="sm" variant="outline" className="mt-3 border-blue-600 text-blue-600 hover:bg-blue-50">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="liturgical" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Liturgical Calendar</h3>
                  <p className="text-gray-600">Upcoming feasts and holy days in the Church year</p>
                </div>

                <div className="space-y-4">
                  {liturgicalEvents.map((event) => (
                    <Card key={event.event} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {event.date.split(' ')[1]}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{event.date.split(' ')[0]}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-800 text-lg">{event.event}</h4>
                              <span className="px-2 py-1 bg-amber-100 text-amber-600 text-xs font-medium rounded">
                                {event.type}
                              </span>
                            </div>
                            <p className="text-gray-600">{event.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Full Calendar
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Spiritual Resources</h3>
                  <p className="text-gray-600">Tools and materials for spiritual growth and formation</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Book className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-800 mb-2">Daily Readings</h4>
                      <p className="text-gray-600 text-sm mb-4">Scripture readings for daily Mass and prayer</p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        View Readings
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-800 mb-2">Small Groups</h4>
                      <p className="text-gray-600 text-sm mb-4">Join faith-sharing communities in your area</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Find Groups
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Star className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-800 mb-2">Retreat Centers</h4>
                      <p className="text-gray-600 text-sm mb-4">Find spiritual retreat locations near you</p>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                        Find Retreats
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faith;
