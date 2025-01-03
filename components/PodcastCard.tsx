"use client"

import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const PodcastCard = ({title,description,imgURL,podcastID}: {title: string,description:string, imgURL: string, podcastID: Id<"podcasts">}) => {
  const router = useRouter()
  const handlePodcast = () =>{
    router.push(`/podcasts/${podcastID}`, {scroll: true})

  }

  return (
    <div className='cursor-pointer flex flex-col gap-2' onClick={handlePodcast}>
      <Image src={imgURL} alt={title} width={174} height={174} className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'/>
      <div className='flex flex-col'>
        <h1 className='text-16 font-bold truncate text-white-1'>{title}</h1>
        <p className='text-12 font-normal capitalize truncate text-white-5'>{description}</p>

     
      </div>
    </div>
  )
}

export default PodcastCard
