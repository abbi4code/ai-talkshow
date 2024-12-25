'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
export interface AudioProps {
    title: string;
    audioUrl: string;
    author: string;
    imageUrl: string;
    podcastId: string;
  }
  
  export interface AudioContextType {
    audio: AudioProps | undefined;
    setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
  }

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioProvider = ({children}: {children: React.ReactNode}) => {
    const [audio, setAudio] = useState<AudioProps | undefined>()

    const pathName = usePathname();

    useEffect(()=>{
        if(pathName === '/create-pod'){
            setAudio(undefined)
        }
    },[pathName])
  return (
     <AudioContext.Provider value={{audio, setAudio}}>
        {children}
     </AudioContext.Provider>
  )
}
export const useAudio = () => {
    const context = useContext(AudioContext);
    if(!context){
        throw new Error("this fn should be inside the provider")
    }
    return context
}

export default AudioProvider
