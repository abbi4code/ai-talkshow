"use client"

import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Play } from 'lucide-react';

interface PodcastCardProps {
  title: string;
  description: string;
  imgURL: string;
  author: string;
  podcastID?: string,
  duration: string;
  category: string;
}

// const PodcastCard = ({title,description,imgURL,podcastID}: {title: string,description:string, imgURL: string, podcastID: Id<"podcasts">}) => {
//   const router = useRouter()
//   const handlePodcast = () =>{
//     router.push(`/podcasts/${podcastID}`, {scroll: true})

//   }

//   return (
//     <div className='cursor-pointer flex flex-col gap-2' onClick={handlePodcast}>
//       <Image src={imgURL} alt={title} width={174} height={174} className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'/>
//       <div className='flex flex-col'>
//         <h1 className='text-16 font-bold truncate text-white-1'>{title}</h1>
//         <p className='text-12 font-normal capitalize truncate text-white-5'>{description}</p>

     
//       </div>
//     </div>
//   )
// }

// export default PodcastCard


const PodcastCard = ({ title, description, imgURL,podcastID ,author, duration, category }: PodcastCardProps) => {
  const router = useRouter()
  const handlePodcast = () => {
    router.push(`/podcasts/${podcastID}`, {scroll: true})
  }

  return (
    <div className='group cursor-pointer flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-black-3/60 to-black-2/40 border border-gray-2/30 backdrop-blur-xl hover:border-green-1/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-1/20 hover:bg-black-3/80' onClick={handlePodcast}>
      <div className='relative overflow-hidden rounded-xl'>
        <Image 
          src={imgURL}
          alt={title} 
          width={174} 
          height={174}
          className='aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110' 
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black-1/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
          <div className='w-12 h-12 rounded-full bg-green-1 hover:bg-green-2 shadow-lg shadow-green-1/40 flex-center transition-all duration-200 hover:scale-110'>
            <Play className="w-5 h-5 text-black-1 fill-black-1" />
          </div>
        </div>
        <div className='absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <span className='bg-black-1/90 backdrop-blur-sm text-white-2 text-12 font-medium px-3 py-1 rounded-full'>
          //! had to work here 
            {/* {duration} */}
          </span>
        </div>
      </div>
      
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <span className='bg-green-1/20 text-green-1 text-10 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-1/30'>
            {category}
          </span>
        </div>
        <h3 className='text-18 font-bold text-white-1 group-hover:text-green-1 transition-colors duration-300 line-clamp-2 leading-tight'>
          {title}
        </h3>
        <p className='text-14 text-white-4 line-clamp-3 leading-relaxed'>{description}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 rounded-full bg-gradient-to-r from-green-1 to-green-2'></div>
            <span className='text-12 text-gray-1 font-medium'>{author}</span>
          </div>
          <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <div className='w-2 h-2 rounded-full bg-green-1 animate-pulse' />
            <span className='text-10 font-bold text-green-1 uppercase tracking-wider'>Play</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;

