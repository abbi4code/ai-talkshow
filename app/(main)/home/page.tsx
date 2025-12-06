"use client"

import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const Home = () => {
  const trendingpodcast = useQuery(api.podcast.getTrendingPodcasts);
  console.log("trendingPodcast",trendingpodcast)
  if(!trendingpodcast){
    return <LoaderSpinner/>
  }    
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
        <div className='podcast_grid'>
        {trendingpodcast && trendingpodcast.map(({_id,podcastDesc,podcastTitle,imageUrl,author,audioDuration})=>(
          <PodcastCard key={_id} author= {author} title={podcastTitle} description={podcastDesc} imgURL={imageUrl!} podcastID={_id} duration = {audioDuration}/>
        ))}
        </div>
      </section>
      
    </div>
  )
}

export default Home
