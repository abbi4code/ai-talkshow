"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";

import { Progress } from "./ui/progress";
import { formatTime } from "@/lib/formatTime";

import { Play, Volume2, Heart, Shuffle, SkipBack, SkipForward, Repeat, Pause, VolumeOff } from 'lucide-react';


const PodcastPlayer = () => {

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying,setIsPlaying] = useState(false)
  const [duration,setDuration] = useState(0);
  const [isMuted,setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(67); 

  const { audio } = useAudio();

  const togglePlayPause = () => {
    if(audioRef.current?.paused){
      audioRef.current?.play();
      setIsPlaying(true)
    }else {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  };

  const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    if(audioRef.current){
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      
      const changedVolume = (clickX/rect.width) * 100;
      const newVolume = Math.max(0, Math.min(100, changedVolume));
      
      setVolume(newVolume);
      
      
      audioRef.current.volume = newVolume / 100;
    }
  }

  const toggleMute = () => {
    if(audioRef.current){
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const forward = () => {
    if(
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration && 
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ){
      audioRef.current.currentTime += 5;
    }else if(audioRef.current){
      const duration = audioRef?.current?.duration
      audioRef.current.currentTime = duration
    }
  }

  const rewind = () => {
    if(
      audioRef.current && audioRef.current.currentTime - 5 > 0
    ) {
      audioRef.current.currentTime -= 5;
    }else if(audioRef.current){
      audioRef.current.currentTime = 0
    }
  }

  useEffect(()=> {

    const updateCurrentTime = () =>  {
      if(audioRef.current){
        setCurrentTime(audioRef.current.currentTime)
      }
    };

    const audioElement = audioRef.current;
    if(audioElement){
      //we will check for audio changes (time)
      // we have attach this eventlistener to our audio DOM ele
      audioElement.addEventListener('timeupdate',updateCurrentTime)

      return () => {
        audioElement.removeEventListener('timeupdate',updateCurrentTime)
      }
    }

  },[])

  useEffect(()=> {

    const audioElement = audioRef.current;
    if(audio?.audioUrl){
      audioElement?.play().then(()=> {
        setIsPlaying(true)
      })
    }else {
      audioElement?.pause();
      //when there is no audio
      setIsPlaying(false)
    }
  },[audio])

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      // Set initial volume to audio element
      audioRef.current.volume = volume / 100;
    }
  }, [volume])

  const handleLoadedMetadata = () => {
    if(audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }


  return (
    <div className={cn('bg-gradient-to-br from-black-3/80 to-black-2/60 backdrop-blur-xl border border-gray-2/30 rounded-2xl transition-all duration-300 hover:border-green-1/30 hover:shadow-2xl hover:shadow-green-1/20 flex items-center gap-6 p-4 sticky bottom-0',{hidden: !audio?.audioUrl || audio.audioUrl === ""})}>
      {/* track Infoo */}
      <div className='flex items-center gap-4 flex-1 min-w-0'>
        <div className='relative'>
          <audio ref={audioRef} src={audio?.audioUrl} className="hidden" onLoadedMetadata={handleLoadedMetadata} onEnded={handleAudioEnded}/>
                      <Image src={audio?.imageUrl || '/images/player1.png'} alt={audio?.title || 'Podcast'} className='w-24 h-24 opacity-100 rounded-lg object-cover' width={96} height={96} />
          <div className='absolute inset-0 bg-green-1/20 rounded-lg animate-pulse opacity-0 hover:opacity-100 transition-opacity' />
        </div>
        <div className='min-w-0 flex-1'>
          <h4 className='text-14 font-semibold text-white-1 truncate hover:text-green-1 transition-colors cursor-pointer'>
            {audio?.title}
          </h4>
          <p className='text-12 text-gray-1 truncate hover:text-white-3 transition-colors cursor-pointer'>{audio?.author}</p>
        </div>
        <button className='p-2 hover:bg-white-1/10 rounded-full transition-colors'>
          <Heart className="w-4 h-4 text-gray-1 hover:text-green-1 transition-colors" />
        </button>
      </div>

      {/* player controls */}
      <div className='flex flex-col items-center gap-2 flex-1 max-w-md'>
        <div className='flex items-center gap-4'>
          <button className='p-2 hover:bg-white-1/10 rounded-full transition-colors'>
            <Shuffle className="w-4 h-4 text-gray-1 hover:text-white-1 transition-colors" />
          </button>
          <button className='p-2 hover:bg-white-1/10 rounded-full transition-colors'>
            <SkipBack className="w-5 h-5 text-gray-1 hover:text-white-1 transition-colors" onClick={rewind} />
          </button>
          <button className='w-10 h-10 rounded-full bg-green-1 hover:bg-green-2 flex-center transition-colors group shadow-lg shadow-green-1/30'>
            {isPlaying ? <Pause className="w-5 h-5 text-black-1 transition-colors fill-black-1" onClick={togglePlayPause}/> : <Play className="w-5 h-5 text-black-1 transition-colors fill-black-1" onClick={togglePlayPause}/> }

          </button>
          <button className='p-2 hover:bg-white-1/10 rounded-full transition-colors'>
            <SkipForward className="w-5 h-5 text-gray-1 hover:text-white-1 transition-colors" onClick={forward} />
          </button>
          <button className='p-2 hover:bg-white-1/10 rounded-full transition-colors'>
            <Repeat className="w-4 h-4 text-gray-1 hover:text-white-1 transition-colors" />
          </button>
        </div>
        <div className='flex items-center gap-2 w-full'>
          <span className='text-11 text-gray-1'>{formatTime(currentTime)}</span>
          <div className='flex-1 h-1 bg-gray-2 rounded-full group cursor-pointer'>
            {/* <div className='w-1/3 h-full bg-green-1 rounded-full relative'>
              <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </div> */}
              <Progress
        value={(currentTime / duration) * 100}
        className="w-full"
        max={duration}
      />
          </div>
          <span className='text-11 text-gray-1'>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className='flex items-center gap-3 flex-1 justify-end'>
        <button className='p-2 hover:bg-white-1/10 rounded-full transition-colors'>
        {
          isMuted ? <VolumeOff className="w-4 h-4 text-gray-1 hover:text-white-1 transition-colors" onClick={toggleMute}/> : <Volume2 className="w-4 h-4 text-gray-1 hover:text-white-1 transition-colors" onClick={toggleMute}/>
        }
        
          
        </button>
        <div className='w-24 h-1 bg-gray-2 rounded-full group cursor-pointer' onClick={handleVolume}>
          <div 
            className='h-full bg-green-1 rounded-full relative transition-all duration-200 ease-in-out'
            style={{ width: `${volume}%` }}
          >
            <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
