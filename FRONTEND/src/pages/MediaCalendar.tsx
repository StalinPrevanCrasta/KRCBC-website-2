import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar as CalendarIcon, Clock, Play, Radio } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const API_URL = import.meta.env.VITE_API_URL;

// Data structure for live streams
interface LiveStream {
  id: string; // Assuming title can serve as a unique ID for this static data
  title: string;
  date: Date;
  time: string; // Extracted time part e.g., "8:00 AM"
  originalTimeString: string; // Original full time string e.g., "Today 8:00 AM"
  status: 'live' | 'upcoming';
  viewers?: string | null;
}

// Raw data for live streams (copied from Media.tsx for now)
const rawLiveStreamsData = [
  {
    title: "Sunday Mass - Cathedral of St. Joseph",
    time: "Today 8:00 AM", // Needs parsing
    status: "live",
    viewers: "245"
  },
  {
    title: "Evening Prayer Service",
    time: "Today 6:00 PM", // Needs parsing
    status: "upcoming",
    viewers: null
  },
  {
    title: "Bishops' Conference - Monthly Meeting",
    time: "Tomorrow 10:00 AM", // Needs parsing
    status: "upcoming",
    viewers: null
  },
  { // Adding a future specific date for testing
    title: "Special Rosary Session",
    time: new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }) + " 7:00 PM", // e.g., "2024-07-28 7:00 PM"
    status: "upcoming",
    viewers: null
  }
];

// Helper function to parse date/time strings
const parseStreamTime = (timeString: string): { date: Date, time: string } => {
  const now = new Date();
  let date = new Date(now); // Make a copy to avoid modifying 'now' directly
  let timePart = timeString.split(' ').pop() || "12:00 AM"; // Default time if not specified
  const amPmPart = timeString.includes('AM') ? 'AM' : (timeString.includes('PM') ? 'PM' : '');
  timePart = timeString.substring(timeString.search(/[0-9]/), timeString.search(/(AM|PM)/)+2).trim();


  if (timeString.toLowerCase().startsWith('today')) {
    // Date is today, time is specified
  } else if (timeString.toLowerCase().startsWith('tomorrow')) {
    date.setDate(now.getDate() + 1);
  } else {
    // Attempt to parse as a full date string e.g., "YYYY-MM-DD HH:MM AM/PM" or "MM/DD/YYYY HH:MM AM/PM"
    // This is a simplified parser. A robust solution would use a library like date-fns.
    const dateMatch = timeString.match(/(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4})/);
    if (dateMatch && dateMatch[0]) {
      date = new Date(dateMatch[0]);
    } else {
      // Default to today if no specific date part is found (should not happen with good data)
      console.warn(`Could not parse date from: ${timeString}. Defaulting to today.`);
    }
  }

  // Set time
  const [hourStr, minuteStr] = timePart.replace(/(AM|PM)/i, '').trim().split(':');
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10) || 0;

  if (amPmPart.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  } else if (amPmPart.toLowerCase() === 'am' && hours === 12) { // Midnight case
    hours = 0;
  }

  date.setHours(hours, minutes, 0, 0);
  return { date, time: timePart };
};


const MediaCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [streams, setStreams] = useState<any[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/streams`)
      .then(res => res.json())
      .then(data => {
        const processedStreams = data.data.map((item: any) => {
          const dateObj = item.DateAndTime ? new Date(item.DateAndTime) : null;
          // Extract first link if present
          let streamUrl = '';
          if (Array.isArray(item.url)) {
            for (const block of item.url) {
              if (block.children) {
                for (const child of block.children) {
                  if (child.type === 'link' && child.url) {
                    streamUrl = child.url;
                    break;
                  }
                }
              }
              if (streamUrl) break;
            }
          }
          return {
            id: item.id,
            title: item.title,
            date: dateObj,
            time: dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            status: item.isLive ? 'live' : 'upcoming',
            url: streamUrl,
          };
        });
        setStreams(processedStreams);
        setHighlightedDates(processedStreams.filter(s => s.date).map(s => s.date));
      });
  }, []);

  const displayedStreams = streams.filter(stream => {
    if (!selectedDate) return true;
    return (
      stream.date &&
      stream.date.getFullYear() === selectedDate.getFullYear() &&
      stream.date.getMonth() === selectedDate.getMonth() &&
      stream.date.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white p-4">
      <Helmet>
        <title>Media Calendar - KRCBC</title>
        <meta name="description" content="View the media calendar for the Kerala Region of Catholic Bishops Conference (KRCBC). Find live streams, broadcasts, and upcoming media events." />
        <meta name="keywords" content="KRCBC Media Calendar, Kerala Catholic Live Stream, Church Broadcasts, Religious Media, Catholic Media Schedule" />
        <meta property="og:title" content="Media Calendar - KRCBC" />
        <meta property="og:description" content="View the media calendar for the Kerala Region of Catholic Bishops Conference (KRCBC). Find live streams, broadcasts, and upcoming media events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krcbc.in/media-calendar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Media Calendar - KRCBC" />
        <meta name="twitter:description" content="View the media calendar for the Kerala Region of Catholic Bishops Conference (KRCBC). Find live streams, broadcasts, and upcoming media events." />
        <link rel="canonical" href="https://krcbc.in/media-calendar" />
      </Helmet>
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Media Schedule
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upcoming live streams and media events.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    modifiers={highlightedDates.length > 0 ? { highlighted: highlightedDates } : undefined}
                    modifiersClassNames={{ highlighted: 'bg-blue-100 !rounded-full text-blue-700' }}
                    className="rounded-md border"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    Dates with scheduled streams will be highlighted. Select a date to see streams for that day.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {selectedDate ? `Streams for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : 'All Upcoming Streams'}
              </h2>
              {displayedStreams.length > 0 ? (
                <div className="space-y-6">
                  {displayedStreams.map((stream) => (
                    <Card key={stream.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className={`p-3 rounded-lg ${stream.status === 'live' ? 'bg-red-100' : 'bg-blue-100'}`}>
                              {stream.status === 'live' ? (
                                <Radio className="w-8 h-8 text-red-600" />
                              ) : (
                                <Play className="w-8 h-8 text-blue-600" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold text-gray-800">
                                {stream.title}
                              </h3>
                              {stream.status === 'live' && (
                                <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Clock className="w-4 h-4" />
                              <span>{stream.time} on {stream.date.toLocaleDateString()}</span>
                            </div>
                             {stream.viewers && stream.status === 'live' && (
                              <p className="text-sm text-gray-500 mb-2">{stream.viewers} watching</p>
                            )}
                            <Button
                              asChild
                              size="sm"
                              className={`mt-2 ${stream.status === 'live' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                              {stream.url ? (
                                <a href={stream.url} target="_blank" rel="noopener noreferrer">
                                  {stream.status === 'live' ? 'Watch Live' : 'Watch Stream'}
                                </a>
                              ) : (
                                <span>
                                  {stream.status === 'live' ? 'Watch Live' : 'Watch Stream'}
                                </span>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No streams scheduled for {selectedDate ? selectedDate.toLocaleDateString() : 'this day'}.
                  </h3>
                  <p className="text-gray-500">Check other dates or view all upcoming streams.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MediaCalendar;
