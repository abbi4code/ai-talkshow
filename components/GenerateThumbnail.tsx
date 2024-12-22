import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useToast } from '@/hooks/use-toast'

const GenerateThumbnail = ({imagePrompt, setImageUrl, setImageStorageId, imageUrl, setImagePrompt }) => {
  const [isAithumbnail, setIsAithumbnail] = useState(true)
  const [generate, setGenerate] = useState(false)
  const imageref = useRef(null);
  const [imgUploading, setImgUploading] = useState(false)
  const {toast}= useToast()


  const uploadImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if(!files){
        return
      }
      console.log("files",files);
      const file = files[0];
      console.log("fileeee",file);
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
      console.log("blob",blob, "file arrbin", file.arrayBuffer())
      handleimage(blob, file.name)
      
    } catch (error) {
      console.log("error",error)
      toast({title:"error while uploading image", variant: 'destructive'})
      
    }
    const handleimage = (blob: Blob, filename: string) => {


    }
  }

  return (
    <>
    <div className='generate_thumbnail text-white-1'>
      <Button type='button' variant={'plain'} className={cn('', {"bg-black-6": isAithumbnail})} onClick={() => setIsAithumbnail(true)}>
        Use AI to generate thumbnail
      </Button>
      <Button variant={'plain'} className={cn('bg-black-1 font-bold', {"bg-black-6": !isAithumbnail})} onClick={() => setIsAithumbnail(false)}>
        Upload custom Image
      </Button>
    </div>
    {isAithumbnail ? (
       <div className='mt-5'>
        <div className="flex flex-col gap-2.5 text-white-1">
        <Label className="text-16 font-bold">
          Ai prompt to generate thumbnail
        </Label>
       <Textarea
         className="input-class font-light focus-visible:ring-offset-orange-1"
         placeholder="Provide text to generate audio"
         rows={5}
         value={imagePrompt}
         onChange={(e) => setImagePrompt(e.target.value)}
       />
     </div>
     <div className="mt-5 w-full max-w-[200px]">
       <Button
         type="submit"
         className="text-16 bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 "
        //  onClick={generatePodcast}
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
       </div>
    ): (
      <div className='image_div' onClick={() => imageref.current?.click()}>
        <Input type='file' className='text-white-1 hidden' ref={imageref} onChange={(e) => uploadImage(e)}/>

      </div>
    )}
    </>
    
  )
}

export default GenerateThumbnail
