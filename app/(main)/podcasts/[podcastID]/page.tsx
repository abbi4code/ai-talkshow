'use client'

import EmptyPod from '@/components/EmptyPod';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import Image from 'next/image';
import React from 'react'

// todo: take a look
const Page = ({params: {podcastID}}: {params: {podcastID: Id<'podcasts'>}}) => {
  // console.log("params",podcastID)

  const {user} = useUser();
  const podcast = useQuery(api.podcast.getPodcastById, {podcastId: podcastID})
  const similarPodcasts = useQuery(api.podcast.getPodcastByVoiceType, { podcastId: podcastID })

  // const owner = user?.isSignedIn;

  const isOwner = user?.id === podcast?.authorId;

  if(!similarPodcasts || !podcast) {
    return <LoaderSpinner/>
  }
  return (
    <div className='flex w-full flex-col'>
        <header className='mt-9 flex items-center justify-between'>
          <h1 className='text-20 font-bold text-white-1'>
             Currently Playing
          </h1>
          <figure className='flex gap-3'>
            <Image src="/icons/headphone.svg" width={24} height={24} alt='headphone'/>
            <h2 className='text-16 font-bold text-white-1'>{podcast?.views}</h2>
          </figure>
        </header>

        <PodcastDetailPlayer isOwner={isOwner} podcastId={podcast._id} {...podcast}/>  
        <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">{podcast?.podcastDesc}</p>

<div className="flex flex-col gap-8">
  <div className='flex flex-col gap-4'>
    <h1 className='text-18 font-bold text-white-1'>Transcription</h1>
    <p className="text-16 font-medium text-white-2">{podcast?.voicePrompt}</p>
  </div>
  <div className='flex flex-col gap-4'>
    <h1 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h1>
    <p className="text-16 font-medium text-white-2">{podcast?.imagePrompt}</p>
  </div>
</div>
<section className="mt-8 flex flex-col gap-5">
<h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
      {similarPodcasts && similarPodcasts.length > 0 ? (
        <div className='podcast_grid'>
            {similarPodcasts?.map(({ _id, podcastTitle, podcastDesc, imageUrl }) => (
              <PodcastCard 
                key={_id}
                imgURL={imageUrl as string}
                title={podcastTitle}
                description={podcastDesc}
                podcastID={_id}
              />
            ))}
        </div>
      ):(
        <>
        <EmptyPod title="No similar Podcast Found" buttonLink="/discover" buttonText="Discover more podcasts" />

        </>
      )}
      </section>
    </div>
  )
}

export default Page