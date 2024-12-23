"use client"

import PodcastCard from '@/components/PodcastCard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const Home = () => {
  const podcast = useQuery(api.podcast.getAllpodcast);
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
        <div className='podcast_grid'>
        {podcast.map(({_id,podcastDesc,podcastTitle,imageUrl})=>(
          <PodcastCard key={_id} title={podcastTitle} description={podcastDesc} imgURL={imageUrl} podcastID={_id}/>
        ))}
        </div>
      </section>
      
    </div>
  )
}

export default Home
