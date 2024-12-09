import PodcastCard from '@/components/PodcastCard'
import { podcastData } from '@/constants/const'
import React from 'react'

const page = () => {
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
        <div className='podcast_grid'>
        {podcastData.map(({id,description,title,imgURL})=>(
          <PodcastCard key={id} title={title} description={description} imgURL={imgURL} podcastID={id}/>
        ))}
        </div>
      </section>
      
    </div>
  )
}

export default page
