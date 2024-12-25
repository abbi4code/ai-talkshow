'use client'

import EmptyPod from '@/components/EmptyPod'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import SearchBar from '@/components/SearchBar'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const Page = ({searchParams: {search}} : {searchParams : {search : string}}) => {
  const podcastsData = useQuery(api.podcast.getPodcastBySearch,{search: search || ''})
  
  return (
    <div className='flex flex-col gap-9'>
      <SearchBar/>
      <div className='flex flex-col gap-9'>
        <h1 className='text-20 font-bold text-white-1'>
          {search ? 'Search result for ': 'Discover Trending Podcasts'}
          {search && <span className='text-white-2'>{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
              {podcastsData?.map(({ _id, podcastTitle, podcastDesc, imageUrl }) => (
                <PodcastCard
                  key={_id}
                  imgURL={imageUrl!}
                  title={podcastTitle}
                  description={podcastDesc}
                  podcastID={_id}
                />
              ))}
            </div>
            ) : <EmptyPod title="No results found" />}
          </>
        ) : <LoaderSpinner />}

      </div>
    </div>
  )
}

export default Page
