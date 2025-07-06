import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Facebook, Twitter, Youtube, Instagram, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Footer = () => {
  const quickLinks = [{
    name: 'About Us',
    href: '#about'
  }, {
    name: 'Our Bishops',
    href: '#bishops'
  }, {
    name: 'Programs',
    href: '#programs'
  }, {
    name: 'News & Events',
    href: '#news'
  }, {
    name: 'Faith Resources',
    href: '#faith'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  const services = [{
    name: 'Pastoral Care',
    href: '#pastoral'
  }, {
    name: 'Youth Ministry',
    href: '#youth'
  }, {
    name: 'Education',
    href: '#education'
  }, {
    name: 'Social Services',
    href: '#social'
  }, {
    name: 'Health Services',
    href: '#health'
  }, {
    name: 'Media & Communications',
    href: '#media'
  }];
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/logo?populate=krcbc_logo`)
      .then(res => res.json())
      .then(data => {
        const logo = data.data?.krcbc_logo;
        if (logo?.formats?.small?.url) {
          setLogoUrl(API_URL + logo.formats.small.url);
        } else if (logo?.url) {
          setLogoUrl(API_URL + logo.url);
        }
      });
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="KRCBC Logo"
                    className="w-14 h-14 rounded-full object-cover bg-white p-1"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">K</span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold">KRCBC</h3>
                  <p className="text-sm text-gray-400">Karnataka Regional Catholic Bishops' Council</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Serving the Catholic faithful in Karnataka through collaborative pastoral care, 
                social service, and spiritual formation, guided by Gospel values.
              </p>
              {/* Social Media */}
              <div className="flex space-x-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                  className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                  className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors">
                  <Youtube className="w-4 h-4 text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="p-2 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 transition-colors">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.map(service => (
                  <li key={service.name}>
                    <a href={service.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address Column */}
            <div>
              <h4 className="text-lg font-semibold mb-4">KRCBC Office</h4>
              <div className="text-gray-400 text-sm mb-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Subhodhana, 58/6, 2nd Cross, Da Costa Layout, Wheeler Road Extension, St. Thomas Town Post, Bengaluru – 560084, Karnataka, India</span>
              </div>
              <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>080-25496812, +91-88800 53329</span>
              </div>
              <div className="text-gray-400 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:krcbcbangalore@gmail.com" className="hover:text-white underline">krcbcbangalore@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center">
              © 2025 Karnataka Regional Catholic Bishops' Council. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-center gap-2">
              <div className="text-gray-400 text-base font-semibold">
                Website developed by{' '}
                <a
                  href="https://sandeshafoundation.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-white transition-colors"
                >
                  Sandesha Foundation
                </a>{' '}
                &amp;{' '}
                <a
                  href="https://scriptators.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-white transition-colors"
                >
                  Scriptators
                </a>
              </div>
              <div>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;