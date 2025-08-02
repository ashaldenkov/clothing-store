import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeletons = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {
        //      return skeleton multiple times
        [...Array(10)].map((value, index) => (
          <div key={index} className='flex flex-col items-start w-full'>
            <Skeleton className="rounded-xl w-full aspect-square" />
            <Skeleton className="rounded-xl w-full h-10 mt-3 mb-1" />
          </div>
        ))
      }
    </div>
  )
}

export default LoadingSkeletons