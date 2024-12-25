'use client'

import React from 'react'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useAudio } from '@/providers/AudioProvider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import Corousel from './Corousel';


const RightSidebar = () => {
  //you can get issignedin as well
  const {user} = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();

  const {audio} = useAudio();

  //SignedIn will check for authorization
  return (
    <div className={cn('right_sidebar h-[calc(100vh - 5px)]', {
      'h-[calc(100vh - 140px)]': audio?.audioUrl
    })}>
       <SignedIn>
        <Link href={`profile/${user?.id}`} className='flex gap-3 pb-12'>
        <UserButton/>
        <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold text-white-1">{user?.firstName} {user?.lastName}</h1>
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
       </SignedIn>
       <div>
        <Header headerTitle="Fans Like You"/>
        <Corousel fansLikeDetail={topPodcasters!}/>
       </div>
       <div className='flex flex-col gap-8 pt-12'>
        <Header headerTitle='Top Podcasters'/>
        <div className='flex flex-col gap-6'>
          {topPodcasters?.slice(0,3).map((podcaster)=>(
            <div key={podcaster._id} className='flex cursor-pointer justify-between' onClick={() => router.push(`profile/${podcaster.clerkId}`)}>
              <div>
                <Image src={podcaster.imageUrl} alt={podcaster.name} width={44} height={44} className='aspect-square rounded-lg'/>
                <h2 className='text-14 font-semibold text-white-1'>
                  {podcaster.name}
                </h2>
              </div>
              <div className='flex items-center'>
                <p className='text-12 font-normal text-white-1'>{podcaster.totalPodcasts}</p>
              </div>
            </div>
          ))}

        </div>
       </div>
       
    </div>
  )
}

export default RightSidebar
