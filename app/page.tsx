"use client"


import HeroSection from '@/components/HeroSection';

import PodcastCard from '@/components/PodcastCard';
import FeatureShowcase from '@/components/FeatureShowcase';
import StatisticsSection from '@/components/StatisticsSection';
import PodcastPlayer from '@/components/PodcastPlayer';
import CategoryNavigation from '@/components/CategoryNav';
import { SignedIn, SignIn, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Heropage = () => {


  const featuredPodcasts = [
    {
      title: "The Future of AI in Content Creation",
      description: "Exploring how artificial intelligence is revolutionizing the way we create, edit, and distribute digital content across all media platforms.",
      imgURL: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
      author: "Sarah Chen",
      duration: "45 min",
      category: "Technology"
    },
    {
      title: "Building Successful Digital Products",
      description: "A deep dive into product strategy, user experience design, and the frameworks that drive successful digital product launches.",
      imgURL: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      author: "Marcus Rodriguez",
      duration: "38 min",
      category: "Business"
    },
    {
      title: "Mindfulness in the Digital Age",
      description: "Discovering balance and mental wellness while navigating our hyperconnected world and the constant stream of digital information.",
      imgURL: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop",
      author: "Dr. Emily Watson",
      duration: "32 min",
      category: "Health"
    },
    {
      title: "The Science of Learning",
      description: "Understanding how our brains acquire new information and the most effective methods for accelerated learning and retention.",
      imgURL: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
      author: "Prof. David Kim",
      duration: "50 min",
      category: "Education"
    }
  ];

  const currentTrack = {
    title: "The Future of AI in Content Creation",
    author: "Sarah Chen",
    duration: "45:32",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop"
  };

  const {user} = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-1 to-black-3">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-1 to-green-2 rounded-full flex-center">
              <span className="text-black-1 font-bold text-18">P</span>
            </div>
            <span className="text-28 font-bold gradient-text">PodcastAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="home" className="text-white-2 hover:text-green-1 transition-colors font-medium">Home</a>
            <a href="discover" className="text-white-2 hover:text-green-1 transition-colors font-medium">Search</a>
            <SignedIn><Link href={`/profile/${user?.id}`} className="text-white-2 hover:text-green-1 transition-colors font-medium">Your Library</Link></SignedIn>
            <button className="bg-gradient-to-r from-green-1 to-green-2 text-black-1 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg shadow-green-1/30">
              Premium
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <HeroSection />

        {/* Category Navigation */}
        <CategoryNavigation />

        {/* Featured Podcasts */}
        <section>
          <h2 className="text-28 font-bold gradient-text mb-8">Made for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPodcasts.map((podcast, index) => (
              <PodcastCard key={index} {...podcast} />
            ))}
          </div>
        </section>

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Statistics */}
        <StatisticsSection />

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-2/30">
          <p className="text-gray-1 text-14">
            © 2024 PodcastAI. Music for everyone.
          </p>
        </footer>
      </div>

      {/* Audio Player */}
      <PodcastPlayer />
    </div>
  );
};

export default Heropage;
