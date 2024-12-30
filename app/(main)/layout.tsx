import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import PodcastPlayer from "@/components/PodcastPlayer";
import Navmod from "@/components/Navmod";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="relative flex flex-col ">
    <main className="relative flex bg-black-3">
        <LeftSidebar/>
        <div className="flex min-h-screen flex-1 px-4 sm:px-14 flex-col ">
            <div className="mx-auto flex flex-col w-full max-w-5xl max-sm:px-4">
                <div className="flex h-16 items-center justify-between md:hidden ">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="menu-icon"/>
                    <Navmod/>
                </div>
                <div className="flex flex-col md:pb:14">
                    
                    {children}
                    <Toaster/>
                </div>
            </div>
        </div>
        <RightSidebar/>
    </main>
    <PodcastPlayer/>
   </div>
  );
}
