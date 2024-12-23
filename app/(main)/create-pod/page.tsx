"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDesc: z.string().min(10)
});

const voiceCatogories = ['Drew', 'Rachel', 'Sarah']
const Page = () => {
  const [voicetype, setVoiceType] = useState<string | null>(null);
  const [submit, setSubmit] = useState(false)

  const [imagePrompt, setImagePrompt] = useState('');
  //using convexid that we build earlier during schema
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  
  const [audioUrl, setAudioUrl] = useState('')
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0)

  const [voicePrompt, setVoicePrompt] = useState("")
  const {toast} = useToast();

  const createPodcast = useMutation(api.podcast.createPodcast)
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDesc: ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true)
    try {
      if(!audioUrl || !imageUrl || !voicetype){
        toast({title: "Please generate audio and image first"});
        setSubmit(false)
        throw new Error("Please generate audio and image")
      }
      const podcast = await createPodcast({podcastTitle: values.podcastTitle, podcastDesc: values.podcastDesc,audioDuration,audioUrl,imageUrl,imagePrompt,voiceType,views: 0,voicePrompt,imageStorageId: imageStorageId!, audioStorageId:audioStorageId!})
      console.log("Podcast",podcast)
      toast({title: "Podcast created successfully"})
      setSubmit(false)
      router.push("/")
    } catch (error) {
      console.log("error",error)
      toast({title: "Error while creating podcast",variant:"destructive"})
      setSubmit(false)
    }

  }
  return (
    <div className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="JSM Pro Podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col gap-2.5">
              <Label className="font-bold text-16 text-white-1 ">
                Category
              </Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1"
                  )}
                >
                  <SelectValue
                    placeholder="Select Ai voices"
                    className="placeholder:text-gray-1"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceCatogories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize focus:bg-orange-1"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {/* a hidden voice just for the user to preview the voice they selecting */}
                {voicetype && (
                  <audio
                    src={`/${voicetype}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>
            <FormField
          control={form.control}
          name="podcastDesc"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2.5'>
              <FormLabel className='text-16 font-bold text-white-1'>Description</FormLabel>
              <FormControl>
                <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Enter a short podcast desc"  {...field} />
              </FormControl>
              <FormMessage className='text-white-1' />
            </FormItem>
          )}
        />
          </div>
          <div className="flex flex-col pt-10">
              <GeneratePodcast 
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voicetype}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
               />
              <GenerateThumbnail
               imageUrl={imageUrl}
               setImageUrl={setImageUrl}
               setImageStorageId={setImageStorageId}
               setImagePrompt={setImagePrompt}
               imagePrompt={imagePrompt}
               />
              <div className="mt-10 w-full">
                <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
                  {submit ? (
                    <>
                  
                    Submitting
                    <Loader size={25} className="animate-spin"/></>
                  ): (
                    'Submit & Publish Podcast'
                  )}
                </Button>
              </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
