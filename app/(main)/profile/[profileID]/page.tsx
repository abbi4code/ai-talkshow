'use client'

import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import LoaderSpinner from '@/components/LoaderSpinner'
import ProfileFace from '@/components/ProfileFace'
import EmptyPod from '@/components/EmptyPod'
import PodcastCard from '@/components/PodcastCard'

const Page = ({params}:{params: {profileID: string}}) => {
  // !here can be err in clerkID and authorId or maybe they both are same checkOnce
  const user = useQuery(api.users.getUserById,{clerkId: params.profileID})

  const podcastData = useQuery(api.podcast.getPodcastByAuthorId,{
    authorId: params.profileID
  })

  if(!user || !podcastData) {
    return <LoaderSpinner/>
  }

  return (
    <div className='mt-9 flex flex-col'>
      <h1 className='text-20 font-bold text-white-1 max-md:text-center'>
        Podcaster Profile
      </h1>
      <div className='mt-6 flex flex-col gap-6 max-md:items-center md:flex-row'>
        <ProfileFace
         imageUrl={user?.imageUrl} podcastData={podcastData!} userfirstName={user?.name}/>
      </div>
      <div className='mt-9 flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>All Podcasts</h1>
        {podcastData && podcastData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastData?.podcasts
              ?.slice(0, 4)
              .map((podcast:any) => (
                <PodcastCard
                  key={podcast._id}
                  imgURL={podcast.imageUrl!}
                  title={podcast.podcastTitle!}
                  description={podcast.podcastDescription}
                  podcastID={podcast._id}
                />
              ))}
          </div>
        ) : (
          <EmptyPod
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}

      </div>

    </div>
  )
}

export default Page
