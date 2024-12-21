import { Id } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";
import { set } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {useUploadFiles} from "@xixixao/uploadstuff/react"
import {v4 as uuidv4} from 'uuid'
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
  const {toast} = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getAudioUrl = useMutation(api.podcast.getUrl)


  const generatePodcast = async() => {
    setGenerate(true);
    setAudio('');


    if(!voicePrompt) {
      toast({title: "Please provide text and voiceType to generate audio"})

      return setGenerate(false);
    }

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/elevenlabs`, {
        method: 'POST',
        body: JSON.stringify({voiceType, voicePrompt})
      });

      const blob = await res.blob();
      const filename = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], filename, {type: 'audio/,mpeg'})

      const audioUpload = await startUpload([file]);
      console.log("audioUpload", audioUpload)
      
      // !cover this issue
      const storageID = (audioUpload[0].response as any).storageID

      setAudioStorageId(storageID);
      // TODO: maybe this is schema search by id
      const audioUrl = await getAudioUrl({storageID});

      setAudio(audioUrl!);
      setGenerate(false);
      toast({title: "Podcast generated successfully"})

    } catch (error) {
      console.log("error", error)
      toast({title: "Failed to generate, please try again", variant: "destructive"})
      setGenerate(false);
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
          onClick={generatePodcast}
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
