import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });
  const departments = [{
    id: 'general',
    label: 'General Inquiry'
  }, {
    id: 'pastoral',
    label: 'Pastoral Care'
  }, {
    id: 'youth',
    label: 'Youth Ministry'
  }, {
    id: 'education',
    label: 'Education'
  }, {
    id: 'social',
    label: 'Social Services'
  }, {
    id: 'media',
    label: 'Media & Communications'
  }];
  const officeHours = [{
    day: 'Monday - Friday',
    hours: '9:00 AM - 5:00 PM'
  }, {
    day: 'Saturday',
    hours: '9:00 AM - 1:00 PM'
  }, {
    day: 'Sunday',
    hours: 'Closed (Emergency only)'
  }];
  // Fetch contacts from Strapi
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact-cards`)
      .then(res => res.json())
      .then(data => {
        setContacts(
          data.data.map((item: any) => ({
            title: item.title,
            address: item.address,
            phone: item.phone,
            email: item.email,
            type: item.type,
          }))
        );
      });
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto link
    const subject = encodeURIComponent(formData.subject || "Contact Form Submission");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDepartment: ${formData.department}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:krcbcbangalore@gmail.com?subject=${subject}&body=${body}`;
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <section id="contact" className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're here to serve you and answer any questions you may have. 
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required />
                    <Input type="email" placeholder="Email Address" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                    <select className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.department} onChange={e => handleInputChange('department', e.target.value)}>
                      {departments.map(dept => <option key={dept.id} value={dept.id}>
                          {dept.label}
                        </option>)}
                    </select>
                  </div>

                  <Input placeholder="Subject" value={formData.subject} onChange={e => handleInputChange('subject', e.target.value)} required />

                  <Textarea placeholder="Your Message" rows={5} value={formData.message} onChange={e => handleInputChange('message', e.target.value)} required />

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => <div key={index} className="flex justify-between">
                      <span className="text-sm text-gray-600">{schedule.day}</span>
                      <span className="text-sm font-medium">{schedule.hours}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              
              
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Main Office
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    WhatsApp Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contacts.map((contact, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">{contact.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{contact.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{contact.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Find Us
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 bg-gray-200 rounded-b-lg relative overflow-hidden">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1964.2329948003478!2d77.62378802771656!3d13.002355053167188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17000c835163%3A0x75ed3f7830a294!2sSUBODHANA!5e0!3m2!1sen!2sin!4v1751441123917!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Directions */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Public Transportation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Metro:</strong> Trinity Metro Station (Purple Line) - 10 min walk
                </div>
                <div>
                  <strong>Bus:</strong> Routes 201E, 211, 213A stop at Mayo Hall
                </div>
                <div>
                  <strong>Auto/Taxi:</strong> Easily accessible from any part of Bangalore
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Visitor Parking:</strong> Available on premises (limited)
                </div>
                <div>
                  <strong>Street Parking:</strong> Available on Residency Road
                </div>
                <div>
                  <strong>Paid Parking:</strong> Commercial complexes nearby
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;