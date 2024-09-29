'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  

function Feedback({params}) {

    const [feedback, setFeedback] = useState();
    const router = useRouter();


    useEffect(()=>{
        GetFeedback();
    }, [])

    const GetFeedback=async()=>{
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdREf, params.interviewId)).orderBy(UserAnswer.id);
        console.log(result);
        setFeedback(result);

    }

  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold text-green-500'>Congratulation</h2>
        <h2 className='font-bold text-xl my-2'>Here is your interview feedback</h2>

        {
            feedback?.length==0 ? 
                <h2 className='text-red-600 font-bold text-xl'>Interview not given</h2>    
            :
            <>
                <h2 className='text-blue-500 text-lg my-3'>Overall interview rating: <strong>7/10</strong></h2>
            <h2 className='text-sm text-gray-400'>Find below interview correct interview answers, Your answer and feedback for improvement </h2>
            {feedback && feedback.map((items, index)=>(
                <Collapsible key={index} className='mt-7'>
                    <CollapsibleTrigger className='flex items-center p-2 rounded my-2 text-left gap-7'>{items.question} <ChevronsUpDown/> </CollapsibleTrigger>
                        <CollapsibleContent className='bg-secondary'>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-red-600 p-2 border-gray-500 rounded'><strong>Rating:</strong>{items.rating}</h2>
                                <h2 className='p-2 border bg-red-50 rounded-lg text-sm text-red-900'><strong>Your Answer:</strong>{items.userAns}</h2>
                                <h2 className='p-2 border bg-green-50 rounded-lg text-sm text-green-900'><strong>AI Answer:</strong>{items.correctAns}</h2>
                                <h2 className='p-2 border bg-blue-50 rounded-lg text-sm text-blue-900'><strong>Feedback:</strong>{items.feedback}</h2>
                            </div>
                        </CollapsibleContent>
                </Collapsible>
            
            ))}
            </>
        }
        <Button className='mt-10' onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback