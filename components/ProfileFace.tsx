'use client'

import { useAudio } from '@/providers/AudioProvider'
import React, { useEffect, useState } from 'react'
import LoaderSpinner from './LoaderSpinner';
import Image from 'next/image';
import { Button } from './ui/button';
import { Id } from '@/convex/_generated/dataModel';

interface ProfilePodcastProps {
    podcasts: PodcastProps[];
    totalListeners: number;
}

interface ProfileFaceProps {
    podcastData: ProfilePodcastProps;
    imageUrl: string;
    userfirstName: string;
}

interface PodcastProps {
    _id: Id<"podcasts">;
    _creationTime: number;
    audioStorageId: Id<"_storage"> | undefined;
    user: Id<"users">;
    podcastTitle: string;
    podcastDesc: string;
    audioUrl: string | null;
    imageUrl: string | null;
    imageStorageId: Id<"_storage"> | undefined;
    author: string;
    authorId: string;
    authorImageUrl: string;
    voicePrompt: string;
    imagePrompt: string | null;
    voiceType: string;
    audioDuration: number;
    views: number;
  }

const ProfileFace = ({podcastData, imageUrl, userfirstName}: ProfileFaceProps) => {
    const {setAudio} = useAudio();
    // const [randomPodcast, setRandomPodcast] = useState<PodcastProps | null>(null);
    const [randomPodcast, setRandomPodcast] = useState<PodcastProps | null>(null);
    console.log("podcast Data",podcastData)

    const playRandomPodcast = () => {
        const randomIndex = Math.floor(Math.random() * podcastData.podcasts.length);

        setRandomPodcast(podcastData.podcasts[randomIndex]);
    }

    useEffect(()=> {
        if(randomPodcast){
            setAudio({
                title: randomPodcast.podcastTitle,
                audioUrl: randomPodcast.audioUrl || "",
                imageUrl: randomPodcast.imageUrl || "",
                author: randomPodcast.author,
                podcastId: randomPodcast._id,
            })
        }
    },[randomPodcast, setAudio])

    if(!imageUrl){
        return <LoaderSpinner/>
    }
  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt="Podcaster"
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt="verified"
            />
            <h2 className="text-14 font-medium text-white-2">
              Verified Creator
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {userfirstName}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphones"
          />
          <h2 className="text-16 font-semibold text-white-1">
            {podcastData?.totalListeners} &nbsp;
            <span className="font-normal text-white-2">monthly listeners</span>
          </h2>
        </figure>
        {podcastData?.podcasts.length > 0 && (
          <Button
            onClick={playRandomPodcast}
            className="text-16 bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play a random podcast
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProfileFace
