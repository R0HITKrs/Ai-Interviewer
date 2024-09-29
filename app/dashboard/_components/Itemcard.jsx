import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function Itemcard({interview}) {

    const router = useRouter();
    const onStart = ()=>{
        router.push('/dashboard/interview/'+interview?.mockId);
    }
    const onFeedback = ()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback');
    }

  return (
    <div className='border shadow-sm rounded-lg p-4 hover:shadow-lg'>
        <h2 className='font-bold text-blue-700'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Year of Experience</h2>
        <h2 className='text-sm text-gray-500'>Date: {interview.createAt}</h2>
        <div className='flex mt-4 gap-7'>
            <Button size="sm" onClick={onFeedback} variant="outline" className='w-full hover:bg-blue-700 hover:text-white'>Feedback</Button>
            <Button size="sm" onClick={onStart} className='bg-blue-700 w-full hover:bg-white hover:text-black hover:border' >Start</Button>
        </div>
    </div>
  )
}

export default Itemcard