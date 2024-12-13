
import {Dispatch, SetStateAction} from "react"
interface GeneratePodcastProps {
    voiceType: string;
    setAudio: Dispatch<SetStateAction<string>>;
    audio: string;
    setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    voicePrompt: string;
    setVoicePrompt: Dispatch<SetStateAction<string>>;
    setAudioDuration: Dispatch<SetStateAction<number>>;
}

const GeneratePodcast = ({ setAudioStorageId,
    setAudio,
    voiceType,
    audio,
    voicePrompt,
    setVoicePrompt,
    setAudioDuration
}: GeneratePodcastProps) => {
  return (
    <div>
      
    </div>
  )
}

export default GeneratePodcast
