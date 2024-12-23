'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'


const AudioContext = createContext(undefined);

const AudioProvider = ({children}: {children: React.ReactNode}) => {
    const [audio, setAudio] = useState()
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
