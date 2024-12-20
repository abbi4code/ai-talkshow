import { Id } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";
import { set } from "react-hook-form";
interface GeneratePodcastProps {
  voiceType: string;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}
 
const useGeneratePodcast = ({setAudio, voiceType, voicePrompt, setAudioStorageId}: GeneratePodcastProps) => {
  const [generate, setGenerate] = useState(false);
  const generatePodcast = () => {
    setGenerate(true);
    setAudio('');


    if(!voicePrompt) {
      // todo: show error toast maybe 
      return setGenerate(false);
    }

  }

  

  return {
    generate,
    generatePodcast
  }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  // const [generate, setgenerate] = useState(false);
  const {generate, generatePodcast} = useGeneratePodcast(props);
  return (
    <div className="">
      <div className="flex flex-col gap-2.5 text-white-1">
        <Label className="text-16 font-bold">
          Ai prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 "
        >
          {generate ? (
            <>
              Generating
              <Loader size={15} className="animate-spin" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio controls src={props.audio} autoPlay className="mt-5" onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}/>
      )}
    </div>
  );
};

export default GeneratePodcast;
