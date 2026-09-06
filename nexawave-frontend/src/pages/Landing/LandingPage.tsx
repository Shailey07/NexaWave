import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, MapPin, Star, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { useMode } from '@/context/ModeContext';

export const LandingPage: React.FC = () => {
  const { mode } = useMode();

  const features = [
    { icon: MapPin, title: 'Location-Based Discovery', description: 'Find services and products near you with precise location matching.' },
    { icon: Users, title: 'Rural & Urban Focus', description: 'Tailored digital experiences optimized for both rural and urban communities.' },
    { icon: Shield, title: 'Verified Providers', description: 'All service providers undergo verification for your safety and trust.' },
    { icon: Star, title: 'Quality Ratings', description: 'Transparent, community-driven rating and review systems.' },
    { icon: Zap, title: 'Instant Quotes', description: 'Request multiple quotes instantly and compare prices easily.' },
    { icon: CheckCircle, title: 'Secure Transactions', description: 'Safe, reliable, and secure end-to-end payment processing.' }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '5K+', label: 'Service Providers' },
    { number: '50+', label: 'Cities Covered' },
    { number: '4.8', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="outline" className="mb-6 bg-white border-gray-300 text-gray-700 py-1.5 px-4 shadow-sm">
              Empowering Local Economies Nationwide
            </Badge>
            <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Discover Local Services
              <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${mode === 'rural' ? 'from-green-600 to-emerald-700' : 'from-blue-600 to-indigo-700'}`}>
                {mode === 'rural' ? 'In Rural Communities' : 'In Urban Areas'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Bridge the gap between communities. Find trusted local services, 
              buy or sell products, and connect with your neighbors on a secure platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <Button size="lg" variant={mode === 'rural' ? 'rural' : 'urban'} className="text-base px-10 h-14 w-full sm:w-auto shadow-sm">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="glass" className="text-base px-10 h-14 w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-6 text-center">
                <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-24 px-4 border-y border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <GlassCard className="p-10 border-gray-200 shadow-sm bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-red-500 rounded mr-4"></div>
                The Challenge
              </h2>
              <ul className="space-y-4 text-gray-700 font-medium">
                <li className="flex items-start"><span className="mr-3 text-red-500 font-bold">•</span> Rural communities struggle to find reliable local services.</li>
                <li className="flex items-start"><span className="mr-3 text-red-500 font-bold">•</span> Urban areas lack personalized, community-focused solutions.</li>
                <li className="flex items-start"><span className="mr-3 text-red-500 font-bold">•</span> Disconnect between skilled service providers and customers.</li>
                <li className="flex items-start"><span className="mr-3 text-red-500 font-bold">•</span> Limited digital access and trust in remote regions.</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-10 border-gray-200 shadow-sm bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded mr-4"></div>
                Our Solution
              </h2>
              <ul className="space-y-4 text-gray-700 font-medium">
                <li className="flex items-start"><span className="mr-3 text-blue-600 font-bold">✓</span> Rural Mode: Specialized in agriculture, handicrafts & transport.</li>
                <li className="flex items-start"><span className="mr-3 text-blue-600 font-bold">✓</span> Urban Mode: Focused on home services, tech help & delivery.</li>
                <li className="flex items-start"><span className="mr-3 text-blue-600 font-bold">✓</span> Direct, transparent connection between providers and customers.</li>
                <li className="flex items-start"><span className="mr-3 text-blue-600 font-bold">✓</span> Highly accessible, secure platform engineered for everyone.</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose NEXAWAVE?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
              Built specifically for India's diverse communities, armed with features that prioritize your security and convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <GlassCard key={index} className="p-8 hover:border-blue-300 transition-colors">
                  <div className={`w-14 h-14 rounded-xl ${mode === 'rural' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center mb-6`}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-16 bg-blue-50 border-blue-100 shadow-sm">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 font-medium mb-10 max-w-xl mx-auto">
              Join thousands of users discovering amazing local services and empowering their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant={mode === 'rural' ? 'rural' : 'urban'} className="text-base px-10 h-14 w-full sm:w-auto shadow-sm">
                  Create Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-base px-10 h-14 w-full sm:w-auto bg-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};