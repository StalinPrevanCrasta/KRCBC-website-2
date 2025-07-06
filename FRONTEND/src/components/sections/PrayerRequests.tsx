
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Users, Clock, Send } from 'lucide-react';

const PrayerRequests = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    prayerType: 'general',
    intention: '',
    anonymous: false
  });

  const prayerTypes = [
    { id: 'general', label: 'General Prayer' },
    { id: 'healing', label: 'Healing & Health' },
    { id: 'family', label: 'Family & Relationships' },
    { id: 'guidance', label: 'Guidance & Wisdom' },
    { id: 'thanksgiving', label: 'Thanksgiving' },
    { id: 'grief', label: 'Grief & Loss' }
  ];

  const recentIntentions = [
    {
      intention: "For the healing of my mother who is in the hospital",
      date: "2 hours ago",
      prayers: 23
    },
    {
      intention: "For peace and unity in our family during difficult times",
      date: "4 hours ago",
      prayers: 15
    },
    {
      intention: "Thanksgiving for safe delivery of our baby",
      date: "6 hours ago",
      prayers: 31
    },
    {
      intention: "For guidance in choosing the right career path",
      date: "8 hours ago",
      prayers: 12
    },
    {
      intention: "For the success of our parish youth program",
      date: "12 hours ago",
      prayers: 19
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Prayer request submitted:', formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="prayer-requests" className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Prayer Requests
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your prayer intentions with our community. We believe in the power of prayer 
            and stand with you in faith, hope, and love.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Prayer Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Submit a Prayer Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <Input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium mb-3">Prayer Category</label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {prayerTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                            formData.prayerType === type.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('prayerType', type.id)}
                        >
                          <div className="text-sm font-medium">{type.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Prayer Intention</label>
                    <Textarea
                      placeholder="Please share your prayer request. Be as specific or general as you feel comfortable."
                      rows={5}
                      value={formData.intention}
                      onChange={(e) => handleInputChange('intention', e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.anonymous}
                      onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      Submit anonymously (name will not be displayed)
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Prayer Request
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Your prayer request will be included in our daily prayers and shared with our prayer ministry team.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prayer Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Community Prayer Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2,456</div>
                    <div className="text-sm text-gray-600">Prayer requests this month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">15,890</div>
                    <div className="text-sm text-gray-600">Prayers offered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">892</div>
                    <div className="text-sm text-gray-600">Active prayer warriors</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mass Intentions */}
            <Card>
              <CardHeader>
                <CardTitle>Mass Intentions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Request a Mass to be offered for your special intention.
                </p>
                <Button className="w-full mb-3">Request Mass Intention</Button>
                <div className="text-xs text-gray-500">
                  Suggested offering: ₹100-500
                </div>
              </CardContent>
            </Card>

            {/* Join Prayer Ministry */}
            <Card>
              <CardHeader>
                <CardTitle>Join Our Prayer Ministry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Become a prayer warrior and commit to praying for intentions submitted by our community.
                </p>
                <Button variant="outline" className="w-full">
                  Become a Prayer Warrior
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Prayer Intentions */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8">Recent Prayer Intentions</h3>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {recentIntentions.map((intention, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-800 mb-2">{intention.intention}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {intention.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {intention.prayers} prayers
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4 mr-1" />
                        Pray
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline">View All Prayer Intentions</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerRequests;
