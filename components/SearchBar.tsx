'use client'

import { useDebounce } from "@/lib/Debounce"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import React from 'react'
import { Input } from "./ui/input"
import Image from "next/image"

const SearchBar = () => {
    const [search,setSearch] = useState('')
    const router = useRouter();
    const pathname = usePathname();

    const debouncedVal = useDebounce(search, 500);

    useEffect(() => {
        if(debouncedVal){
            router.push(`/discover?search=${debouncedVal}`)
        }else if(!debouncedVal && pathname === '/discover') {
            router.push('/discover')
        }

    },[router, pathname, debouncedVal])
  return (
    <div className="relative mt-8 block">
        <Input className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1" placeholder="Search for podcasts" value={search} onChange={(e) => setSearch(e.target.value)} onLoad={() => setSearch("")}/>
        <Image src='/icons/search.svg' alt="search" height={20} width={20} className="absolute left-4 top-3.5"/>
      
    </div>
  )
}

export default SearchBar