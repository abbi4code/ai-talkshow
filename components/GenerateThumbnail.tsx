import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useToast } from '@/hooks/use-toast'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Image from 'next/image'

const GenerateThumbnail = ({imagePrompt, setImageUrl, setImageStorageId, imageUrl, setImagePrompt }) => {
  const [isAithumbnail, setIsAithumbnail] = useState(true)
  const [generate, setGenerate] = useState(false)
  const imageref = useRef(null);
  const [imgUploading, setImgUploading] = useState(false)
  const {toast}= useToast()
  //this mutation fn will let you upload file to a url yeah
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload} = useUploadFiles(generateUploadUrl)
  //this will serach by the storageId then will giv you the url
  const getImageUrl = useMutation(api.podcast.getUrl);

  const handleimage = async(blob: Blob, filename: string) => {
    setImgUploading(true);
    setImageUrl('')

    try {
      const file = new File([blob], filename,{ type: 'image/png'})
      //now the file is ready we can upload this 

      const uploaded = await startUpload([file]);
      console.log("uploaded",uploaded)
      const storageId = (uploaded[0].response as any).storageId;
      console.log("storageId", storageId);

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({storageId});
      setImageUrl(imageUrl);
      setImgUploading(false)
      toast({title: "Thumbnail successfully uploaded"})
      
    } catch (error) {
      console.log(error)
      toast({title: "Error while generating thumbnail", variant: 'destructive'})
    }
  }
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
      //this will convert the selected image into binary then pass it to create a blob obj
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
      console.log("blob",blob, "file arrbin", file.arrayBuffer())
      handleimage(blob, file.name)

      
    } catch (error) {
      console.log("error",error)
      toast({title:"error while uploading image", variant: 'destructive'})
      
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
        {!imgUploading ? (
          <Image src="/icons/upload-image.svg" width={40} height={40} alt='upload' />
        ): (
           <div className='text-16 flex-center font-bold text-white-1'>
            Uploading
            <Loader size={20} className='animate-spin ml-2'/>
           </div>
        )}
        <div className='flex flex-col items-center gap-1'>
            <h2 className='text-12 font-bold text-orange-1'>Click to upload</h2>
            <p className='text-12 font-normal text-gray-1'>SVG, PNG, JPG, or GIF (max. 1080x1080)</p>
        </div>
      </div>
    )}
    {imageUrl && (
      <div className='flex-center w-full'>
        <Image src={imageUrl} width={200} height={200} className='my-5' alt='thumbnail'/>
      </div>
    )}
    </>
    
  )
}

export default GenerateThumbnail
