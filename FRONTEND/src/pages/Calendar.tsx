import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [eventHighlightDates, setEventHighlightDates] = useState<Date[]>([]);
  const [events, setEvents] = useState<EventType[]>([]); // <-- Replace hardcoded events with state
  const [eventsBelowCalendar, setEventsBelowCalendar] = useState<EventType[]>([]);

  // Define EventType based on your Strapi structure
  interface EventType {
    id: number;
    title: string;
    date: string; // "YYYY-MM-DD"
    time: string;
    location: string;
    category: string;
    description: string;
    attendees: number;
    rsvpLink?: string;
  }
  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch events from Strapi
  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(
          data.data.map((item: any) => {
            // Extract first link from RSVPLink rich text
            let rsvpLink = '';
            if (Array.isArray(item.RSVPLink)) {
              for (const block of item.RSVPLink) {
                if (block.children) {
                  for (const child of block.children) {
                    if (child.type === 'link' && child.url) {
                      rsvpLink = child.url;
                      break;
                    }
                  }
                }
                if (rsvpLink) break;
              }
            } else if (typeof item.RSVPLink === 'string') {
              rsvpLink = item.RSVPLink;
            }
            return {
              id: item.id,
              title: item.Name,
              date: item.DateAndTime.split('T')[0], // "YYYY-MM-DD"
              time: new Date(item.DateAndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: item.Location,
              category: item.Category || 'General', // fallback if no category
              description: item.Description || '',
              attendees: item.Attendees || 0,
              rsvpLink,
            };
          })
        );
      });
  }, []);

  const categories = [
    { value: 'all', label: 'All Events' },
    ...Array.from(new Set(events.map(event => event.category)))
      .filter(Boolean)
      .map(cat => ({ value: cat, label: cat }))
  ];

  // Filter events for the right-hand column based ONLY on selected category
  const eventsForRightColumn = selectedCategory === 'all'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Liturgical': 'bg-purple-100 text-purple-800',
      'Youth': 'bg-blue-100 text-blue-800',
      'Clergy': 'bg-green-100 text-green-800',
      'Family': 'bg-pink-100 text-pink-800',
      'Education': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Effect to process event dates for highlighting
  useEffect(() => {
    const parsedDates = events.map(event => {
      const [year, month, day] = event.date.split('-').map(Number);
      // Create Date object for midnight local time. Month is 0-indexed.
      return new Date(year, month - 1, day);
    });

    // To ensure unique dates if multiple events are on the same day for highlighting purposes
    // We still use toDateString for uniqueness, as it gives a comparable string for the date part.
    const uniqueDateStrings = [...new Set(parsedDates.map(date => date.toDateString()))];
    // Convert back to Date objects. These will represent midnight local time.
    setEventHighlightDates(uniqueDateStrings.map(dateStr => new Date(dateStr)));
  }, [events]); // Re-run if events data changes, though it's static here

  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white">
      <Helmet>
        <title>Calendar - KRCBC</title>
        <meta name="description" content="View the calendar of events for the Kerala Region of Catholic Bishops Conference (KRCBC). Stay updated with upcoming meetings, celebrations, and important dates." />
        <meta name="keywords" content="KRCBC Calendar, Kerala Catholic Events, Church Calendar, Catholic Celebrations, KRCBC Events Schedule" />
        <meta property="og:title" content="Calendar - KRCBC" />
        <meta property="og:description" content="View the calendar of events for the Kerala Region of Catholic Bishops Conference (KRCBC). Stay updated with upcoming meetings, celebrations, and important dates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/calendar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calendar - KRCBC" />
        <meta name="twitter:description" content="View the calendar of events for the Kerala Region of Catholic Bishops Conference (KRCBC). Stay updated with upcoming meetings, celebrations, and important dates." />
        <link rel="canonical" href="https://krcbc.in/calendar" />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Events Calendar
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with upcoming events, liturgical celebrations, and community gatherings across Karnataka.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        // Format the selected date to "YYYY-MM-DD" string, respecting local timezone
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth is 0-indexed
                        const day = date.getDate().toString().padStart(2, '0');
                        const dateString = `${year}-${month}-${day}`;

                        const matchingEvents = events.filter(event => event.date === dateString);
                        setEventsBelowCalendar(matchingEvents);
                      } else {
                        setEventsBelowCalendar([]); // Clear if no date is selected
                      }
                    }}
                    className="rounded-md border"
                    modifiers={eventHighlightDates.length > 0 ? { highlighted: eventHighlightDates } : undefined}
                    modifiersClassNames={{ highlighted: 'bg-purple-100 !rounded-full text-purple-700' }}
                  />
                  {/* Display events for selected date below calendar */}
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-lg font-semibold mb-3 text-gray-700">
                      Events on {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'selected date'}:
                    </h4>
                    {selectedDate && eventsBelowCalendar.length > 0 ? (
                      <ul className="space-y-3">
                        {eventsBelowCalendar.map(event => (
                          <li key={event.id} className="text-sm p-3 bg-gray-100 rounded-md shadow-sm">
                            <p className="font-semibold text-gray-800">{event.title}</p>
                            <p className="text-gray-600 flex items-center">
                              <Clock className="w-3 h-3 mr-1.5" /> {event.time}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Category: {event.category}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : selectedDate ? (
                      <p className="text-sm text-gray-500">No events scheduled for this day.</p>
                    ) : (
                      <p className="text-sm text-gray-500">Select a date to see events.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events Section */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600 mt-2" />
                <span className="text-sm font-medium text-gray-700 mt-2 mr-2">Filter by:</span>
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className="text-xs"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* Events List */}
              <div className="space-y-6">
                {eventsForRightColumn.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="bg-blue-50 rounded-lg p-3 text-center min-w-[80px]">
                            <div className="text-sm font-medium text-blue-600">
                              {/* Ensure date parsing for display is robust if event.date is pre-parsed */}
                              {new Date(event.date.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div className="text-2xl font-bold text-blue-800">
                              {new Date(event.date.replace(/-/g, '/')).getDate()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {event.title}
                            </h3>
                            <Badge className={getCategoryColor(event.category)}>
                              {event.category}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          
                          <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} expected</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {event.rsvpLink ? (
                              <a
                                href={event.rsvpLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  RSVP
                                </Button>
                              </a>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled
                              >
                                RSVP
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => {
                              const shareUrl = window.location.href;
                              const shareData = {
                                title: event.title,
                                text: event.description || event.title,
                                url: shareUrl
                              };
                              if (navigator.share) {
                                navigator.share(shareData);
                              } else {
                                // fallback: copy to clipboard
                                navigator.clipboard.writeText(shareUrl);
                                alert('Link copied to clipboard!');
                              }
                            }}>
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {eventsForRightColumn.length === 0 && (
                <div className="text-center py-12">
                  <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No events found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more events.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
