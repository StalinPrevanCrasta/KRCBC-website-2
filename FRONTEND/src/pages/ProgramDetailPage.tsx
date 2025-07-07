import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { programs, Program } from '@/components/sections/Programs'; // Assuming programs is exported
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = programs.find(p => p.slug === slug);

  if (!program) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br to-white flex flex-col">
        <Helmet>
          <title>Program Not Found - KRCBC</title>
          <meta name="description" content="The program you're looking for could not be found. Explore other programs offered by the Kerala Region of Catholic Bishops Conference (KRCBC)." />
          <meta name="keywords" content="KRCBC Programs, Kerala Catholic Programs, Program Not Found" />
          <meta property="og:title" content="Program Not Found - KRCBC" />
          <meta property="og:description" content="The program you're looking for could not be found. Explore other programs offered by the Kerala Region of Catholic Bishops Conference (KRCBC)." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://krcbc.in/programs/${slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Program Not Found - KRCBC" />
          <meta name="twitter:description" content="The program you're looking for could not be found. Explore other programs offered by the Kerala Region of Catholic Bishops Conference (KRCBC)." />
          <link rel="canonical" href={`https://krcbc.in/programs/${slug}`} />
        </Helmet>
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the program you were looking for.
          </p>
          <RouterLink to="/programs">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Button>
          </RouterLink>
        </main>
      </div>
    );
  }

  const IconComponent = program.icon;

  return (
    <div className="min-h-screen relative bg-gradient-to-br to-white flex flex-col">
      <Helmet>
        <title>{program.title} - KRCBC Programs</title>
        <meta name="description" content={program.description} />
        <meta name="keywords" content={`KRCBC ${program.title}, Kerala Catholic Programs, ${program.title}, Church Programs, Catholic Education`} />
        <meta property="og:title" content={`${program.title} - KRCBC Programs`} />
        <meta property="og:description" content={program.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://krcbc.in/programs/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${program.title} - KRCBC Programs`} />
        <meta name="twitter:description" content={program.description} />
        <link rel="canonical" href={`https://krcbc.in/programs/${slug}`} />
      </Helmet>
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl"> {/* Adjusted padding and max-width */}
        <div className="mb-6 md:mb-8"> {/* Adjusted margin */}
          <RouterLink to="/programs" className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm group">
            <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" />
            Back to All Programs
          </RouterLink>
        </div>

        {/* New Title and Icon Section */}
        <div className="mb-8 md:mb-10 text-center">
          <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full ${program.color.split(' ')[0]} flex items-center justify-center mb-4 shadow-md`}> {/* Use first bg color from program.color */}
            <IconComponent className={`w-10 h-10 md:w-12 md:h-12 ${program.color.substring(program.color.indexOf('text-'))}`} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
            {program.title}
          </h1>
        </div>

        {/* Content Sections - No longer wrapped in a Card */}
        <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">About this Program</h2> {/* Changed h3 to h2 */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed"> {/* Added prose for better text styling */}
                <p className="whitespace-pre-line">
                  {program.description}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Areas & Features</h2> {/* Changed h3 to h2 */}
              <ul className="space-y-2 pl-5"> {/* Added pl-5 for default list indentation */}
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-start text-gray-700">
                    {/* Corrected bullet color derivation */}
                    <div className={`w-2 h-2 ${program.color.substring(program.color.indexOf('text-')).replace('text-', 'bg-')} rounded-full mr-3 mt-[0.4em] shrink-0`}></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* You can add more sections here, like related events, contact person, etc. */}
            <div className="pt-6 text-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"> {/* Standardized button style */}
                    Get Involved with {program.title}
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramDetailPage;
