"use client"


import HeroSection from '@/components/HeroSection';

import PodcastCard from '@/components/PodcastCard';
import FeatureShowcase from '@/components/FeatureShowcase';
import StatisticsSection from '@/components/StatisticsSection';
import PodcastPlayer from '@/components/PodcastPlayer';
import CategoryNavigation from '@/components/CategoryNav';
import { SignedIn, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import LoaderSpinner from '@/components/LoaderSpinner';

const Heropage = () => {



  const featuredPodcasts = useQuery(api.podcast.getAllpodcast);
  if(!featuredPodcasts){
    return <LoaderSpinner/>
  }


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
            <button disabled className="bg-gradient-to-r from-green-1 to-green-2 text-black-1 font-bold px-8 py-3 rounded-full  transition-transform shadow-lg shadow-green-1/30">
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
          {featuredPodcasts && featuredPodcasts.map(({_id,podcastDesc,podcastTitle,imageUrl,author,audioDuration})=>(
          <PodcastCard key={_id} author= {author} title={podcastTitle} description={podcastDesc} imgURL={imageUrl!} podcastID={_id} duration = {audioDuration}/>
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
            © 2025 PodcastAI. Music for everyone.
          </p>
        </footer>
      </div>

      {/* Audio Player */}
      <PodcastPlayer />
    </div>
  );
};

export default Heropage;
