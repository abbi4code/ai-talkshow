'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants/const'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
const LeftSidebar = () => {

    const pathName = usePathname();
    const router = useRouter();
  return (
    <div className='left_sidebar'>
        <nav className='flex flex-col gap-6 mb-10'>
            <Link href="/" className='flex cursor-pointer items-center max-lg:justify-center'>
             <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
             <h1 className='text-24 font-extrabold text-white max-lg:hidden'>Podoragasm</h1>
            </Link>

        </nav>

        {sidebarLinks.map(({imgURL,label,route})=> {

            const isActive = pathName === route || pathName.startsWith(`${route}/`)
            console.log("pathname",pathName,route)
            return (
                <Link href={route} key={label} className={cn('flex gap-3 max-lg:px-4 py-10 items-center justify-center lg:justify-start', {"bg-nav-focus border-r-4 border-orange-1": isActive})}>
                    <Image src={imgURL} alt='label' width={24} height={24}/>
                    <p>{label}</p>
                </Link>
            )
        })}
      
    </div>
  )
}

export default LeftSidebar
